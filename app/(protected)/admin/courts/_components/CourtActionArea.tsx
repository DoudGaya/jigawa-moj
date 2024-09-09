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
import { AdminCreateCourtForm } from './AdminCreateCourtForm'

export const CourtActionArea = () => {

  return (
    <div className=" flex w-full shadow-sm border bg-white rounded-lg p-4 justify-between items-center">
        <div className=" flex space-x-2 items-baseline hover:bg-gray-100 cursor-pointer">
            <p className=' font-poppins text-4xl rounded-lg '> { "" } </p>
            <p className=' font-semibold font-poppins text-lg '> Courts</p>
        </div>
       <div className="">
        <Dialog>
                <DialogTrigger className=' bg-primary text-white px-4 py-2 text-sm  rounded-md font-poppins'>Create New Court</DialogTrigger>
                <DialogContent className=' h-[400px] lg:h-[600px] overflow-y-scroll'>
                    <DialogHeader>
                    <DialogTitle className=' text-center pt-2'>Register a new Court</DialogTitle>
                        <ScrollArea>
                            <AdminCreateCourtForm />
                        </ScrollArea>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
       </div>
    </div>
  )
}