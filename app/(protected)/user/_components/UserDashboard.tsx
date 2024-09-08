import { Button } from '@/components/ui/button'
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
import { CustomerCreateCaseForm } from './CustomerCreateCaseForm'



const cases = [
  {
    id: 1,
    caseTitle: "Someone stole my Bike!",
    caseDescription: "I was sitting in my room while someone sneaked in and stole my bike!",
    filingType: "CASE",
    filingStatus: "Submitted",
  }
]

export const UserDashboard = () => {
  return (
    <div className=' flex mx-auto w-full flex-col space-y-4'>
        <div className=" flex px-10 w-full py-3 bg-green-200/40 items-center justify-between">
           <div className=" bg-white flex rounded-md space-x-2 py-2 items-baseline px-6">
               <p className=' font-poppins font-semibold text-2xl '>{'0'}</p> <span className=' text-sm font-poppins'>Total Filings</span>
           </div>

           <div className=" flex fle-col items-center">
            <small className=' font-poppins text-lg'>e-Filings</small>
              <div className=" flex rounded-md space-x-3 py-2 items-baseline px-6">

              <Dialog>
                  <DialogTrigger className=' bg-primary text-white px-4 py-2 text-sm  rounded-md font-poppins'>File a Case</DialogTrigger>
                  <DialogContent className='h-[600px] overflow-y-scroll'>
                      <DialogHeader>
                      <DialogTitle className=' text-center pt-2'>File a Case</DialogTitle>
                          <ScrollArea>
                            <CustomerCreateCaseForm />
                          </ScrollArea>
                      </DialogHeader>
                  </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className=' bg-primary text-white px-4 py-2 text-sm  rounded-md font-poppins'>Submit a Probate</DialogTrigger>
                <DialogContent className='h-[600px] overflow-y-scroll'>
                    <DialogHeader>
                    <DialogTitle className=' text-center pt-2'>Submit a Probate</DialogTitle>
                        <ScrollArea>
                           
                        </ScrollArea>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

              </div>
           </div>
        </div>

        <div className=" max-w-6xl w-full mx-auto bg-white py-10 grid grid-cols-6">

        </div>
    </div>
  )
}
