import React from 'react'
import { CaseActionArea } from './_components/CaseActionArea'
import { getAllPoliceStations } from '@/actions/police'
import { CaseSchemaWithAllRecords, PoliceUserType, CourtWithAllRecords } from '@/typings'
import { getAllSubmittedCases } from '@/actions/cases'
import { getAllCourts } from '@/actions/courts'


const AdminCasePage = async () => {

  // @ts-ignore
  const cases = await getAllSubmittedCases() as CaseSchemaWithAllRecords[]

  const courts = await getAllCourts() as CourtWithAllRecords[]
  return (
    <div className='flex flex-col h-full'>
      <CaseActionArea cases={cases} courts={courts} />
    </div>
    )
}

export default AdminCasePage