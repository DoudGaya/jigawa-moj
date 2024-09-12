"use server"
import * as z from 'zod'
import { signUpSchema } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { UserRole } from '@prisma/client';
import { UserSettingsSchema } from '@/lib/schema'
import { UpdateUserRecordSchema } from '@/lib/schema'



const PAGE_SIZE = 10
export const getAllCustomers = async ({pagenum }:{pagenum: number}) => {
    const customersPromise =  db.user.findMany({
        where: {
          role: UserRole.USER  
        },
        include: {
            customer: true,
        },
        skip: +pagenum || 0 * PAGE_SIZE,
        take: PAGE_SIZE,
    })

    const totalCustomersPromise  =  db.customer.count()

    const [customers, totalCustomers ] = await Promise.all([customersPromise, totalCustomersPromise])
    
    const totalPages = Math.floor(totalCustomers / PAGE_SIZE)

    return {
        customers,
        totalCustomers,
        totalPages
    }
}
    
export const getAllCustomerCount = () => {
    return db.customer.count()
}


export const createNewCustomer = async (values: z.infer<typeof signUpSchema>) => {
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
            emailVerified: new Date(),
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

    return {success: "new Customer as been create!"}
}


export const getCustomerCount = async () => {
    return await db.customer.count()
}

export const createManyCustomers = async () => {
    console.log("Many")
}








export const getCustomerByUserId = async (id: string) => {
    const customer = await db.user.findFirst({
        where: {
            id: id
        }, 
        include: {
            customer: {

                include: {
                    _count: true,
                    cases: {
                      include: {
                        _count: true
                      }  
                    },
                    probates: {
                        include: {
                            _count: true
                        }
                    },
                    transactions: true
                }
            }
        }
    })

    return customer
}


export const updateCustomerDetailsId = async (id: string, values: z.infer<typeof UpdateUserRecordSchema>) => {
    const fieldValidation = UpdateUserRecordSchema.safeParse(values);
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

    const dbCustomer = await getCustomerByUserId(id)

    console.log(dbCustomer)

    if (!dbCustomer) {
        return {error: "customer does not exist"}
    }


    if (values.email && values.email !== dbCustomer.email ) {
        const existingUser = await getUserByEmail(values.email)


        if (existingUser && existingUser.id !== dbCustomer.id) {
            return {error: "Email Already in used by another user!"}
        }
    }

    if (values.password && values.passwordConfirmation) {
        if (values.password !== values.passwordConfirmation) {
            return {error: "Password Does not Matched"}
        }

        const hashedPassword = await bcrypt.hash(values.password, 10)

        values.password = hashedPassword
    }







   


    await db.user.update({
        where: {id: dbCustomer.id},
        data: {
            firstName,
            lastName,
            otherNames,
            email,
            phone,
            gender,
            state,
            localGovernment,
            password,
             customer: { 
            update: {
                maritalStatus,
                occupation,
                city,
                employmentStatus,
                address,
            }
        }},
        include: {
            customer: true
        }
    })


    return {success: "Records has been updated!"}


}








export const deleteUserAndCustomerDetailsById = async (id: string) => {

    const dbCustomer = await db.user.findFirst({
        where: {
            id: id
        }
    })

    if (!dbCustomer) {
        return {error: "Customer does not exist!"}
    }

    await db.user.delete({
        where: {
            id: id
        }
    })

    return {success: "Customer has been deleted"}
}   


// customer actions 