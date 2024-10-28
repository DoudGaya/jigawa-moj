import React from 'react'
import { getAllDraftedCases } from '@/actions/cases'
import { DraftedCases } from './_components/DraftedCases'
import { PoliceCaseSchemaType } from '@/typings'

const page = async () => {
  // @ts-ignore
  const draftedCases = await getAllDraftedCases() as PoliceCaseSchemaType[]
  return (
    <div className=' flex flex-col space-y-5 h-full p-4'>
        <div className=" max-w-7xl bg-white shadow-sm rounded-lg w-full py-8 flex items-center justify-center">
          <p className=' font-poppins text-lg font-semibold'>Draft Cases</p>
        </div>
        <div className="max-w-7xl h-full w-full py-4">
          <div className=" grid grid-cols-4 gap-4">
          {
            draftedCases.map((item: PoliceCaseSchemaType) => {
              return (
                // @ts-ignore
                <DraftedCases key={item.id} item={item} /> 
              )
            })
          }
          </div>
        </div>
    </div>
  )
}

export default page