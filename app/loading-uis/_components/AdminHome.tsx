import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'


const loadingU = [1,2,3,4,5,6]

const docsUI = [1,2,3,4]

export const AdminHome = () => {
  return (
    <div className=' w-full space-y-6 px-10 py-8 h-full flex flex-col max-w-7xl mx-auto'>

        <div className=" grid grid-cols-6 gap-4">
            {
                loadingU.map((_, i) => {
                    return (
                        <Skeleton key={_} className=" bg-gray-200 space-y-4 py-2 dark:bg-gray-800 px-3 flex flex-col justify-between w-full">
                            <div className=" flex flex-col space-y-2">
                                <Skeleton className=' bg-white dark:bg-gray-700 h-14 w-16' />
                                <Skeleton className=' h-4 w-16 rounded-md bg-white dark:bg-gray-700' />
                            </div>
                            <Skeleton className=' h-6 w-full rounded-full bg-white dark:bg-gray-700' />
                        </Skeleton>
                    )
                } )
            }
        </div>
    <div className=" grid grid-cols-2 w-full h-full gap-3">
        {
            docsUI.map((_, i) => {
                return (
                    <Skeleton key={_} className=' bg-white dark:bg-gray-700 py-6 flex px-4 flex-col space-y-2 justify-center w-full'>
                    <Skeleton className=' rounded-sm h-14 w-14 bg-gray-200 dark:bg-gray-800 '>

                    </Skeleton>
                    <Skeleton className=' py-3 w-full flex flex-col bg-white dark:bg-gray-700 space-y-4'>
                        <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                        <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                        <Skeleton className=' h-[20px] dark:bg-gray-800'></Skeleton>
                    </Skeleton>
                </Skeleton>
                )
            })
        }
    </div>
</div>
  )
}
