"use server"

import { CourtRegisterSchema } from "@/lib/schema";
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { UserRole } from '@prisma/client'


export const getAllCourtRecordsCounts  = async () => {
    const customers = await db.customer.count()
    const staffs = await db.staff.count()
    const cases = await db.case.count()
    const inmates = await db.inmate.count()
    const probates = await db.probate.count()
    const transactions = await db.transaction.count()


    return {
        customers,
        staffs,
        probates,
        transactions,
        cases,
        inmates,
    }
}


export const CourtRegistrationAction = async (values: z.infer<typeof CourtRegisterSchema>) => {
    const fieldValidation = CourtRegisterSchema.safeParse(values);
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
            level,
            infrastructure,
            courtLocalGovernment,
            address,
            gender,
            jurisdiction,
            courtFunction,
            location,
            name,
            capacity,
            city,
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
          role: UserRole.COURT,
          localGovernment,
          court: {
            create: {
                capacity, 
                function: courtFunction,
                localGovernment: courtLocalGovernment,
                location,
                name,
                level, 
                jurisdiction,
                city,
                infrastructure: {
                    createMany: {
                        data: [ ...infrastructure ]
                    }
                }
            }
        }
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVrificationEmail(verificationToken.email, verificationToken.token)
    return {success: "Court has been created"}

}


export const getAllCourts = async () => {
    const courts = await db.court.findMany({
        include: {
           user: true,
           infrastructure: true,
           cases: true,
           staffs: true,
        }
    })
    return courts
}


export const deleteCourtItem = async (id: string) => {


    const courtExist = await getCourtById(id)


    if (!courtExist) {
        return {error: "Court do not Exist"}
    }


    await db.court.delete({
        where: {
            id: id
        },
        include: {
            user: true,
            infrastructure: true,
            cases: true,
            staffs: true,
         }
    })

    return {success: "Court has been Deleted Successfully!"}
}



export const getCourtById = async (id: string) => {
    const court = await db.court.findFirst({
        where: {
            id: id
        }
    })
    return court
}

// export const updateCourtInfoByCourtId = async (values: z.infer<typeof CourtRegisterSchema) => {

//     // await db.court.update({
//     //     where: {id: id},
//     //     data: {
//     //         {}
//     //     }
//     // })

// }




