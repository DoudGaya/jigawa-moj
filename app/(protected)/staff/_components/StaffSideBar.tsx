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
        url: "/dashboard",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        </svg>
      
        )
    },
    {
        id: 2,
        name: 'Cases',
        url: "/staff-cases",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>      
        )
    },
    {
        id: 3,
        name: 'Customers',
        url: "/customers",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
        )
    },
    {
        id: 4,
        name: 'Profile',
        url: "/profile",
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        </svg>
      
        )
    },
    {
        id: 1,
        name: 'Ministry',
        url: "/ministry",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        </svg>
      
        )
    },
  ]

  


export const StaffSideBar = ( ) => {

    const pathname = usePathname()

  return (
<>
    <div className=' w-full hidden border-r dark:border-gray-700 dark:bg-black/80 dark:text-white md:flex flex-col md:w-[18rem] py-3 drop-shadow-sm px-4 bg-white'>
    <div className=" flex space-x-3 pb-2 items-center  font-semibold border-b">
        <Image src={logo} alt='Stablebricks logo' className=' h-10 w-10 rounded-full border-primary border-2 font-poppins object-contain object-start' />
        <p>Jigawa | Justice</p>
    </div>
    <div className=" flex flex-col py-6 px-2 space-y-3">
        {
            privateLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={`hover:bg-green-500/30 ${single.url == pathname && ' bg-primary text-white dark:text-black' } rounded-md space-x-2 w-full py-3 px-4 flex flex-row`}>
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
                <Image src={logo} alt='stable Bricks Logo' className=' h-10 object-left object-contain' />
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
                    <Image alt='StableBrick Logo' className=' h-10 object-contain object-left' src={logo} />
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


