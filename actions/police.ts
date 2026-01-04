"use server"
import * as z from "zod"
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'
import { sendWelcomeMailToPolice } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { policeUSerSchema } from "@/lib/zod-schemas/police-schema"
import { CaseStatus, UserRole, Tribunal } from '@prisma/client'
import { policeCaseSchema } from "@/lib/zod-schemas/case-schema"
import { generateCaseNumber, generateFIRNumber } from "./cases"
import { currentUser } from "@/lib/auth"





export async function submitPoliceCase(values: z.infer<typeof policeCaseSchema>, isDraft: boolean) {
    const fieldValidation = policeCaseSchema.safeParse(values);

    if (!fieldValidation.success) {
        return { error: "Field validation failed" }
    }

    const user = await currentUser();
    if (!user || user.role !== UserRole.POLICE) {
        return { error: "Unauthorized: Only police officers can submit cases" }
    }

    const {
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
        statementOfComplainant,
        statementOfVictims,
        statementOfWitness,
    } = fieldValidation.data

    if (isDraft) {
        // Save as draft in PoliceCaseReport
        const draftCase = await db.policeCaseReport.create({
            data: {
                caseTitle: title,
                caseDescription,
                placeOfOffense: placeOfOffense ?? "",
                nameOfIPO: nameOfIPO ?? "",
                defendantAddress: defendantAddress ?? "",
                defendantAge: defendantAge ?? "",
                defendantName: defendantName ?? "",
                defendantOccupation: defendantOccupation ?? "",
                defendantSex: defendantSex ?? "",
                firstInformationReport: FIR,
                medicalReport,
                pictures,
                statementOfComplainant,
                statementOfVictims,
                statementOfWitness,
                isDraft: true,
            }
        })
        return { success: true, message: "Case saved as draft successfully", data: draftCase }
    } else {
        // Get the police station for this user
        const policeStation = await db.policeStation.findUnique({
            where: { userId: user.id }
        });

        if (!policeStation) {
            return { error: "Police station not found" }
        }

        // Generate FIR and case numbers
        const firNumber = await generateFIRNumber();
        if (!firNumber) {
            return { error: "FIR number generation failed" }
        }

        const caseNumber = await generateCaseNumber();
        if (!caseNumber) {
            return { error: "Case number generation failed" }
        }

        // Create the official case record
        const newCase = await db.case.create({
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
                FIR: firNumber, // FIR field contains the FIR number
                medicalReport,
                pictures,
                statementOfVictims,
                statementOfComplainant,
                statementOfWitness,
                caseStatus: CaseStatus.Submitted,
                tribunal: "CIVIL", // Default tribunal as string
            }
        })

        return { success: true, message: "Case submitted successfully", data: newCase }
    }
}












  export const createPoliceUser = async (values: z.infer<typeof policeUSerSchema>) => {
    const fieldValidation = policeUSerSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }

    const { 
        firstName, 
        lastName, 
        otherNames, 
        state, 
        gender, 
        phone, 
        localGovernment, 
        email,
        police,
        password,
        confirmPassword
         } = fieldValidation.data
    if (password !== confirmPassword) return {error: "Password doesn not match"}

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const emailExist = await getUserByEmail(email)
    
    if (emailExist) {
        return {error: "User already Exist"}
    }

    const { stationcontactNumber, stationState, stationAddress, stationLocalGovernment, stationName, contactEmail } = police

    const verificationToken = await generateVerificationToken(email)
    await sendWelcomeMailToPolice(email, password, verificationToken.token  )

   const newStation =  await db.user.create({
        data: {
            firstName,
            lastName,
            otherNames,
            state,
            gender,
            phone,
            role: UserRole.POLICE,
            localGovernment,
            email,
            password: hashedPassword,
            police: {
                create: {
                  stationLocalGovernment,
                  contactEmail,
                  stationAddress,
                  stationcontactNumber,
                  stationName,
                  stationState,
                }
            }
        }
    })

    return {data: newStation, success: "Police Station created successfully"}
}

export const getPoliceById = async (id: string) => {
    const police = await db.user.findFirst({
        where: {
            id: id
        },
        include: {
            police: true
        }
    })
    return police
}



