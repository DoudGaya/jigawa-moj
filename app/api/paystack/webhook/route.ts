import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { PaymentStatus, FilingStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ message: 'Paystack secret not configured' }, { status: 500 });
  }

  const signature = req.headers.get('x-paystack-signature');
  if (!signature) {
    return NextResponse.json({ message: 'No signature provided' }, { status: 400 });
  }

  const body = await req.text();
  const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');

  if (hash !== signature) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === 'charge.success') {
    const { reference, metadata } = event.data;
    
    // Update Transaction
    const transaction = await db.transaction.update({
      where: { paymentRef: reference },
      data: { paymentStatus: PaymentStatus.PAID },
    });

    if (transaction.filingId) {
      // Update Filing Status
      await db.filing.update({
        where: { id: transaction.filingId },
        data: { status: FilingStatus.UnderReview },
      });
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
}
