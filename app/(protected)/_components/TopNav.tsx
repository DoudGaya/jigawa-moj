"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import jigawa from '@/public/img/icons/jigawa-icon.png'
import Link from 'next/link'
import { DarkButton } from '@/components/DarkButton'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/use-current-user'
import { logOut } from '@/actions/logout'




const logout = () => {
    logOut()
}


export const TopNav = () => {

    const session = useSession()
    const currentUser = useCurrentUser()
  return (
    <div className="hidden lg:flex justify-between bg-white dark:bg-black border-b dark:border-gray-700  dark:text-gray-300 drop-shadow-sm px-12 py-2.5 items-center w-full">
    <div className=" font-poppins font-semibold"> Welcome, { currentUser?.firstName } </div>
    <div className="">
      <Popover>
      <PopoverTrigger asChild>
        <div className=' cursor-pointer' >
            <Image alt='' src={ jigawa} className=' h-10 w-10 rounded-full border-2 border-primary object-center object-cover' />
        </div>
      </PopoverTrigger>
      <PopoverContent align='end' className=" w-56 items-start justify-start self-start">
        <div className="grid gap-4">
          <div className="space-y-2">
           <div className=" py-3 px-2 border-b">
           <h4 className="font-medium leading-none">Profile Settings</h4>
           </div>
            <ul>
              <li>
                <Link href={'/admin/profile'}>Admin Profile </Link>
              </li>
            </ul>
            <div className=" flex space-x-3">
              <DarkButton />
                <button onClick={logout} className=' bg-black py-2 w-full rounded-lg outline-none text-primary hover:bg-black/90'>Sign Out</button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>

    </div>
  </div>
  )
}
