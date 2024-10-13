import { getCourtById } from '@/actions/courts'
import React from 'react'

const page = async (params: any) => {
    const id = params.params.courtId as string

    // @ts-ignore
    const court = await getCourtById(id) as CourtWithAllRecords


  return (
    <div className=' flex flex-col'>

    </div>
  )
}
export default page