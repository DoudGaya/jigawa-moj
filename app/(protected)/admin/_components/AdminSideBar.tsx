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


const privateLinks = [
    {
        id: 1,
        name: 'Dashboard',
        url: "/admin/dashboard",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
        )
    },

    {
        id: 2,
        name: 'Customers',
        url: "/admin/customers",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
        )
    },

    {
        id: 3,
        name: 'Courts',
        url: "/admin/courts",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
          </svg>
        )
    },

    {
        id: 4,
        name: 'staffs',
        url: "/admin/staffs",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        )
    },

    {
        id: 1,
        name: 'cases',
        url: "/admin/cases",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>

        )
    },

    {
        id: 2,
        name: 'Inmates',
        url: "/admin/inmates",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
          </svg>
          
        )
    },

    {
        id: 3,
        name: 'Probates',
        url: "/admin/probates",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>

        )
    },

    {
        id: 4,
        name: 'Transactions',
        url: "/admin/transactions",
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
        id: 1,
        name: 'Ministry',
        url: "https://moj.jg.gov.ng/",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      
        )
    },
  ]

  


export const AdminDashboardSideBar = ( ) => {

    const pathname = usePathname()

  return (
<>
    <div className=' w-full hidden border-r dark:border-gray-700 dark:bg-black/80 dark:text-white md:flex flex-col md:w-[18rem] py-2 drop-shadow-sm px-4 bg-white'>
    <Link href={'/admin/dashboard'} className=" hover:bg-gray-200 p-2 m-2 rounded-lg flex flex-row space-x-3 items-center font-poppins">
        <Image src={logo} alt='Jigawa State Ministry of Justice ' className=' h-10 w-10 rounded-full border-2 border-primary object-contain' />
        <p className=' font-semibold text-sm'>Jigawa | Justice</p>
    </Link>
    <hr className=' border-b-1.5 border-primary ' />
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
    </div>
    <Sheet>
    <div className=" w-full md:hidden border-b flex justify-between shadow-sm z-10 items-center fixed left-0 top-0 bg-white px-8 py-3">
            <Link href={'/'}>
                <Image src={logo} alt='Jigawa State Ministry of Justice ' className=' h-10 object-left object-contain' />
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
                    <Image alt='Jigawa State Ministry of Justice ' className=' h-10 object-contain object-left' src={logo} />
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


