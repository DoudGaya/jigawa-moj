import React, {useState} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

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
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CaseSchemaWithAllRecords } from '@/typings'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
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
  import { AiOutlineFileProtect } from "react-icons/ai"
import { CaseStatus } from '@prisma/client'
import { deleteCase } from '@/actions/cases'


  // @ts-ignore
export const AdminCaseItem = ( {caseitem}: {
    caseitem: CaseSchemaWithAllRecords
} ) => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState < string | undefined>('')
    const router = useRouter()

const deleteCaseItem = async (id: string) => {
    try {
       const data = await deleteCase(id)
        return data
    } catch (error) {
        console.log(error)  
    }
}

const handleCaseDelete = () => {
  setError('')
  setSuccess('')
  startTransition(() => {
    // @ts-ignore
    deleteCaseItem(caseitem.id)
      .then((data) => {
        // @ts-ignore
          setError(data?.error)
          setSuccess(data?.success)
      })
  })
  
  router.refresh()
}

  return (
    <div className=" w-full flex flex-col bg-white rounded-lg">
      <div className="flex flex-row w-full items-center px-4 bg-green-100 rounded-t-lg justify-between">
        < AiOutlineFileProtect className=' size-8 stroke-3' />
        <div className=" flex flex-col items-end border-b-2 py-4 space-y-0.5 border-green-200 bg-black  px-2 ">
            <small className=' text-gray-200 text-xs font-semibold'>CASE NUMBER</small>
            <span className=' rounded-sm bg-gray-200/20 text-green-300 px-2 text-md font-mono'>{caseitem.caseNumber}</span>
          </div>
      </div>

     <div className=" flex h-full justify-between space-y-10 flex-col px-4 py-2">
     <div className=" flex flex-col space-y-3 pt-6 ">
      <div className=" flex flex-col">
            <small className='text-xs  font-poppins text-gray-700'>Title</small>
          <small className=' text-sm line-clamp-2'>{caseitem.title || "N/A"}</small>
        </div>

        <div className=" flex flex-col py-2">
          <small className=' text-xs  font-poppins text-gray-700'>Description</small>
          <small className=' text-sm line-clamp-2'>{caseitem.caseDescription || "N/A"}</small>
        </div>
     </div>

      <div className=" flex flex-row mt-4 items-center justify-between">
        <div className="flex space-x-2 items-center">
          <span className=' text-xs  font-poppins text-gray-700'>Filed on: </span>
          <span className=' text-xs font-poppins'>{caseitem.createdAt.toLocaleDateString() || "N/A"}</span>
        </div>
          <div className=" flex flex-col items-end">
          {/* <small className=' font-poppins text-gray-700 '>Status</small> */}
              <span className={` ${caseitem.caseStatus === "Submitted" ? " bg-blue-500/30 px-3 rounded-md text-blue-800" : 
              caseitem.caseStatus === "Pending" ? ' bg-yellow-400 text-yellow-700' : 
              caseitem.caseStatus === "Active" ? ' bg-blue-500/30 px-3 rounded-md text-blue-800' : 
              caseitem.caseStatus === "Closed" ? ' bg-red-500/30 px-3 rounded-md text-red-800' :
              caseitem.caseStatus === "Reviewed" ? ' bg-green-500/30 px-3 rounded-md text-green-800' : ' bg-gray-500 text-gray-800' 
              } text-gray-500 text-xs font-semibold lowercase py-0.5 `}>
                { caseitem.caseStatus || "N/A"}
              </span> 
          </div>
      </div>


    </div>

  <div className=" w-full rounded-b-lg flex justify-between border-t-2 h-full border-green-500 py-4 px-2">
        <AlertDialog>
                <AlertDialogTrigger className='flex flex-row px-2 items-center space-x-1 hover:bg-red-300 rounded-md'>
                    <p className=' text-red-500 font-poppins'>Delete</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-red-500 flex-none  size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete case No: {`${caseitem.caseNumber}`} ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className=' bg-transparent px-0'>
                        <Button className=' bg-red-500 text-white hover:bg-red-400' onClick={handleCaseDelete}>Delete Case</Button>
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
        </AlertDialog>

        <div className=" flex flex-row space-x-8 items-center">
       <Link href={`/ministry/cases/${caseitem.id}`} className=' items-center rounded-md px-2 flex space-x-1 hover:bg-green-400'>
                <p className=' font-poppins'>Edit </p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
       </Link>


            <Drawer>
              <DrawerTrigger className='rounded-md px-2 hover:bg-green-400 items-center flex space-x-1'>
                <p className=' font-poppins'>Open</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
              </DrawerTrigger>
              <DrawerContent className=' h-[90%] w-full max-w-6xl mx-auto'>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
        </div>
    </div>   
    </div>
  )
}
