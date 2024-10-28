import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { AdminCreateCustomerForm } from './AdminCreateCustomerForm'

  

export const CustomerActionArea = ({customerCount}: {customerCount: number} ) => {

  return (
    <div className=" flex w-full  shadow-sm border bg-white rounded-md p-4 justify-between items-center">
        <div className=" flex space-x-2  items-center  bg-green-200/50 px-4 py-1 rounded-lg font-semibold ">
            <p className=' font-poppins rounded-lg text-green-900 '> { customerCount } users </p>
        </div>
       <div className="">
        <Dialog>
                <DialogTrigger className=' bg-primary text-white px-4 py-2 text-sm  rounded-md font-poppins'>Create New Customer</DialogTrigger>
                <DialogContent className='h-[600px] w-[90%] rounded-lg overflow-y-scroll'>
                    <DialogHeader>
                    <DialogTitle>Create a New Customer</DialogTitle>
                        <ScrollArea className=''>
                            <AdminCreateCustomerForm />
                        </ScrollArea>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
       </div>
    </div>
  )
}