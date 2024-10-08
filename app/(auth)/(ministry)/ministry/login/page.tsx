import React from 'react'
import Image from 'next/image'
import jigawaRound from '@/public/img/jigawa-state-round.jpg'
import { RoleLoginForm } from '@/components/auth/RoleLoginForm'

const page = () => {
  return (
    <div className=' flex flex-col my-auto h-[100vh] max-w-6xl w-full mx-auto'>
        <div className=" my-auto mx-auto justify-center bg-white py-6 px-4 rounded-lg w-full max-w-sm items-center flex flex-col">
            <Image src={jigawaRound} alt='' className=' h-36 w-36'  />
            <div className=" w-full ">
              <RoleLoginForm />
              {/* <p className=' font-poppins text-2xl'>Jigawa State Ministry of Justice</p> */}
            </div>
        </div>
    </div>
  )
}
export default page