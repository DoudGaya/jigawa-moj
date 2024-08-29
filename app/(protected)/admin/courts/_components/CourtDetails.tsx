import React from 'react'
import { CourtWithAllRecords } from '@/typings'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from '@/public/private/avatar.png'

export const CourtDetails = ({court }: {court: CourtWithAllRecords}) => {

  return (
   <ScrollArea>
     <div className=' w-full h-full max-w-7xl mx-auto p-6 flex flex-col space-y-4'>
          <div className="grid grid-cols-3 my-3 gap-6">
           <div className=" flex flex-col w-full">
              <div className=" flex justify-center text-center w-full">
                    <h2 className=' border-b py-2 my-2 border-primary px-3 font-semibold font-secondary'>Court Details</h2>
              </div>
           <div className=" flex flex-col rounded-lg bg-gray-100 items-center py-6 px-6 ">
            <div className=" border-4 rounded-full border-jyellow p-3 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
            </div>
              <h2 className=' font-poppins font-semibold '>{ court.name }</h2>
              <small className=' font-poppins'> ( { court.level } ) </small>
            <div className="flex flex-col py-6 space-y-3 justify-between w-full">
                <div className=" flex flex-col bg-white p-4 rounded-lg space-y-4">
                <div className=" w-full flex justify-between items-center">
                  <div className=" flex flex-col">
                    <small className=' text-xs uppercase  text-gray-500 tracking-wide font-poppins'>Function</small>
                    <p className='text-gray-800 '> { court.function } </p>
                  </div>
                  <div className=" flex flex-col justify-end items-end">
                    <small className=' text-xs uppercase  text-gray-500 tracking-wide font-poppins'>Cases</small>
                    <p className='text-gray-800 '> { court.cases.length } </p>
                  </div>
                </div>
                <div className=" w-full flex justify-between items-center">
                  <div className=" flex flex-col">
                    <small className=' text-xs uppercase  text-gray-500 tracking-wide font-poppins'>Jurisdiction</small>
                    <p className='text-gray-800 '> { court.jurisdiction } </p>
                  </div>
                  <div className=" flex flex-col justify-end items-end">
                    <small className=' text-xs uppercase  text-gray-500 tracking-wide font-poppins'>Capacity</small>
                    <p className='  text-gray-800 '> { court.capacity} </p>
                  </div>
                </div>
                <div className=" w-full flex justify-between items-center">
                  <div className=" flex flex-col">
                    <small className=' text-xs uppercase  text-gray-500 tracking-wide font-poppins'>Function</small>
                    <p className='text-gray-800 '> { court.function } </p>
                  </div>
                  <div className=" flex flex-col justify-end items-end">
                    <small className=' text-xs uppercase  text-gray-500 tracking-wide font-poppins'>Staffs</small>
                    <p className='text-gray-800 '> { court.staffs.length } </p>
                  </div>
                </div>
                </div>
                <div className=" flex flex-col w-full items-center text-center">
                  <span className=' font-poppins font-semibold py-2 '>Infrastructure</span>
                  <div className="flex flex-col bg-white p-4 w-full rounded-lg space-y-4">
                    { court.infrastructure.map((single) => {
                        return (
                          <div key={single.id} className=" w-full flex flex-row justify-between">
                            <span> {single.name} </span>
                            <span> {single.number} </span>
                          </div>
                        )
                    }) }
                  </div>
                </div>
            </div>
            </div>
           </div>
           <div className=" flex flex-col w-full">
           <div className=" flex justify-center text-center w-full">
           <h2 className=' border-b py-2 my-2 font-semibold border-primary px-3 font-secondary'>Admin Details</h2>
           </div>
           <div className=" flex flex-col rounded-lg bg-gray-100 items-center py-6 px-6 ">
              <div className=" flex flex-col items-center w-full space-y-2 justify-center">
                <div className=" flex items-center justify-center flex-col">
                  <Avatar className=' h-14 w-14'>
                    <AvatarImage className=' bg-white rounded-full border-2 p-1 border-primary' src={avatar.src} />
                    <AvatarFallback>
                    <AvatarImage src={avatar.src} />
                    </AvatarFallback>
                  </Avatar>
                </div>
                    <h2 className=' font-poppins'> { court.user.firstName } { court.user.lastName} </h2>
              </div>  
            </div>
           </div>
          </div>
    </div>
   </ScrollArea>
  )
}
