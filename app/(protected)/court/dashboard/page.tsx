import React from 'react'
import { CourtAdminDashboardCards } from './_components/CourtAdminDashboardCards'
import { AdminDashboardCharts } from './_components/AdminDashboardCharts'

const page = () => {

  return (
    <div className='bg-white dark:bg-black/90 flex flex-col w-full h-full'>
      <div className=" py-3 ">
        <CourtAdminDashboardCards />
      </div>
      <div className="">
        {/* <AdminDashboardCharts /> */}
      </div>
    </div>
  )
}

export default page