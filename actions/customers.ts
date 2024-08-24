"use server"
import { db } from "@/lib/db"



export const getAllCustomers = async () => {
    const customers = await db.customer.findMany()
    return customers
}


export const getCustomerCount = async () => {
    return await db.customer.count()
}


export const getCustomerByCustomerId = async (id: string) => {

}


export const updateCustomerDetailsById = async () => {
    
}


export const deleteCustomerDetailsById = () => {

}