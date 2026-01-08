import React, {useState} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link'
import { PoliceUserType } from '@/typings'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deletePolice } from '@/actions/police'
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


export const AdminPoliceStationItem = ( {station}: {
    station: PoliceUserType
} ) => {
    // const [policeStations, setPoliceStations] = useState<PoliceUserType[]>(stations || [])
    // const [currentPage, setCurrentPage] = useState(1)
    // const [searchTerm, setSearchTerm] = useState('')
    // const [terms, setTerms] = useState<boolean> (false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState < string | undefined>('')
    const router = useRouter()

const deletePoliceStation = async (id: string) => {
    try {
       const data = await deletePolice(id)
        return data
    } catch (error) {
        console.log(error)  
    }
}

const handlePoliceDelete = () => {
  setError('')
  setSuccess('')
  startTransition(() => {
    deletePoliceStation(station.id)
      .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
      })
  })
  
  router.refresh()
}

  return (
        <TableRow>
                <TableCell className=' text-xs'>{station.police.stationName || 'N/A' }</TableCell>
                <TableCell className=' text-xs'>{station.police.stationAddress || 'N/A' }</TableCell>
                <TableCell className=' text-xs'>{station.police.stationLocalGovernment || 'N/A' }</TableCell>
                <TableCell className=' text-xs'>{station.police.stationcontactNumber || 'N/A' }</TableCell>
                <TableCell className=' text-xs'>{station.firstName || 'N/A' }</TableCell>
                <TableCell className=' text-xs'>{station.phone || 'N/A' }</TableCell>
                <TableCell className=' text-xs'>{station.police.contactEmail || 'N/A' }</TableCell>
                <TableCell className=' text-xs flex flex-row space-x-6'>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem className=' hover:bg-green-400/30'>
                          <Link href={`/ministry/police/${station.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className=' hover:bg-green-400/30' >
                          <Link href={`/ministry/police/${station.id}`}>Details</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog>
                        <AlertDialogTrigger className='flex flex-row p-1 items-center space-x-3 hover:bg-red-300 text-white rounded-md'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-red-500 flex-none  size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete {`${station.police.stationName}`} ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=' bg-red-500 text-white hover:bg-red-400' onClick={handlePoliceDelete}>
                                Delete Police Station
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </TableCell>
              </TableRow>
  )
}
