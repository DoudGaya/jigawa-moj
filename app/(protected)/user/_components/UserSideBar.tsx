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
        url: "/user/dashboard",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        </svg>
      
        )
    },
    {
        id: 2,
        name: 'eFilings',
        url: "/user/e-filing",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
        )
    },
    {
        id: 3,
        name: 'Probates',
        url: "/user/probates",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          
        )
    },
    {
        id: 4,
        name: 'Profile',
        url: "/user/profile",
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

export const UserDashboardSideBar = ( ) => {

    const pathname = usePathname()

  return (
<>
    <div className=' w-full hidden md:flex flex-col border-r dark:border-gray-600 md:w-[16rem] py-3 drop-shadow-sm px-4 dark:text-white bg-white dark:bg-black'>
    <div className="flex space-x-2 items-center hover:bg-gray-100/80 cursor-pointer p-2 rounded-md ">
        <Image src={jigawa} alt='Zamfara State' className='w-10 border-primary rounded-full border-2 h-10 block object-contain' />
        <p className=' font-poppins font-semibold text-xs'>Jusrtice | Zamfara</p>
    </div>
    <div className=" flex flex-col py-4 px-2 space-y-3">
        {
            privateLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={`hover:text-primary ${single.url == pathname &&' bg-primary dark:bg-primary dark:text-black text-white'} rounded-md text-sm space-x-2 w-full py-3 px-4 flex flex-row`}>
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
                    <Link href={single.url} key={single.id} className={`hover:text-primary ${single.url == pathname && ' bg-black dark:bg-primary text-primary text-black/80' } rounded-md font-poppins font-semibold space-x-2 w-full py-3 flex items-center text-sm px-4 flex-row`}>
                        <span> {single.icon} </span>
                        <span> {single.name} </span>
                    </Link>
                )   
            })
        }
    </div>
    </div>
    <Sheet>
    <div className=" w-full md:hidden border-b flex justify-between shadow-sm z-10 items-center fixed left-0 top-0 bg-white px-6 py-3">
            <Link href={'/'}>
                 <div className="flex space-x-2 items-center hover:bg-gray-100/80 cursor-pointer p-2 rounded-md ">
                    <Image src={jigawa} alt='Zamfara State' className='w-10 border-primary rounded-full border-2 h-10 block object-contain' />
                    <p className=' font-poppins font-semibold text-xs'>Jusrtice | Zamfara</p>
                </div>
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
                     <div className="flex space-x-2 items-center hover:bg-gray-100/80 cursor-pointer rounded-md ">
                        <Image src={jigawa} alt='Zamfara State' className='w-10 border-primary rounded-full border-2 h-10 block object-contain' />
                        <p className=' font-poppins font-semibold text-xs'>Jusrtice | Zamfara</p>
                    </div>
                </div>
            </SheetTitle>
            <SheetDescription>
              <div className=" flex flex-col px-2 py-6 items-start space-y-4">
                {
                    privateLinks.map((nav) => {
                        return ( 
                            <Link href={nav.url} key={ nav.id } className={`hover:text-primary ${nav.url == pathname &&' bg-primary dark:bg-primary dark:text-black text-white'} rounded-md text-sm space-x-2 w-full py-3 px-4 flex flex-row`}> 
                                <SheetTrigger>
                                    <div className=" flex space-x-4 w-full flex-row font-semibold">
                                       <span> {nav.icon}</span>
                                        <span>{nav.name}</span>
                                    </div>
                                </SheetTrigger>
                            </Link>
                        )
                    })
                }
            
              </div>
              <div className=" flex flex-col border-t border-yellow-500 px-2 py-6 items-start space-y-4">
                {
                    publicLinks.map((nav) => {
                        return ( 
                            <Link href={nav.url} key={ nav.id } className={`${nav.url == pathname ? " bg-primary dark:bg-primary dark:text-black text-white" : 'hover:text-primary text-black '} font-poppins rounded-md items-center text-sm space-x-2 w-full py-3 px-4 flex flex-row`}> 
                                <SheetTrigger>
                                    <div className=" flex space-x-4 w-full items-center flex-row">
                                        <span>{  nav.icon }</span>
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
          <AuthMobileSignOut />
        </SheetContent>
    </Sheet>
</>
  )
}


