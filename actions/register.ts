"use server"
import * as z from 'zod'
import { signUpSchema } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { StaffSchema } from '@/lib/schema'
import { UserRole } from '@prisma/client'


export const regsiter = async (values: z.infer<typeof signUpSchema>) => {
    const fieldValidation = signUpSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { 
        firstName,
        lastName,
        email,
        localGovernment,
        occupation,
        state,
        otherNames,
        password,
        employmentStatus,
        maritalStatus,
        passwordConfirmation,
        phone,
        address,
        city,
        gender,
         } = fieldValidation.data


         console.log(values)


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
            state,
            gender,
            phone,
            role: UserRole.USER,
            localGovernment,
            email,
            password: hashedPassword,
            customer: {
                create: {
                    address,
                    employmentStatus,
                    maritalStatus,
                    occupation,
                    city,
                }
            }
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVrificationEmail(verificationToken.email, verificationToken.token)
    return {success: "Check your email to verify your account!"}
}


export const staffRegistration = async (values: z.infer<typeof StaffSchema>) => {
    const fieldValidation = StaffSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }

    const {
            firstName, 
            otherNames,
            lastName,
            email, 
            password, 
            passwordConfirmation, 
            phone,
            department,
            employerName,
            employmentLocation,
            jobTitle,
            localGovernment,
            position,
            salaryGrade,
            salaryStructure,
            staffNumber,
            state,
            step,
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
          state,
          role: UserRole.STAFF,
          localGovernment,
          staff: {
            create: {
                position,
                department,
                employerName,
                employmentLocation,
                jobTitle,
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
    return {success: "Check your email to verify your account!"}

}