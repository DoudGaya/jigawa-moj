import { getCaseItemById } from '@/actions/cases'
import React from 'react'
import MinistryCaseEditForm from './_components/MinistryCaseEditForm'
import { getAllCourtRecordsCounts, getAllCourts } from '@/actions/courts'
import { CaseSchemaWithAllRecords } from '@/typings'

const page = async ({ params }: any) => {
  const { slug } = params



  const existingCase = await getCaseItemById(slug) 



  const courts = await getAllCourts() 


  // const existingCase = awa
  return (
    <div className=' w-full h-full '>
        <MinistryCaseEditForm 
        // @ts-ignore
        existingCase={existingCase} courts={courts} />
    </div>
  )
}

export default page