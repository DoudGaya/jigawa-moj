"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { FilingType, PaymentStatus } from "@prisma/client"

export const getUserDashboardStats = async () => {
  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  try {
    // 1. Get Cases Count (Filings of type CASE)
    const casesCount = await db.filing.count({
      where: {
        userId: user.id,
        filingType: FilingType.CASE,
      },
    })

    // 2. Get All Projects Count (All Filings)
    const allProjectsCount = await db.filing.count({
      where: {
        userId: user.id,
      },
    })

    // 3. Get Active Investment (Total Paid Transactions)
    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        paymentStatus: PaymentStatus.PAID,
      },
      select: {
        amount: true,
      },
    })

    const totalInvestment = transactions.reduce((acc, curr) => {
      const amount = parseFloat(curr.amount)
      return acc + (isNaN(amount) ? 0 : amount)
    }, 0)

    return {
      success: {
        cases: casesCount,
        allProjects: allProjectsCount,
        totalInvestment: totalInvestment,
      },
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return { error: "Failed to fetch dashboard stats" }
  }
}
