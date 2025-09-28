import React from 'react'
import { PoliceDraftsList } from '../_components/PoliceDraftsList'

const page = async () => {
  return (
    <div className='flex flex-col space-y-5 h-full p-4'>
        <div className="max-w-7xl bg-white shadow-sm rounded-lg w-full py-8 flex items-center justify-center">
          <p className='font-poppins text-lg font-semibold'>Draft Cases</p>
        </div>
        <div className="max-w-7xl h-full w-full py-4">
          <PoliceDraftsList />
        </div>
    </div>
  )
}

export default page