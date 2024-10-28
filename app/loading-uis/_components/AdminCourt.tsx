import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const AdminCourt = () => {
  return (
    <div className=' w-full space-y-6 px-10 py-8 h-full flex flex-col max-w-7xl mx-auto'>
    <Skeleton className=" bg-gray-200 dark:bg-gray-800 py-4 px-3 items-center flex justify-between w-full">
        <div className=" flex space-x-4  items-center">
            <Skeleton className=' bg-white dark:bg-gray-700 h-8 w-8' />
            <Skeleton className=' h-4 w-[120px] rounded-full bg-white dark:bg-gray-700' />
        </div>
        <Skeleton className=' h-6 py-2 w-[180px] rounded-full bg-white dark:bg-gray-700' />
    </Skeleton>

    <div className=" grid grid-cols-4 w-full gap-3">
        <Skeleton className=' bg-white dark:bg-gray-700 py-6 flex px-4 flex-col items-center space-y-2 justify-center w-full'>
            <Skeleton className=' rounded-full h-14 w-14 bg-gray-200 dark:bg-gray-800 '></Skeleton>
            <Skeleton className=' w-[120px] bg-gray-200 dark:bg-gray-800 h-4 rounded-full'></Skeleton>
            <Skeleton className=' py-3 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>

            <Skeleton className=' py-3 my-10 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>
        </Skeleton>

        <Skeleton className=' bg-white dark:bg-gray-700 py-6 flex px-4 flex-col items-center space-y-2 justify-center w-full'>
            <Skeleton className=' rounded-full h-14 w-14 bg-gray-200 dark:bg-gray-800'></Skeleton>
            <Skeleton className=' w-[120px] bg-gray-200 dark:bg-gray-800 h-4 rounded-full'></Skeleton>

            <Skeleton className=' py-3 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>

            <Skeleton className=' py-3 my-10 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>
        </Skeleton>

        <Skeleton className=' bg-white dark:bg-gray-700 py-6 flex px-4 flex-col items-center space-y-2 justify-center w-full'>
            <Skeleton className=' rounded-full h-14 w-14 bg-gray-200 dark:bg-gray-800'></Skeleton>
            <Skeleton className=' w-[120px] bg-gray-200 dark:bg-gray-800 h-4 rounded-full'></Skeleton>

            <Skeleton className=' py-3 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>

            <Skeleton className=' py-3 my-10 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>
        </Skeleton>

        <Skeleton className=' bg-white dark:bg-gray-700 py-6 flex px-4 flex-col items-center space-y-2 justify-center w-full'>
            <Skeleton className=' rounded-full h-14 w-14 bg-gray-200 dark:bg-gray-800'></Skeleton>
            <Skeleton className=' w-[120px] bg-gray-200 dark:bg-gray-800 h-4 rounded-full'></Skeleton>

            <Skeleton className=' py-3 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>

            <Skeleton className=' py-3 my-10 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
            </Skeleton>
        </Skeleton>


    </div>
</div>
  )
}
