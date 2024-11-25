import React from 'react'
import { getAllPoliceStations } from '@/actions/police'
import { AdminStaffPage } from './_components/AdminStaffPage'
import { PoliceStation, User } from '@prisma/client'
import { StaffUser } from '@/typings'
import { getAllStaffs } from '@/actions/staffs'


const AdminStaffHome = async () => {

  // const stations = await getAllPoliceStations() as PoliceUserType[]
  // @ts-ignore
  const staffs = await getAllStaffs() as Staff[]
  return (
    <div className=' flex flex-col h-full'>
      <AdminStaffPage 
        // @ts-ignore
      staffs={staffs} />
    </div>
  )
}

export default AdminStaffHome