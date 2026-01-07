"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '@/public/img/icons/jigawa-icon.png'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from '@/components/ui/scroll-area'


const privateLinks = [
    {
        id: 1,
        name: 'Dashboard',
        url: "/court/dashboard",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
        )
    },
    {
        id: 2,
        name: 'Cases',
        url: "/court/cases",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
        )
    },

    {
        id: 3,
        name: 'Transactions',
        url: "/court/transactions",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
        )
    },

]

  const publicLinks = [
    {
        id: 1,
        name: 'Home',
        url: "/",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        )
    },

    {
        id: 2,
        name: 'Ministry',
        url: "https://moj.jg.gov.ng/",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      
        )
    },
  ]

  


export const CourtSideBar = ( ) => {

    const pathname = usePathname()

  return (
<>
    <div className=' w-full hidden border-r dark:border-gray-700 dark:bg-black/80 dark:text-white md:flex flex-col md:w-[18rem] py-2 drop-shadow-sm px-4 bg-white'>
    <Link href={'/admin/dashboard'} className=" hover:bg-gray-200 p-2 m-2 rounded-lg flex flex-row space-x-3 items-center font-poppins">
        <Image src={logo} alt='jigawa State Ministry of Justice ' className=' h-10 w-10 rounded-full border-2 border-primary object-contain' />
        <p className=' font-semibold text-sm'>Zamfara| Justice</p>
    </Link>
    <hr className=' border-b-1.5 border-primary ' />
   <ScrollArea>
   <div className=" flex flex-col py-4 px-2 space-y-3">
        
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
    </div>

    <div className=" flex flex-col border-t border-green-500 py-4 px-2 space-y-3">
        {
            publicLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={`${single.url == pathname ? ' bg-green-500 text-white hover:bg-jgreen dark:text-black' : "hover:bg-gray-200 dark:hover:bg-gray-800 " } rounded-md space-x-2 w-full py-3 px-4 flex flex-row`}>
                        <span> {single.icon} </span>
                        <span> { single.name} </span>
                    </Link>
                )   
            })
        }
    </div>
   </ScrollArea>
    </div>
    <Sheet>
    <div className=" w-full md:hidden border-b flex justify-between shadow-sm z-10 items-center fixed left-0 top-0 bg-white px-8 py-3">
            <Link href={'/'}>
                <Image src={logo} alt='jigawa State Ministry of Justice ' className=' h-10 object-left object-contain' />
            </Link>
            <div className=" flex justify-between">
                <SheetTrigger>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </SheetTrigger>
            </div>
        </div>
        {/* @ts-ignore */}
        <SheetContent side={'left'} className="">
            <SheetHeader>
            <SheetTitle className=" flex items-center  ">
                <div className=" px-2 flex items-center">
                    <Image alt='jigawa State Ministry of Justice ' className=' h-10 object-contain object-left' src={logo} />
                </div>
            </SheetTitle>
            <SheetDescription>
              <div className=" flex flex-col px-2 py-6 items-start space-y-4">
                {
                    privateLinks.map((nav) => {
                        return ( 
                            <Link href={nav.url} key={ nav.id } className=' font-poppins font-semibold text-lg text-black hover:text-green-500'> 
                                <SheetTrigger>
                                    <div className=" flex space-x-4 w-full flex-row">
                                       <span> {nav.icon}</span>
                                        <span>{nav.name}</span>
                                    </div>
                                </SheetTrigger>
                            </Link>
                        )
                    })
                }
            
              </div>
              <div className=" flex flex-col border-t border-green-500 px-2 py-6 items-start space-y-4">
                {
                    publicLinks.map((nav) => {
                        return ( 
                            <Link href={nav.url} key={ nav.id } className=' font-poppins font-semibold text-lg text-black hover:text-green-500'> 
                                <SheetTrigger>
                                    <div className=" flex space-x-4 w-full flex-row">
                                        <span>{ nav.icon }</span>
                                        <span>{ nav.name }</span>
                                    </div>
                                </SheetTrigger>
                            </Link>
                        )
                    })
                }
              </div>
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</>
  )
}


