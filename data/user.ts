import { db } from "@/lib/db";
import { sendWelcomeMailToUser } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { createUserSchema } from "@/lib/zod-schemas/user-schema";
import * as z from "zod";

export const getUserByEmail = async (email: string) => {
   try {
    const user = await db.user.findUnique({
        where: {
            email,
        }
    })
    return user
    
   } catch (error) {
        console.log(error)
   }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
            include: {
                customer: true,
                staff: true,
                court: true,
            }
        })
        return user
        
    } catch (error) {
       console.log(error)
    }
}


export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany(
            {
                include: {
                    customer: true,
                    staff: true,
                    court: true,
                    police: true,
                }
            }
        )
        return users
        
    } catch (error) {
       console.log(error)
    }
}



export const deleteUser = async (id: string) => {
    try {
        const user = await db.user.delete({
            where: {
                id
            }
        })
        return user
        
    } catch (error) {
       console.log(error)
    }
}



export const createUser = async (values: z.infer<typeof createUserSchema>) => {

    const validatedFields = createUserSchema.safeParse(values)

    if (!validatedFields.success) {
        throw new Error("Invalid data")
    }

    const {
        firstName,
        lastName,
        email,
        password,
        role,
        phone,
        state,
        localGovernment,
        passwordConfirmation,
        gender,
        otherNames,
    } = validatedFields.data


    try {
        const user = await db.user.create({
            data: {
                firstName,
                lastName,
                email,
                password,
                role,
                phone,
                state,
                localGovernment,
                otherNames,
                gender,   
            }
        })
        
        
        const token = generateVerificationToken(email)
        
        
        await sendWelcomeMailToUser(email,  password, (await token).token)
        
        return { user: user, success: "User Created Successfully" }
    } catch (error) {
       console.log(error)
    }

}



export const updateUserById = async (id: string, values: z.infer<typeof createUserSchema>) => {

    const validatedFields = createUserSchema.safeParse(values)


    if (!validatedFields.success) {
        return {error: 'Fileds not Validated'}
    }

    const {
        email,
        firstName,
        gender,
        lastName,
        localGovernment,
        password,
        passwordConfirmation,
        phone,
        role,
        state,
        otherNames
    } = validatedFields.data
    const userExist = getUserById(id)

    if (!userExist) {
        return {error: 'User does not exist'}
    }

    try {
        const user = await db.user.update({
            where: {
                id,
            },
            data: {
                email,
                firstName,
                gender,
                lastName,
                localGovernment,
                password,
                phone,
                role,
                state,
                otherNames
            }
        })

        return {success: 'User has been created', user: user}
    } catch (error) {
        
    }


    // return {}

}