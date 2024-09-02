import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const AdminHome = () => {
  return (
    <div className=" flex flex-col space-y-3">
        <div className=' grid grid-cols-4 max-w-6xl w-full mx-auto my-6 gap-4'>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
        <div className="">
            <Skeleton className=' h-28 flex flex-col space-y-3'></Skeleton>
        </div>
    </div>

    </div>
  )
}
