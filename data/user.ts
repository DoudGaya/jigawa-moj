import { db } from "@/lib/db";

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


