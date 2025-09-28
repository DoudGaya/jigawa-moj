"use server"
import * as z from 'zod'
import { db } from '@/lib/db'
import { StaffSchema, StaffSettingsShema } from "@/lib/zod-schemas/staff-schema";
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { CaseStatus, UserRole } from '@prisma/client'
import { PrismaClient } from '@prisma/client';



// const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


export async function generateCaseNumber() {
    const counterName = 'caseNumber';
    
    const counter = await prisma.counter.upsert({
      where: { name: counterName },
      update: { value: { increment: 1 } },
      create: { name: counterName, value: 1 },
    });
  
    const paddedNumber = counter.value.toString().padStart(6, '0');
    return paddedNumber;
  }

export async function generateFIRNumber() {
    const counterName = 'firNumber';

    const counter = await prisma.counter.upsert({
      where: { name: counterName },
      update: { value: { increment: 1 } },
      create: { name: counterName, value: 1 },
    });

    const paddedNumber = counter.value.toString().padStart(6, '0');
    return `FIR-${paddedNumber}`;
  }


  export const getAllCases = async () => {
    try {
        const cases = await db.case.findMany({
            include: {
                caseCouncil: true,
                court: true,
                files: true,
                hearings: true,
                filing: true,
                transaction: true,
            }
        })
        return cases
    } catch (error) {
        console.log(error)
    }
  }

  export const getAllSubmittedCases = async () => {
    try {
        const cases = await db.case.findMany({
            where: {
                caseStatus: CaseStatus.Submitted
            },
            include: {
                caseCouncil: true,
                court: true,
                files: true,
                hearings: true,
                filing: true,
                transaction: true,
            }
        })
        return cases
    } catch (error) {
        console.log(error)
    }
  }

  // get all by court ID

    export const getAllCasesByCourtId = async (courtId: string) => {
        try {
            const cases = await db.case.findMany({
                where: {
                    courtId
                },
                include: {
                    caseCouncil: true,
                    court: true,
                    files: true,
                    hearings: true,
                    filing: true,
                    transaction: true,
                }
            })
            return cases
        } catch (error) {
            console.log(error)
        }
    }
  
  
  export const getAllDraftedCases = async () => {
    try {
        const cases = await db.case.findMany({
            where: {
                caseStatus: CaseStatus.Draft
            }
        })
        return cases
    } catch (error) {
        console.log(error)
    }
  }
  



// find a staff by email
export const findCaseById = async (id: string) => {
    try {
     const caseItem = await db.case.findUnique({
         where: {
             id,
         },
         include: {
                caseCouncil: true,
                court: true,
                files: true,
                hearings: true,
                filing: true,
                transaction: true,
         }
     })
     return caseItem
     
    } catch (error) {
         console.log(error)
    }
 }


 
 export const getCaseItemById = async (id: string) => {
     try {
         const caseItem = await db.case.findUnique({
             where: {
                 id,
             },
             include: {
                caseCouncil: true,
                court: true,
                files: true,
                hearings: true,
                filing: true,
                transaction: true,
             }
         })
         return caseItem
     } catch (error) {
        console.log(error)
     }
 }

// create a new staff by admin




export const CourtRegistrationAction = async (values: z.infer<typeof StaffSchema>) => {
    const fieldValidation = StaffSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }

    const {
            firstName, 
            otherNames,
            lastName,
            email, 
            localGovernment,
            password, 
            passwordConfirmation, 
            phone,
            state,
            gender,
            department,
            employerName,
            employmentLocation,
            jobTitle,
            position,
            salaryGrade,
            salaryStructure,
            staffNumber,
            step,
            isTwoFactorEnabled,
        } = fieldValidation.data



    if (password !== passwordConfirmation) return {error: "Password doesn not match"}

    const hashedPassword = await bcrypt.hash(password, 10)

    const emailExist = await getUserByEmail(email)
    
    if (emailExist) {
        return {error: "User already Exist"}
    }

    await db.user.create({
        data: {
          firstName,
          lastName,
          otherNames,
          password: hashedPassword,
          email,
          phone,
          gender,
          emailVerified: new Date(),
          state,
          role: UserRole.STAFF,
          localGovernment,
          isTwoFactorEnabled,
          staff: {
            create: {
                department,
                employerName,
                employmentLocation,
                jobTitle,
                position,
                salaryGrade,
                salaryStructure,
                staffNumber,
                step,
            }
        }
        }
    })
    const verificationToken = await generateVerificationToken(email)
    await sendVrificationEmail(verificationToken.email, verificationToken.token)
    return {success: "Staff has been Registered"}

}




// delete a staff by id
export const deleteCase = async (id: string) => {
    try {
         await db.case.delete({
            where: {
                id,
            }
        })
        return {success: "Case has been deleted"}
    } catch (error) {
        console.log(error)
    }
}

// get all staffs

export const getAllStaffs = async () => {
    try {
        const staffs = await db.user.findMany({
            where: {
                role: UserRole.STAFF
            },
            include: {
                staff: true,
            }
        })
        return staffs
    } catch (error) {
        console.log(error)
    }
}


// update staff with user records by user id

export const updateStaffById = async (id: string, values: z.infer<typeof StaffSettingsShema>) => {
    const fieldValidation = StaffSettingsShema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }


    const {
        firstName, 
        otherNames,
        lastName,
        email, 
        localGovernment,
        phone,
        state,

    } = fieldValidation.data



}



// export const customerCreateCaseAction = async (values: z.infer<typeof customerCreateCase>) => {

//     const user = await currentUser()


//     if (!user) {
//         return {error: "User does not exist "}
//     }




//     return {success: "Case Filing have been Submitted!"}
// }