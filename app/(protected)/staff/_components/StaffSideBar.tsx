"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import jigawa from '@/public/img/icons/jigawa-icon.png'
import { usePathname } from 'next/navigation'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { AuthMobileSignOut } from '@/app/(protected)/_components/AuthMobileSignOut'

  const privateLinks = [
    {
        id: 1,
        name: 'Dashboard',
        url: "/staff/dashboard",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        </svg>
      
        )
    },
    {
        id: 2,
        name: 'My Perfomance',
        url: "/staff/performance",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
            </svg>

          
        )
    },
    {
        id: 4,
        name: 'Update Records',
        url: "/staff/update",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
        )
    },

   
  ]

export const StaffSideBar = ( ) => {

    const pathname = usePathname()

    console.log(pathname)

  return (
<>
    <div className=' w-full hidden md:flex flex-col border-r dark:border-gray-600 md:w-[16rem] py-3 drop-shadow-sm px-4 dark:text-white bg-white dark:bg-black'>
    <div className="flex space-x-2 items-center hover:bg-gray-100/80 cursor-pointer p-2 rounded-md ">
        <Image src={jigawa} alt='Stablebricks logo' className='w-10 border-primary rounded-full border-2 h-10 block object-contain' />
        <p className=' font-poppins font-semibold text-xs'>Justice | Jigawa</p>
    </div>
    <div className=" flex flex-col py-4 px-2 space-y-3">
        {
            privateLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={` ${single.url == pathname ? ' bg-primary dark:bg-primary dark:text-black text-white' : "hover:bg-primary/20"} rounded-md text-sm space-x-2 w-full py-3 px-4 flex flex-row`}>
                        <span>{single.icon}</span>
                        <span>{single.name}</span>
                    </Link>
                )
            })
        }
    </div>

    <div className=" flex flex-col border-t border-black py-4 px-2 space-y-3">
        {
            publicLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={`${single.url == pathname ? ' bg-primary dark:bg-primary text-primary': " hover:bg-primary/20" } rounded-md space-x-2 w-full py-3 flex items-center text-sm px-4 flex-row`}>
                        <span> {single.icon} </span>
                        <span> {single.name} </span>
                    </Link>
                )   
            })
        }
    </div>
    </div>
    <Sheet>
    <div className=" w-full md:hidden border-b flex justify-between shadow-sm z-10 items-center fixed left-0 top-0 px-4 py-3">
            <Link href={'/'} className=' flex space-x-2 items-center'>
                <Image src={jigawa} alt='Stablebricks logo' className='w-8 border-primary rounded-full border-2 h-8 block object-contain' />
                <p className=' font-poppins font-semibold text-xs'>Justice | Jigawa</p>
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
        <SheetContent side={'left'} className=" h-full w-[80%]">
            <SheetHeader>
            <SheetTitle className=" flex ">
                <div className=" flex items-center space-x-2">
                    <Image src={jigawa} alt='Jigawa State Ministry of Justice' className='w-8 border-primary rounded-full border-2 h-8 block object-contain' />
                    <p className=' font-poppins font-semibold text-xs'>Justice | Jigawa</p>
                </div>
            </SheetTitle>
            <SheetDescription className=' flex h-full flex-col justify-between '>
             <div className=" ">
                <div className=" flex flex-col py-6 items-start space-y-4">
                    {
                        privateLinks.map((nav) => {
                            return ( 
                                <Link href={nav.url} key={ nav.id } className={` ${nav.url == pathname ? ' bg-primary dark:bg-primary dark:text-black text-white' : "hover:bg-primary/20"} rounded-md text-sm space-x-2 w-full py-3 px-4 flex flex-row`}> 
                                    <SheetTrigger>
                                        <div className=" flex space-x-3 items-center w-full flex-row">
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
                                <Link href={nav.url} key={ nav.id } className={` ${nav.url == pathname ? ' bg-primary dark:bg-primary dark:text-black text-white' : "hover:bg-primary/20"} rounded-md text-sm space-x-2 w-full py-3 px-4 flex flex-row`}> 
                                    <SheetTrigger>
                                        <div className=" flex space-x-4 w-full items-center flex-row">
                                            <span>{ nav.icon }</span>
                                            <span>{ nav.name }</span>
                                        </div>
                                    </SheetTrigger>
                                </Link> 
                            )
                        })
                    }
                </div>
             </div>
            <AuthMobileSignOut />
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</>
  )
}


