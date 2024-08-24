import React from 'react'
import { AdminDashboardCards } from './_components/AdminDashboardCards'
import { AdminDashboardCharts } from './_components/AdminDashboardCharts'

const page = () => {

  return (
    <div className='bg-white dark:bg-black/90 flex flex-col w-full h-full'>
      {/* <div className=" w-full flex items-center justify-center py-3">
        <h2 className=' font-poppins font-semibold text-gray-800'>Jigawa State Ministry of Justice Control </h2>
      </div> */}
      <div className=" py-3 ">
        <AdminDashboardCards />
      </div>
      <div className="">
        {/* <AdminDashboardCharts /> */}
      </div>
    </div>
  )
}

export default page