import React from 'react'
import Image from 'next/image'
import authImage from '@/public/img/jigawa-state.png'
import nigeria from '@/public/img/nigeria.png'
import { PublicNavigations } from '@/components/PublicNavigations'
const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (
     <>
      <PublicNavigations />
      <div className=' max-w-7xl mx-auto bg-gray-50 justify-center  w-full'>
          <div className=" flex w-full  items-center rounded-md  justify-center md:px-10 py-10">
              {children}
          </div>
      </div>
    </>
  )
}

export default AuthLayout