import { StaffSignUpForm } from '@/components/auth/StaffSignUpForm'
import React from 'react'

const page = () => {
  return (
    <div className=' w-full px-10 flex flex-col'>
      <div className=" mt-20 bg-green-50 p-2 items-center justify-between border border-primary rounded-lg py-2 flex ">
        <h2 className='font-poppins text-sm text-green-950'>This sign Up form is for Judges or Ministry of Justice Staffs</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-8 md:size-6 flex-none stroke-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
      </div>
        <StaffSignUpForm />
    </div>
  )
}

export default page