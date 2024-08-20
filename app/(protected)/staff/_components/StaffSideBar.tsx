"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/stablebricks.png'
import { usePathname } from 'next/navigation'

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
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
        </svg>
      
        )
    },
  ]

  const publicLinks = [
    {
        id: 1,
        name: 'Assets on Sell',
        url: "/admin/assets-on-sell",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>

        )
    },
  ]

  


export const AdminDashboardSideBar = ( ) => {

    const pathname = usePathname()

  return (
<>
    <div className=' w-full hidden border-r dark:border-gray-700 dark:bg-black/80 dark:text-white md:flex flex-col md:w-[18rem] py-6 drop-shadow-sm px-4 bg-white'>
    <div className=" divide-y-2 pb-2 border-b border-yellow-500">
        <Image src={logo} alt='Stablebricks logo' className=' h-10 object-contain' />
    </div>
    <div className=" flex flex-col py-4 px-2 space-y-3">
        {
            privateLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={`hover:bg-yellow-500/30 ${single.url == pathname && ' bg-yellow-500 text-white dark:text-black' } rounded-md space-x-2 w-full py-3 px-4 flex flex-row`}>
                        <span> {single.icon} </span>
                        <span> { single.name} </span>
                    </Link>
                )
            })
        }
    </div>

    <div className=" flex flex-col border-t border-yellow-500 py-4 px-2 space-y-3">
        {
            publicLinks.map((single) => {
                return (
                    <Link href={single.url} key={single.id} className={`hover:bg-yellow-500/30 ${single.url == pathname && ' bg-yellow-500 text-white dark:text-black' } rounded-md space-x-2 w-full py-3 px-4 flex flex-row`}>
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
                            <Link href={nav.url} key={ nav.id } className=' font-poppins font-semibold text-lg text-black hover:text-yellow-500'> 
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
              <div className=" flex flex-col border-t border-yellow-500 px-2 py-6 items-start space-y-4">
                {
                    publicLinks.map((nav) => {
                        return ( 
                            <Link href={nav.url} key={ nav.id } className=' font-poppins font-semibold text-lg text-black hover:text-yellow-500'> 
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


