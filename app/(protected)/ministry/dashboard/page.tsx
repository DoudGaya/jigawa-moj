import React from 'react'
import { AdminDashboardCards } from './_components/AdminDashboardCards'
import { AdminDashboardCharts } from './_components/AdminDashboardCharts'

const page = () => {

  return (
    <div className=' dark:bg-black/90 flex flex-col w-full h-full'>
      <div className=" py-3 w-full ">
        <AdminDashboardCards />
      </div>
      <div className="">
        {/* <AdminDashboardCharts /> */}
      </div>
    </div>
  )
}

export default page