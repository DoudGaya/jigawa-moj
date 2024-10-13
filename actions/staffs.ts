"use server"
import { db } from "@/lib/db";
import * as z from 'zod'
// import { signUpSchema, StaffSettingsShema } from '@/lib/schema'
// import { signUpSchema } from "@/lib/zod-schemas/user-schema";
import { StaffSchema, StaffSettingsShema } from "@/lib/zod-schemas/staff-schema";
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { UserRole } from '@prisma/client'


// TODOS 


// find a staff by email
export const getStaffByEmail = async (email: string) => {
    try {
     const staff = await db.user.findUnique({
         where: {
             email,
         },
         include: {
                staff: true,
         }
     })
     return staff
     
    } catch (error) {
         console.log(error)
    }
 }


 // find a staff by id
 
 export const getStaffById = async (id: string) => {
     try {
         const staff = await db.user.findUnique({
             where: {
                 id,
                 role: UserRole.STAFF
             },
             include: {
                 staff: true,
             }
         })
         return staff
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


export const deleteStaffById = async (id: string) => {
    try {
        const staff = await db.user.delete({
            where: {
                id,
                role: UserRole.STAFF
            }
        })
        return {success: "Staff has been deleted"}
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