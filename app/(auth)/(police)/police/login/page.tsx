import React from 'react'
import Image from 'next/image'
import jigawaRound from '@/public/img/police.png'
import { RoleLoginForm } from '@/components/auth/RoleLoginForm'

const page = () => {
  return (
    <div className=' flex flex-col my-auto h-[100vh] max-w-6xl w-full mx-auto'>
        <div className=" my-auto mx-auto justify-center max-w-sm pt-8 bg-white w-full items-center flex flex-col">
            <Image src={jigawaRound} alt='' className=' h-36 w-36 rounded-full object-contain p-3'  />
            <small className=' font-poppins text-xl font-semibold'>Police Portal</small>
            <div className=" w-full">
              <RoleLoginForm />
            </div>
        </div>
    </div>
  )
}
export default page