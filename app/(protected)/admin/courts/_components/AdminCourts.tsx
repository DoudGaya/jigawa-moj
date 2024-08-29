import { Court } from '@prisma/client'
import React from 'react'
import { AdminCourtItem } from './AdminCourtItem'
import { CourtWithAllRecords } from '@/typings'



export const AdminCourts = ({courts}: {
    courts: CourtWithAllRecords[]
}) => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-4 grid-cols-1'>
        {
            courts.map((court: CourtWithAllRecords) => {
                return (
                   <AdminCourtItem court={court} key={court.id} />
                )
            })
        }
    </div>
  )
}
