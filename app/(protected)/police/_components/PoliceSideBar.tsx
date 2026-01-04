"use client"
import React, {useState} from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import Link from 'next/link'
  import logo from '@/public/img/icons/jigawa-icon.png'
  import { useRouter } from "next/navigation"
  import { usePathname } from 'next/navigation'
  import Image from 'next/image'
  
  import { Button } from '@/components/ui/button'
  import { Menu } from "lucide-react"
import LogoutButton from '@/components/auth/LogOutButton'


const privateLinks = [
  {
      id: 1,
      name: 'Dashboard',
      url: "/police/dashboard",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      )
  },

  {
      id: 2,
      name: 'Submitted Cases',
      url: "/police/submitted-cases",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      )
  },  

  {
      id: 4,
      name: 'Draft Cases',
      url: "/police/draft-cases",
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      )
  },
]



export const PoliceSideBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
  return (
    <div className=' h-full'>
    <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle className='flex space-x-2 items-center  '>
                <Image src={logo} className=' rounded-full h-10 w-10 border-2 border-primary object-contain object-center ' alt=''  />
                <span className=' font-poppins font-semibold text-sm'>jigawa | Justice</span>
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col py-10 my-10 justify-between space-y-8">
            <div className=" flex flex-col space-y-4">
            {
              privateLinks.map((single) => {
                  return (
                      <Link href={single.url} key={single.id} className={`${single.url == pathname ? ' bg-green-500 text-white hover:bg-jgreen dark:text-black' : "hover:bg-gray-200 dark:hover:bg-gray-800 " } rounded-md space-x-2 w-full py-3 px-4 flex flex-row`}>
                          <span>{single.icon}</span>
                          <span>{ single.name}</span>
                      </Link>
                  )
              })
            }
            </div>
            <div className=" mb-8 ">
                <LogoutButton />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
        <aside className="hidden w-64 bg-white h-full px-6 py-1 lg:block">
          <div className='flex space-x-2 items-center border-b py-2  '>
                <Image src={logo} className=' rounded-full h-10 w-10 border-2 border-primary object-contain object-center ' alt=''  />
                <span className=' font-poppins font-semibold text-sm'>jigawa | Justice</span>
            </div>
            <nav className="flex flex-col my-10 space-y-2">
            {
              privateLinks.map((single) => {
                  return (
                      <Link href={single.url} key={single.id} className={`${single.url == pathname ? ' bg-green-500 text-white hover:bg-jgreen dark:text-black' : "hover:bg-gray-200 dark:hover:bg-gray-800 " } rounded-md space-x-2 w-full py-3 px-4 flex flex-row`}>
                          <span> {single.icon} </span>
                          <span> { single.name} </span>
                      </Link>
                  )
              })
            }
            </nav>
        </aside>
    </div>
  )
}
