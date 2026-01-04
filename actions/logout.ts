"use server"

import { auth, signOut } from "@/auth"
import { cookies } from "next/headers"

export const logOut = async () => {
  // Get the session to check if user is authenticated
  const session = await auth()
  
  if (session) {
    // Clear all auth-related cookies
    const cookieStore = await cookies()
    cookieStore.getAll().forEach((cookie) => {
      if (cookie.name.includes("next-auth")) {
        cookieStore.delete(cookie.name)
      }
    })

    // Sign out with redirect
    await signOut({ 
      redirectTo: "/",  // Specify your login page route
      redirect: true
    })
  }
}