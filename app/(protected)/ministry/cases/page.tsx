import React from 'react'
import { AdminPoliceActionArea } from './_components/PoliceActionArea'
import { getAllPoliceStations } from '@/actions/police'
import { PoliceStation, User } from '@prisma/client'
import { PoliceUserType } from '@/typings'


const AdminPolicePage = async () => {

  const stations = await getAllPoliceStations() as PoliceUserType[]
  return (
    <div className=' flex flex-col h-full'>
      <AdminPoliceActionArea stations={stations} />
    </div>
  )
}

export default AdminPolicePage