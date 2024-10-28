"use server"

// import { CourtRegisterSchema } from "@/lib/schema";
import { CourtRegisterSchema } from "@/lib/zod-schemas/courts-schema";
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
    const police = await db.policeStation.count()


    return {
        customers,
        staffs,
        probates,
        transactions,
        cases,
        inmates,
        police,
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
            courtName,
            tribunal,
            // infrastructure,
            courtLocalGovernment,
            gender,
            jurisdiction,
            // courtFunction,
            city,
            // name,
            // capacity,
            courtAddress,
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
                courtName,
                tribunal,
                level,
                jurisdiction: jurisdiction || "Jigawa State",
                courtLocalGovernment,
                city,
                courtAddress,
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
           cases: true,
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
            cases: true,
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

export const updateCourt = async (id: string, values: z.infer<typeof CourtRegisterSchema>) => {
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
            phone,
            state,
            courtName,
            gender,
            jurisdiction,
            city,
            tribunal,
            level,
            courtLocalGovernment,
    } = fieldValidation.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const updatedCourt = await db.user.update({
        where: {
            id: id
        },
        data: {
            firstName,
            lastName,
            otherNames,
            password: hashedPassword,
            email,
            phone,
            state,
            gender,
            localGovernment,
            court: {
                update: {
                    data: {
                       courtName,
                       
                       updatedAt: Date.now().toLocaleString(),
                       jurisdiction,
                       level,
                       tribunal,
                       courtLocalGovernment
                    }
                }
                }
             }
        });


        return {success: "Court has been updated successfully!", data: updatedCourt} 
}
       



