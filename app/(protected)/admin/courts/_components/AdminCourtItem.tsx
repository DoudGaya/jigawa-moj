"use client"
import { Court } from '@prisma/client'
import React, {useState} from 'react'
import { deleteCourtItem } from '@/actions/courts'
import { useRouter } from 'next/navigation'
import { CourtWithAllRecords } from '@/typings'
import { useTransition } from 'react'
import { toast } from "sonner"
import Link from 'next/link'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { CourtDetails } from './CourtDetails'
export const AdminCourtItem = (
    { court }: 
    { court: CourtWithAllRecords }
) => {


    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState < string | undefined>('')


    const deleteCourt = async (id: string) => {
        try {
           const data = await deleteCourtItem(id)
            return data
        } catch (error) {
            console.log(error)  
        }
    }
    
    const handleCourtDeletion = () => {
        setError('')
        setSuccess('')
        startTransition(() => {
            deleteCourt(court.id)
            .then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
        
        router.refresh()
    }
    
    return (
    <div className=' flex flex-col rounded-xl bg-white'>
        <div className=" bg-white pb-3 flex items-center justify-center flex-col border-b-primary px-3 rounded-t-xl pt-6">
            <div className=" rounded-full p-4 border-jyellow border-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
            </div>
            <div className=" flex flex-col items-center justify-center border-b-2 w-full py-2 border-primary">
                <h2 className=' font-poppins font-semibold'>{court.name}</h2>
                    <div className=" text-sm font-secondary"> {court.level} </div>
            </div>
            <div className=" py-4 flex w-full justify-between">
                <div className=" flex flex-col items-start text-start justify-start">
                    <small className=' text-xs uppercase font-semibold  text-gray-500'>Jurisdiction</small>
                    <p className='font-semibold font-poppins text-sm text-gray-800'> { court.jurisdiction } </p>
                </div>
                <div className=" flex flex-col items-end text-start justify-start">
                    <small className=' text-xs uppercase font-semibold text-gray-500'>L.G.A</small>
                    <p className=' font-semibold font-poppins text-sm text-gray-800'> { court.localGovernment } </p>
                </div>
            </div>  
            <div className=" py-4 flex w-full justify-between">
                <div className=" flex flex-col items-start text-start justify-start">
                    <small className=' text-xs uppercase font-semibold text-gray-500'>Admin</small>
                    <p className=' font-semibold font-poppins text-sm text-gray-800'> { court.user.lastName } </p>
                </div>
                <div className=" flex flex-col items-end text-start justify-start">
                    <small className=' text-xs uppercase font-semibold text-gray-500'>Function</small>
                    <p className=' font-semibold font-poppins text-sm text-gray-800'> { court.function } </p>
                </div>
            </div>
            <div className=" py-4 flex w-full justify-between">
                <div className=" flex flex-col items-start text-start justify-start">
                    <small className=' text-xs uppercase font-semibold text-gray-500'>Capacity</small>
                    <p className=' font-semibold font-poppins text-sm text-gray-800'> { court.capacity } </p>
                </div>
                <div className=" flex flex-col items-end text-start justify-start">
                    <small className=' text-xs uppercase font-semibold text-gray-500'>City</small>
                    <p className=' font-semibold font-poppins text-sm text-gray-800'> { court.city } </p>
                </div>
            </div>
        </div>
        <div className="flex  w-full rounded-b-xl font-poppins text-white">
            <Drawer>
                <DrawerTrigger className=' flex space-x-3 justify-center text-center py-3 px-4 bg-primary rounded-b-xl w-full items-center'>
                <p>Details</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                </DrawerTrigger>
                <DrawerContent className=' h-[90vh]'>
                    <CourtDetails court={court} />
                    <DrawerFooter className=' flex  flex-row  justify-end items-center space-x-3 w-full'>
                    <Link className=' text-black hover:cursor-pointer hover:underline px-3 py-2 rounded-lg items-center flex space-x-3 font-poppins' href={`/admin/courts/${court.id}`}>
                        <p> Edit Court Details</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger className=' bg-red-500 flex flex-row items-center space-x-3 hover:bg-red-300 py-2 px-3 text-white rounded-md'>
                            <p>Delete</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete {`${court.name}`} ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=' bg-transparent px-0'>
                                <Button className=' bg-red-500 text-white hover:bg-red-400' onClick={handleCourtDeletion}>Delete Court</Button>
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    <DrawerClose>
                        <Button variant="outline" className=' items-center space-x-3 flex '>
                            <p>Close</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                            </svg>
                        </Button>
                    </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
                </Drawer>
        </div>
    </div>
  )
}