export const deletePolice = async (id: string) => {
    const policeExist = await getUserById(id)
    if (!policeExist) {
        return {error: "Police do not Exist"}
    }


    await db.user.delete({
        where: {
            id: id,
            role: UserRole.POLICE
        },
        include: {
            police: true
         }
    })

    return {success: "Police has been Deleted Successfully!"}
}



export const getAllPoliceStations = async () => {
    const stations = await db.user.findMany(
        {
            where: {
                role: UserRole.POLICE
            },
            include: {
                police: true
            }
        }
    )
    return stations
}

// Police Case Report Management Functions
export const getPoliceCaseDrafts = async (policeId: string) => {
    const drafts = await db.policeCaseReport.findMany({
        where: {
            isDraft: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return drafts
}

export const getPoliceCaseReportById = async (id: string) => {
    const report = await db.policeCaseReport.findUnique({
        where: { id }
    })
    return report
}

export const updatePoliceCaseDraft = async (id: string, values: z.infer<typeof policeCaseSchema>) => {
    const fieldValidation = policeCaseSchema.safeParse(values);
    if (!fieldValidation.success) {
        return { error: "Field validation failed" }
    }

    const user = await currentUser();
    if (!user || user.role !== UserRole.POLICE) {
        return { error: "Unauthorized" }
    }

    const {
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
        statementOfComplainant,
        statementOfVictims,
        statementOfWitness,
    } = fieldValidation.data

    const updatedDraft = await db.policeCaseReport.update({
        where: { id },
        data: {
            caseTitle: title,
            caseDescription,
            placeOfOffense,
            nameOfIPO,
            defendantAddress,
            defendantAge,
            defendantName,
            defendantOccupation,
            defendantSex,
            firstInformationReport: FIR,
            medicalReport,
            pictures,
            statementOfComplainant,
            statementOfVictims,
            statementOfWitness,
        }
    })

    return { success: true, message: "Draft updated successfully", data: updatedDraft }
}

export const submitPoliceCaseDraft = async (id: string) => {
    const user = await currentUser();
    if (!user || user.role !== UserRole.POLICE) {
        return { error: "Unauthorized" }
    }

    // Get the police station for this user
    const policeStation = await db.policeStation.findUnique({
        where: { userId: user.id }
    });

    if (!policeStation) {
        return { error: "Police station not found" }
    }

    // Get the draft
    const draft = await db.policeCaseReport.findUnique({
        where: { id }
    })

    if (!draft) {
        return { error: "Draft not found" }
    }

    // Generate FIR and case numbers
    const firNumber = await generateFIRNumber();
    if (!firNumber) {
        return { error: "FIR number generation failed" }
    }

    const caseNumber = await generateCaseNumber();
    if (!caseNumber) {
        return { error: "Case number generation failed" }
    }

    // Create official case
    const newCase = await db.case.create({
        data: {
            title: draft.caseTitle,
            caseNumber,
            caseDescription: draft.caseDescription,
            placeOfOffense: draft.placeOfOffense,
            nameOfIPO: draft.nameOfIPO,
            defendantAddress: draft.defendantAddress,
            defendantAge: draft.defendantAge,
            defendantName: draft.defendantName,
            defendantOccupation: draft.defendantOccupation,
            defendantSex: draft.defendantSex,
            FIR: firNumber, // FIR field contains the FIR number
            medicalReport: draft.medicalReport,
            pictures: draft.pictures || undefined,
            statementOfVictims: draft.statementOfVictims,
            statementOfComplainant: draft.statementOfComplainant,
            statementOfWitness: draft.statementOfWitness,
            caseStatus: CaseStatus.Submitted,
            tribunal: "CIVIL", // Default tribunal as string
        }
    })

    // Delete the draft
    await db.policeCaseReport.delete({
        where: { id }
    })

    return { success: true, message: "Case submitted successfully", data: newCase }
}

export const deletePoliceCaseDraft = async (id: string) => {
    const user = await currentUser();
    if (!user || user.role !== UserRole.POLICE) {
        return { error: "Unauthorized" }
    }

    const draft = await db.policeCaseReport.findUnique({
        where: { id }
    })

    if (!draft) {
        return { error: "Draft not found" }
    }

    await db.policeCaseReport.delete({
        where: { id }
    })

    return { success: true, message: "Draft deleted successfully" }
}