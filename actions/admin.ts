"use server"
import { db } from "@/lib/db"
import { MinistryCaseSchema } from "@/lib/zod-schemas/case-schema"
import { generateCaseNumber } from "./cases"
import { CaseStatus, UserRole } from '@prisma/client'
import * as z from "zod"
import { getCourtById } from "./courts"

export const getAllCount  = async () => {
    const customers = await db.customer.count()
    const staffs = await db.staff.count()
    const cases = await db.case.count()
    const judges = await db.staff.count({
        where: {
            isJudge: true
        }
    })
    const courts = await db.court.count()
    const transactions = await db.transaction.count()
    const police = await db.policeStation.count()


    return {
        customers,
        staffs,
        courts,
        police,
        transactions,
        cases,
        judges,
    }
}



// const updateCaseByAdmin = async (values: z.infer<typeof MinistryCaseSchema>, caseId: string) => {
//     const fieldValidation = MinistryCaseSchema.safeParse(values);

//     if (!fieldValidation.success) {
//         return { error: "field Validation failed " }
//     }

//     const {
//         title,
//         caseDescription,
//         placeOfOffense,
//         nameOfIPO,
//         defendantAddress,
//         defendantAge,
//         defendantName,
//         caseStatus,
//         caseCouncil,
//         caseType,
//         courtId,
//         courtDate,
//         hearings,
//         judgeEmail,
//         underActs,
//         underSections,
//         courtRoom,
//         judgeName,
//         judgePhone,
//         tribunal,
//         defendantOccupation,
//         defendantSex,
//         FIR,
//         medicalReport,
//         pictures,
//         statementOfComplainant,
//         statementOfVictims,
//         statementOfWitness,
//     } = fieldValidation.data

//     let date = courtDate ? new Date(courtDate) : undefined

//     const updatedCase = await db.case.update({
//         where: {
//             id: caseId
//         },
//         data: {
//             title,
//             caseDescription,
//             placeOfOffense,
//             nameOfIPO,
//             defendantAddress,
//             defendantAge,
//             defendantName,
//             defendantOccupation,
//             defendantSex,
//             FIR,
//             medicalReport,
//             pictures,
//             statementOfVictims,
//             statementOfComplainant,
//             underActs,
//             underSections,
//             courtRoom,
//             tribunal,
//             caseType,
//             caseStatus: CaseStatus.Submitted,
//             courtDate: date,
//             judgeEmail,
//             judgeName,
//             judgePhone,
//             hearings: {
//                 create: [...(hearings || [])]
//             },
//             // @ts-ignore
//             caseCouncil: {
//                 // @ts-ignore
//                 create: caseCouncil?.map(council => ({
//                     ...council,
//                 }))
//             },
//         }
//     })

//     return updatedCase   
// }

export async function submitMinistryCaseRecords(values: z.infer<typeof MinistryCaseSchema>, isDraft: boolean) {
    // Here you would typically save the data to your 
    const fieldValidation = MinistryCaseSchema.safeParse(values);


    if (!fieldValidation.success) {
        return { error: "field Validation failed " }
    }

    const {
        title,
        caseDescription,
        placeOfOffense,
        nameOfIPO,
        defendantAddress,
        defendantAge,
        defendantName,
        caseStatus,
        caseCouncil,
        caseType,
        courtId,
        courtDate,
        hearings,
        judgeEmail,
        underActs,
        underSections,
        courtRoom,
        judgeName,
        judgePhone,
        tribunal,
        defendantOccupation,
        defendantSex,
        FIR,
        medicalReport,
        pictures,
        statementOfComplainant,
        statementOfVictims,
        statementOfWitness,
    } = fieldValidation.data

    let date = courtDate ? new Date(courtDate) : undefined


    const generatedCaseNUmber = await generateCaseNumber()

    if (!generatedCaseNUmber) {
        return {error: "Case number generation failed"}
    }

    const caseNumber = `${generatedCaseNUmber}`


    // Save the data to your database
    await db.case.create({
        data: {
            title,
            caseNumber,
            caseDescription,
            placeOfOffense,
            nameOfIPO,
            defendantAddress,
            defendantAge,
            defendantName,
            defendantOccupation,
            defendantSex,
            FIR,
            medicalReport,
            pictures, 
            statementOfVictims,
            statementOfComplainant,
            underActs,
            underSections,
            courtRoom,
            tribunal,
            caseType,
            caseStatus,
            courtDate: date,
            judgeEmail,
            judgeName,
            judgePhone,
            hearings:  {
                create: [...(hearings || [])]
            } ,
            // @ts-ignore
            caseCouncil:{
                // @ts-ignore
                create: caseCouncil?.map(council => ({
                    ...council,
                }))
            },

            court: {
                connect: {
                    id: courtId
                }
            },
            statementOfWitness,
            // @ts-ignore
            caseStatus: isDraft ? CaseStatus.Draft : CaseStatus.Submitted,
        },
        
    })
    // return {success: "Case submitted successfully"} ;

    // Return a success message or error
    return { success: true, message: "Case submitted successfully" }
  }


  export async function updateMinistryCaseRecords(caseId: string, values: z.infer<typeof MinistryCaseSchema>) {
    // Validate the input data
    const fieldValidation = MinistryCaseSchema.safeParse(values);

    if (!fieldValidation.success) {
        return { error: "Field validation failed" }
    }

    const {
        title,
        caseDescription,
        placeOfOffense,
        nameOfIPO,
        defendantAddress,
        defendantAge,
        defendantName,
        caseStatus,
        caseCouncil,
        caseType,
        courtId,
        courtDate,
        hearings,
        judgeEmail,
        underActs,
        underSections,
        courtRoom,
        judgeName,
        judgePhone,
        tribunal,
        defendantOccupation,
        defendantSex,
        FIR,
        medicalReport,
        pictures,
        statementOfComplainant,
        statementOfVictims,
        statementOfWitness,
    } = fieldValidation.data

    let date = courtDate ? new Date(courtDate) : undefined

    try {
        // Update the case in the database
        const updatedCase = await db.case.update({
            where: { id: caseId },
            data: {
                title,
                caseDescription,
                placeOfOffense,
                nameOfIPO,
                defendantAddress,
                defendantAge,
                defendantName,
                defendantOccupation,
                defendantSex,
                FIR,
                medicalReport,
                pictures, 
                statementOfVictims,
                statementOfComplainant,
                underActs,
                underSections,
                courtRoom,
                tribunal,
                caseType,
                caseStatus: CaseStatus.Submitted, 
                courtDate: date,
                judgeEmail,
                judgeName,
                judgePhone,
                statementOfWitness,
                hearings: {
                    deleteMany: {}, // Delete all existing hearings
                    create: hearings?.map(hearing => {
                        return {
                            date: hearing.date,
                            time: hearing.time,
                        }
                    }) || []
                },
                caseCouncil: {
                    deleteMany: {}, // Delete all existing council members
                    create: caseCouncil?.map(council => ({
                        name: council.name,
                        email: council.email,
                        phone: council.phone,
                        role: council.role,
                        address: council.address
                    })) || []
                },
                court: {
                    connect: {
                        id: courtId
                    }
                },
            },
            include: {
                hearings: true,
                caseCouncil: true,
                court: true
            },
        })

        // console.log("Updating case:", updatedCase, "Is Draft:", isDraft)
        return { success: true, message: "Case updated successfully", case: updatedCase }
    } catch (error) {
        console.error("Error updating case:", error)
        return { error: "Failed to update case" }
    }
}
