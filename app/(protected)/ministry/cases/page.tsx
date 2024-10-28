import React from 'react'
import { CaseActionArea } from './_components/CaseActionArea'
import { getAllPoliceStations } from '@/actions/police'
import { CaseSchemaWithAllRecords, PoliceUserType } from '@/typings'
import { getAllSubmittedCases } from '@/actions/cases'
import { getAllCourts } from '@/actions/courts'


const AdminCasePage = async () => {

  // @ts-ignore
  const cases = await getAllSubmittedCases() as CaseSchemaWithAllRecords[]

  const court = await getAllCourts()
  return (
    <div className='flex flex-col h-full'>
      <CaseActionArea cases={cases} />
    </div>
    )
}

export default AdminCasePage