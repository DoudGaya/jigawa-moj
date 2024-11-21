import React from 'react'
// import { AdminCourt } from './_components/AdminCourt'
// import { AdminHome } from './_components/AdminHome'
import { AdminHome } from '@/app/loading-uis/_components/AdminHome'

const page = () => {
  return (
    <div className=' h-[90vh] w-full flex items-center justify-center'>
        {/* <AdminHome /> */}
        <svg className="animate-spin border-green-500 h-12 w-12" viewBox="0 0 24 24">
      </svg>
    </div>
  )
}

export default page