import React from 'react'
import Image from 'next/image'
import spinner from '@/public/img/nigeria.png'

const loading = () => {
  return (
    <div className=' h-screen w-full flex justify-center items-center'>
        <div className="">
            <Image src={spinner} className=' h-16 w-16 animate-pulse' alt='' />    
        </div>
    </div>
  )
}

export default loading