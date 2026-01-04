import React from 'react'
import Image from 'next/image'
import jigawaRound from '@/public/img/police.png'
import { RoleLoginForm } from '@/components/auth/RoleLoginForm'
import { ChevronRight, Gavel, Shield, Users, FileText } from 'lucide-react'

const page = () => {
  return (
    <div className=' flex flex-col my-auto h-[100vh] max-w-6xl w-full mx-auto'>
        <div className=" my-auto mx-auto space-y-4 justify-center max-w-lg drop-shadow-xl rounded-lg  py-6 px-10 bg-white w-full items-center flex flex-col">
            {/* <Image src={jigawaRound} alt='' className=' h-36 w-36 rounded-full object-contain p-3'  /> */}
            <div className=' rounded-full object-contain p-5 border border-primary flex justify-center items-center'>
              <Gavel size={48} />
            </div>
                <div className=" flex flex-col items-center text-center">
                    <small className=' font-poppins text-2xl font-semibold'>Court Portal</small>
                    <h1> jigawa State Judiciary </h1>
                </div>
            <div className=" w-full">
              <RoleLoginForm />
            </div>
        </div>
    </div>
  )
}
export default page