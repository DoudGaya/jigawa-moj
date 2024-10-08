import React from 'react'
import { LoginForm } from '@/components/auth/LogInForm'

const page = () => {
  return (
    <div className=' w-full px-10 flex flex-col'>
    <div className=" mt-20 flex flex-col space-y-4  ">
     
    </div>
      <div className=" flex max-w-xl w-[400px] mx-auto ">
          <LoginForm />
      </div>
  </div>
  ) 
  
}

export default page