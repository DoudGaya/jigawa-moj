import { v4 as uuid } from "uuid"
import { db } from "./db"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"

// Use Web Crypto API for Edge Runtime compatibility
const generateRandomToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}




export const generateTwoFactorToken = async (email: string) => {
    const token = generateRandomToken()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)
    const existingToken = await getTwoFactorTokenByEmail(email)


    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

   const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        }
    })

    return twoFactorToken
}

export const generatePasswordResetToken = async (email: string ) => {
    const token = uuid()
    const expires = new Date (new Date().getTime() + 3600 * 1000)
    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }


    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;
}



export const generateVerificationToken = async (email: string) => {
  
  
    const token = uuid()
    const expires = new Date (new Date().getTime() + 3600 * 1000)
    const existingTokens = await getVerificationTokenByEmail(email)


    if (existingTokens) {
        await db.verificationToken.delete({
            where: {
                id: existingTokens.id
            }
        })
     }

     const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
     })

     return verificationToken
}