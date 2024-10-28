import React from 'react'
import { getAllSubmittedCases } from '@/actions/cases'
import { SubmittedCase } from './_components/SubmittedCase'
import { PoliceCaseSchemaType } from '@/typings'

const page = async () => {
  // @ts-ignore
  const submittedCases = await getAllSubmittedCases() as PoliceCaseSchemaType[]
  return (
    <div className=' flex flex-col space-y-5 h-full p-4'>
        <div className=" max-w-7xl bg-white shadow-sm rounded-lg w-full py-8 flex items-center justify-center">
          <p className='font-poppins text-lg font-semibold'>Submitted Cases</p>
        </div>
        <div className="max-w-7xl h-full w-full py-4">
          <div className=" grid md:grid-cols-4 grid-cols-1 px-6 md:px-0 gap-y-6 sm:gap-y-4 sm:grid-cols-2 gap-4">
          {
            submittedCases.map((item: PoliceCaseSchemaType) => {
              return (
                // @ts-ignore
                <SubmittedCase key={item.id} item={item} /> 
              )
            })
          }
          </div>
        </div>
    </div>
  )
}

export default page