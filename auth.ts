import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import {PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./actions/account"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        error: '/error' 
    },
    events: {
        async linkAccount( { user }) {
            await db.user.update({
                where: {  id: user.id, },
                data: {
                    emailVerified: new Date()
                }
            })
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            // allow login
            if (account?.provider !== 'credentials') return true
            if (!user.id) return false
            
            // @ts-ignore
            const existingUser = await getUserById(user.id)
            if (!existingUser?.emailVerified) return false 

            // TODO: 2FA Authenication
            if (existingUser.isTwoFactorEnabled) {
                
                const twofactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                if (!twofactorConfirmation) return false
                
                await db.twoFactorConfirmation.delete({
                    where: {id: twofactorConfirmation.id }
                })
            }

            return true
        }, 

        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }

             if (session.user) {
                 session.user.firstName = token.firstName as string
                 session.user.lastName = token.lastName as string
                 session.user.otherNames = token.othernames as string
                 session.user.email = token.email as string 
                 session.user.phone = token.phone as string
                 session.user.image = token.image as string 
                 session.user.isOAuth  = token.isOAuth as boolean
                //  USER SPECIFICS 
                session.user.localGovernment = token.localGovernment as string
                session.user.address = token.address as string
                session.user.gender = token.gender as string
                session.user.city = token.city as string 
                session.user.occupation = token.occupation as string
                session.user.maritalStatus = token.maritalStatus as string
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean

                //  STAFFS SPECIFICS
                session.user.jobTitle = token.jobTitle as string
                session.user.staffNumber  = token.staffNumber as string
                session.user.employerName = token.employerName as string
                session.user.position  = token.position as string 
                session.user.department = token.department as string
                session.user.step = token.step as string
                session.user.employmentLocation = token.employmentLocation as string
                session.user.salaryGrade = token.salaryGrade as string
                session.user.salaryStructure = token.salaryStructure as string

             }
            return session
        },
        
        async jwt({ token}) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token
            const existingAccount = await getAccountByUserId(existingUser.id) 
            token.isOAuth = !!existingAccount
            token.firstName = existingUser.firstName
            token.lastName   = existingUser.lastName
            token.otherNames = existingUser.otherNames
            token.email = existingUser.email
            token.phone = existingUser.phone
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.password = existingUser.password
            token.image = existingUser.image
            token.role = existingUser.role;
            token.localGovernment = existingUser.localGovernment

            token.address = existingUser.customer?.address
            token.gender = existingUser.gender
            token.city = existingUser.customer?.city
            token.occupation = existingUser.customer?.occupation
            token.maritalStatus = existingUser.customer?.maritalStatus
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled


            //  STAFFS SPECIFICS
            token.jobTitle = existingUser.staff?.jobTitle
            token.staffNumber = existingUser.staff?.staffNumber
            token.employerName = existingUser.staff?.employerName
            token.position = existingUser.staff?.position
            token.department = existingUser.staff?.department
            token.step = existingUser.staff?.step
            token.employmentLocation = existingUser.staff?.employmentLocation
            token.salaryGrade = existingUser.staff?.salaryGrade
            token.salaryStructure = existingUser.staff?.salaryStructure
            return token
        },
       
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig, 
})