"use server"
import * as z from 'zod'
import { signUpSchema } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { UserRole } from '@prisma/client';
import { UserSettingsSchema } from '@/lib/schema'



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


export const updateCustomerDetailsByEmail = async (id: string, values: z.infer<typeof UserSettingsSchema>) => {

    const dbCustomer = await db.user.findUnique({
        where: {
            email: id
        }
    })

    if (!dbCustomer) {
        return {error: "customer does not exist"}
    }


    
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