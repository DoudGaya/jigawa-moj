"use server"
import * as z from "zod"
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from '@/data/user'
import { sendWelcomeMailToPolice } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { policeUSerSchema } from "@/lib/zod-schemas/police-schema"
import { CaseStatus, UserRole } from '@prisma/client'
import { policeCaseSchema } from "@/lib/zod-schemas/case-schema"
import { generateCaseNumber } from "./cases"





export async function submitPoliceCase(values: z.infer<typeof policeCaseSchema>, isDraft: boolean) {
    // Here you would typically save the data to your 
    const fieldValidation = policeCaseSchema.safeParse(values);


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
        defendantOccupation,
        defendantSex,
        FIR,
        medicalReport,
        pictures,
        statementOfComplainant,
        statementOfVictims,
        statementOfWitness,
    } = fieldValidation.data

    console.log({data: fieldValidation, draft: isDraft })

    const caseNumber = await generateCaseNumber()

    if (!caseNumber) {
        return {error: "Case number generation failed"}
    }


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
            statementOfWitness,
            caseStatus: isDraft ? CaseStatus.Draft : CaseStatus.Submitted,
        }
    })
    // return {success: "Case submitted successfully"} ;
    
    console.log("Submitting case:", values, "Is Draft:", isDraft)
    // Return a success message or error
    return { success: true, message: "Case submitted successfully" }
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

    console.log(newStation)

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