import React from 'react'
import Image from 'next/image'
import logoicon from '@/public/img/icons/jigawa-icon.png'

const loading = () => {
  return (
    <div className=' h-screen w-full flex justify-center items-center'>
        <div className="">
            <Image src={logoicon} className=' h-16 w-16 animate-pulse' alt='' />    
        </div>
    </div>
  )
}

export default loading