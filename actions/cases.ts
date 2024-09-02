"use server"
import * as z from 'zod'
import { customerCreateCase } from '@/lib/schema'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'


export const customerCreateCaseAction = async (values: z.infer<typeof customerCreateCase>) => {

    const user = await currentUser()


    if (!user) {
        return {error: "User does not exist"}
    }




    return {success: "Case Filing have been Submitted!"}
}