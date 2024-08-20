import React from 'react'
import Image from 'next/image'
import authImage from '@/public/img/jigawa-state.png'
import nigeria from '@/public/img/nigeria.png'
import { PublicNavigations } from '@/components/PublicNavigations'
const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (
     <>
      <PublicNavigations />
      <div className=' grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto justify-center h-[90vh] w-full'>
        <div className=" hidden md:flex flex-col my-[200px] space-y-2">
         <div className=" flex items-center  space-x-3">
          <Image src={authImage} className='h-[100px] w-[100px] object-contain border-4 border-primary rounded-full' alt='' />
          <Image src={nigeria} className='h-[100px] w-[100px] object-contain border-4 border-primary rounded-full' alt='' />
         </div>
         <h1 className=' text-2xl font-poppins'>Jigawa State Ministry of Justice</h1>
        </div>
          <div className=" flex w-full  items-center rounded-md  justify-center md:px-10 py-10">
              {children}
          </div>
      </div>
    </>
  )
}

export default AuthLayout