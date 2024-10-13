"use server"
import { db } from "@/lib/db"

export const getAllCount  = async () => {
    const customers = await db.customer.count()
    const staffs = await db.staff.count()
    const cases = await db.case.count()
    const inmates = await db.inmate.count()
    const judges = await db.staff.count({
        where: {
            isJudge: true
        }
    })
    const courts = await db.court.count()
    const probates = await db.probate.count()
    const transactions = await db.transaction.count()
    const police = await db.policeStation.count()


    return {
        customers,
        staffs,
        courts,
        police,
        transactions,
        cases,
        inmates,
        judges,
    }
}