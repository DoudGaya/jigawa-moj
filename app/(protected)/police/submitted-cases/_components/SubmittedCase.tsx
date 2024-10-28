import { Separator } from '@/components/ui/separator'
import { PoliceCaseSchemaType } from '@/typings'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'


import React from 'react'

export const SubmittedCase = ( {item}: {item: PoliceCaseSchemaType} ) => {
  return (
    <div className=' bg-white flex rounded-lg  shadow-sm flex-col'>
        <div className=" flex flex-col px-4 py-4">
          <div className=" my-2 py-2 flex items-center justify-between spaxe-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <span className=' text-sm bg-green-500/30 px-1.5 cursor-pointer font-mono rounded-md'> { item.caseNumber } </span>
        </div>
        <Separator className=' mb-4' />
        <div className=" flex flex-col space-y-6">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Title</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ item.title }</p>
            </div>
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Description</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ item.caseDescription }</p>
            </div>
        </div>

        <div className=" flex w-full py-4">
        <div className=" flex w-full justify-between">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Name of IPO</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ item.nameOfIPO }</p>
            </div>
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Place of Offence</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ item.placeOfOffense }</p>
            </div>
        </div>
        </div>
       </div>

       
       <Drawer>
        <DrawerTrigger className=' bg-green-500 w-full rounded-b-lg px-3 py-2 flex text-center justify-center text-white'>Details</DrawerTrigger>
          <DrawerContent className=' h-[70vh] max-w-7xl my-auto mx-auto '>
            <div className="w-full h-full">
              Hello World 
            </div>
          </DrawerContent>
        </Drawer>
    </div>
  )
}