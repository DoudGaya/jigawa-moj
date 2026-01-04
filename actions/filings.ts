"use server";

import { db } from "@/lib/db";
import { FilingType, FilingStatus, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { initializeTransaction, verifyTransaction } from "@/lib/payments/paystack";
import { v4 as uuidv4 } from 'uuid';

const AFFIDAVIT_FEE = 500; // NGN
const DECLARATION_FEE = 500; // NGN

export const createAffidavit = async (values: {
  title: string;
  content: string;
  deponentName: string;
  swornAt: string;
  userId: string;
  email: string;
}) => {
  try {
    const { title, content, deponentName, swornAt, userId, email } = values;
    const reference = uuidv4();

    // 1. Create Affidavit and Filing (Draft)
    const affidavit = await db.affidavit.create({
      data: {
        title,
        content,
        deponentName,
        swornAt,
        filing: {
          create: {
            userId,
            filingType: FilingType.AFFIDAVIT,
            status: FilingStatus.Submitted, // Should be Draft until paid? Let's keep Submitted for now or change to Draft if we want strict flow
          },
        },
      },
      include: {
        filing: true,
      },
    });

    if (!affidavit.filing) throw new Error("Filing creation failed");

    // 2. Create Transaction
    await db.transaction.create({
      data: {
        amount: AFFIDAVIT_FEE.toString(),
        paymentRef: reference,
        paymentFor: "Affidavit Filing Fee",
        paymentStatus: PaymentStatus.PENDING,
        userId: userId,
        filingId: affidavit.filing.id,
      },
    });

    // 3. Initialize Paystack
    const paystackData = await initializeTransaction(AFFIDAVIT_FEE, email, {
      filingId: affidavit.filing.id,
      custom_fields: [
        {
          display_name: "Filing Type",
          variable_name: "filing_type",
          value: "Affidavit",
        },
      ],
    });

    return { success: true, authorizationUrl: paystackData.authorization_url, reference };
  } catch (error) {
    console.error("Error creating affidavit:", error);
    return { error: "Failed to initiate affidavit filing." };
  }
};

export const createDeclarationOfAge = async (values: {
  declarantName: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  relationship: string;
  personName: string;
  userId: string;
  email: string;
}) => {
  try {
    const { declarantName, dateOfBirth, placeOfBirth, relationship, personName, userId, email } = values;
    const reference = uuidv4();

    const declaration = await db.declarationOfAge.create({
      data: {
        declarantName,
        dateOfBirth,
        placeOfBirth,
        relationship,
        personName,
        filing: {
          create: {
            userId,
            filingType: FilingType.DECLARATION_OF_AGE,
            status: FilingStatus.Submitted,
          },
        },
      },
      include: {
        filing: true,
      },
    });

    if (!declaration.filing) throw new Error("Filing creation failed");

    await db.transaction.create({
      data: {
        amount: DECLARATION_FEE.toString(),
        paymentRef: reference,
        paymentFor: "Declaration of Age Filing Fee",
        paymentStatus: PaymentStatus.PENDING,
        userId: userId,
        filingId: declaration.filing.id,
      },
    });

    const paystackData = await initializeTransaction(DECLARATION_FEE, email, {
      filingId: declaration.filing.id,
      custom_fields: [
        {
          display_name: "Filing Type",
          variable_name: "filing_type",
          value: "Declaration of Age",
        },
      ],
    });

    return { success: true, authorizationUrl: paystackData.authorization_url, reference };
  } catch (error) {
    console.error("Error creating declaration of age:", error);
    return { error: "Failed to initiate declaration filing." };
  }
};

export const verifyPaymentAction = async (reference: string) => {
  try {
    const data = await verifyTransaction(reference);
    
    if (data.status === 'success') {
      // Update DB if webhook hasn't already
      const transaction = await db.transaction.findUnique({
        where: { paymentRef: reference },
      });

      if (transaction && transaction.paymentStatus !== PaymentStatus.PAID) {
        await db.transaction.update({
          where: { id: transaction.id },
          data: { paymentStatus: PaymentStatus.PAID },
        });

        if (transaction.filingId) {
          await db.filing.update({
            where: { id: transaction.filingId },
            data: { status: FilingStatus.UnderReview },
          });
        }
      }
      return { success: true };
    }
    return { error: "Payment verification failed" };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { error: "Payment verification error" };
  }
};

export const getUserFilings = async (userId: string) => {
  try {
    const filings = await db.filing.findMany({
      where: { userId },
      include: {
        affidavit: true,
        declaration: true,
        transactions: true,
      },
      orderBy: { filedAt: 'desc' },
    });
    return filings;
  } catch (error) {
    console.error("Error fetching user filings:", error);
    return [];
  }
};

export const getCourtFilings = async () => {
  try {
    const filings = await db.filing.findMany({
      include: {
        affidavit: true,
        declaration: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        },
        transactions: true,
      },
      orderBy: { filedAt: 'desc' },
    });
    return filings;
  } catch (error) {
    console.error("Error fetching court filings:", error);
    return [];
  }
};

export const getFilingById = async (id: string) => {
  try {
    const filing = await db.filing.findUnique({
      where: { id },
      include: {
        affidavit: true,
        declaration: true,
        user: true,
        transactions: true,
      },
    });
    return filing;
  } catch (error) {
    return null;
  }
};

export const courtReviewFiling = async (filingId: string, status: FilingStatus) => {
  try {
    await db.filing.update({
      where: { id: filingId },
      data: { status },
    });
    revalidatePath("/court/filings");
    return { success: `Filing ${status.toLowerCase()} successfully` };
  } catch (error) {
    return { error: "Failed to update filing status" };
  }
};

export const getFilingStats = async () => {
  try {
    const total = await db.filing.count();
    const pending = await db.filing.count({ where: { status: FilingStatus.Submitted } }); // Or UnderReview
    const accepted = await db.filing.count({ where: { status: FilingStatus.Accepted } });
    const rejected = await db.filing.count({ where: { status: FilingStatus.Rejected } });
    
    // Revenue
    const paidTransactions = await db.transaction.findMany({
      where: { paymentStatus: PaymentStatus.PAID },
      select: { amount: true }
    });
    
    const revenue = paidTransactions.reduce((acc, tx) => acc + parseInt(tx.amount), 0);

    return { total, pending, accepted, rejected, revenue };
  } catch (error) {
    return { total: 0, pending: 0, accepted: 0, rejected: 0, revenue: 0 };
  }
};



