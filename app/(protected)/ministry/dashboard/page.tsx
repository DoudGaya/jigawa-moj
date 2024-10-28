import React from 'react'
import { AdminDashboardCards } from './_components/AdminDashboardCards'
import { AdminDashboardCharts } from './_components/AdminDashboardCharts'
import { AdminDocs } from './_components/AdminDocs'

const page = () => {

  return (
    <div className=' dark:bg-black/90 space-y-3 flex p-3 flex-col w-full h-full'>
      <div className="w-full ">
        <AdminDashboardCards />
      </div>
      <div className=" w-full h-full px-3">
        <AdminDocs />
        {/* <AdminDashboardCharts /> */}
      </div>
    </div>
  )
}

export default page