"use server"
import { auth, signOut } from "@/auth"

export const logOut = async () => {
    await signOut()
}