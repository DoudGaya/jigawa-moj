import React from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'

export const AuthMobileSignOut = () => {
    const user = useCurrentUser()

    const logoutUser = () => {
        signOut()
    }
  return (
    <>
     { user && (
             <div className=" flex flex-col space-y-4">
                    <div className=" w-full rounded-lg  py-4 justify-between flex">
                        <Button onClick={logoutUser} variant={"link"} className=" bg-primary/80 text-white w-full flex space-x-2 justify-center items-center">
                            <p className=' font-poppins text-sm  px-3 py-0.5'>Logout</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-6 stroke-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </Button>
                    </div>
             </div>
           )
           }
    </>
  )
}
