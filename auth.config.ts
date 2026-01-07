// @ts-nocheck
import  Credentials  from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from 'bcryptjs' 
import { loginSchema } from "./lib/schema"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { getUserByEmail } from "./data/user"
 
export default { 
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize( credentials) {
                console.log("Login attempt for:", credentials?.email);
                const validatedFields = loginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const {email, password } = validatedFields.data
                    const user = await getUserByEmail(email)

                    if(!user) {
                        console.log("User not found");
                        return null;
                    } 
                    if (!user.password) {
                        console.log("User has no password");
                        return null;
                    }
                    
                    const passwordMatched = await bcrypt.compare( password, user.password )
                    console.log("DEBUG AUTH:", {
                        input: password,
                        inputLen: password.length,
                        hash: user.password,
                        hashLen: user.password.length,
                        match: passwordMatched
                    });

                    if(passwordMatched) return user 
                } else {
                    console.log("Validation failed");
                }

                return null
            }
        })
    ]

} satisfies NextAuthConfig