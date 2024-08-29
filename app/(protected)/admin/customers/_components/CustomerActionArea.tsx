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
    <div className=" flex w-full  shadow-md border border-primary rounded-md p-4 justify-between items-center">
        <div className=" flex space-x-2 items-baseline hover:bg-gray-100 cursor-pointer">
            <p className=' font-poppins text-4xl rounded-lg '> { customerCount } </p>
            <p className=' font-semibold font-poppins text-lg '> Customers</p>
        </div>
       <div className="">
        <Dialog>
                <DialogTrigger className=' bg-primary text-white px-4 py-2 text-sm  rounded-md font-poppins'>Create New Customer</DialogTrigger>
                <DialogContent className='h-[600px] overflow-y-scroll'>
                    <DialogHeader>
                    <DialogTitle>Create a New Customer</DialogTitle>
                        <ScrollArea>
                            <AdminCreateCustomerForm />
                        </ScrollArea>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
       </div>
    </div>
  )
}