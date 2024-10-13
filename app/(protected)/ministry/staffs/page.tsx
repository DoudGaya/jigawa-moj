import React from 'react'
import { getAllPoliceStations } from '@/actions/police'
import { AdminStaffPage } from './_components/AdminStaffPage'
import { PoliceStation, User } from '@prisma/client'
import { PoliceUserType } from '@/typings'


const AdminStaffHome = async () => {

  const stations = await getAllPoliceStations() as PoliceUserType[]
  return (
    <div className=' flex flex-col h-full'>
      <AdminStaffPage stations={stations} />
    </div>
  )
}

export default AdminStaffHome