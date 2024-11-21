"use client"
import React, {useState} from 'react'
import { Separator } from '@/components/ui/separator'
import { PoliceCaseSchemaType } from '@/typings'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Delete, FileIcon } from 'lucide-react'
import { MapIcon } from 'lucide-react'
import { MapPinIcon } from 'lucide-react'
import { GavelIcon } from 'lucide-react'
import { UserIcon } from 'lucide-react'
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
import Image from 'next/image'
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
export const AdminCaseItem = ( {caseData}: {
    caseData: CaseSchemaWithAllRecords
} ) => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [open, setOpen] = useState(false)
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
    deleteCaseItem(caseData.id)
      .then((data) => {
        // @ts-ignore
          setError(data?.error)
          setSuccess(data?.success)
      })
  })


  
  router.refresh()
}

console.log(caseData)
  return (
    <div className=' flex rounded-lg bg-white border border-green-500 shadow-sm flex-col'>
        <div className=" flex h-full flex-col px-4 py-4">
          <div className=" my-2 py-2 flex items-center justify-between spaxe-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
              <span className=' text-sm bg-green-500/30 px-1.5 cursor-pointer font-mono rounded-md'>{ caseData.caseNumber } </span>
        </div>
        <Separator className=' mb-4' />
        <div className=" flex flex-col space-y-6">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs text-gray-600'>Title</span>
              <p className=' text-sm font-poppins text-gray-800 '>{ caseData.title }</p>
            </div>
            {/* <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Description</span>
              <p className=' text-xs font-poppins text-gray-800 line-clamp-3 '>{ caseData.caseDescription }</p>
            </div> */}
        </div>

        <div className=" flex w-full flex-col space-y-6 py-4">
       
        <div className=" flex w-full justify-between">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Date of Filing</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.dateOfFiling?.toDateString() || "N/A" }</p>
            </div>
            <div className=" flex flex-col items-end justify-end"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Year of Filing</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData?.yearOfFiling || "N/A" }</p>
            </div>
        </div>

        <div className=" flex w-full justify-between">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Case Type</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.caseType || "N/A" }</p>
          </div>
            <div className=" flex flex-col justify-end"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Place of Offence</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.placeOfOffense }</p>
            </div>
        </div>

        <div className=" flex w-full justify-between">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Name of IPO</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.nameOfIPO }</p>
            </div>
            <div className=" flex flex-col justify-end"> 
              <span className=' font-poppins uppercase text-xs  text-gray-400'>Place of Offence</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.placeOfOffense }</p>
            </div>
        </div>
        

        
        </div>
       </div>

       <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Case Details</h1> */}
      <div className=" grid grid-cols-2 gap-2 justify-center ">
        <Button onClick={() => setOpen(true)} className=' text-white'>View Case Details</Button>
        {/* <div className=""> */}
          <Link className=' px-6 py-1.5 w-full border-2 border-green-600 text-center rounded-md bg-white text-green-500 text-sm' href={`/court/cases/${caseData.id}`}> Update Case</Link>
        {/* </div> */}
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className=''>
          <DrawerHeader className=' py-0'>
            <DrawerTitle className=' text-3xl'>Case: {caseData.title}</DrawerTitle>
            <DrawerDescription>Case Number: {caseData.caseNumber}</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100vh-10em)] px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-2 text-sm">
                    <div className=' flex flex-col space-y-3'>
                      <dt className="font-medium uppercase font-serif ">Description</dt>
                      <dd className=' text-justify'>{caseData.caseDescription}</dd>
                    </div>
                    <Separator className=' my-2' />
                  <div className=" grid grid-cols-4 gap-4">
                  <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium"> Case Type</dt>
                      <dd>{caseData.caseType} Case</dd>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium"> Case Status</dt>
                      <dd>{caseData.caseStatus}</dd>
                    </div>
                    <div className=" items-center bg-gray-100 p-2 rounded-md gap-2">
                        <dt className="font-medium"> Year of Filing</dt>
                        <dd>{caseData.yearOfFiling || "N/A"}</dd>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt > Date of Filing</dt>
                      <dd>{caseData.dateOfFiling?.toLocaleDateString() || "Not Set"}</dd>
                    </div>

                    <div className=' col-span-2 items-center bg-gray-100 p-2 rounded-md gap-2 '>
                      <dt className="font-medium">Place of Commission of Offence</dt>
                      <dd>{caseData.placeOfOffense}</dd>
                    </div>

                    <div className=' col-span-2 items-center bg-gray-100 p-2 rounded-md gap-2'>
                      <dt className="font-medium">IPO Name</dt>
                      <dd>{caseData.nameOfIPO}</dd>
                    </div>
                  </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Defendant Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <div>
                        <dt className="font-medium">Name</dt>
                        <dd>{caseData.defendantName}</dd>
                      </div>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium">Address</dt>
                      <dd>{caseData.defendantAddress}</dd>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium">Age</dt>
                      <dd>{caseData.defendantAge}</dd>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium">Sex</dt>
                      <dd>{caseData.defendantSex}</dd>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium">Occupation</dt>
                      <dd>{caseData.defendantOccupation}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Court Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <GavelIcon className="w-4 h-4" />
                      <div>
                        <dt className="font-medium">Court Name</dt>
                        <dd>{caseData?.court?.courtName || "N/A"}</dd>
                      </div>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium">Court Address</dt>
                      <dd>{caseData?.court?.courtAddress || "N/A"}</dd>
                    </div>
                    <div className=' bg-gray-100 p-2  rounded-md'>
                      <dt className="font-medium">Tribunal</dt>
                      <dd>{caseData.tribunal}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hearings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    { caseData.hearings.length > 0 ? caseData.hearings.map((hearing: any, index: any) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{hearing.caseId}</span>
                        <br />
                        {new Date(hearing.date).toDateString()} at {new Date(hearing.time).toLocaleTimeString()}
                      </li>
                    )) : "There is no available hearing"}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>File</CardTitle>
                  { caseData.FIR && <Link href={String(caseData.FIR)} download>Download FIR</Link> }
                  
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    { caseData.hearings.length > 0 ?  caseData.files.map((file) => (
                      <li key={file.id} className="flex items-center gap-2 text-sm">
                        <FileIcon className="w-4 h-4" />
                        <span>{file.fileTitle}</span>
                        <span className="text-muted-foreground">({file.fileDescription})</span>
                        <Link href={file.fileUrl} download>Download File</Link>
                      </li>
                    )) : ""}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evidence Pictures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {caseData.pictures.map((picture) => (
                      // @ts-ignore
                     <div key={picture}  className=" flex flex-col w-full rounded-lg space-y-2">
                       <div className="aspect-square bg-muted rounded-md flex overflow-hidden items-center justify-center">
                      
                        <Image width={700} height={700} 
                        //  @ts-ignore
                        src={picture} alt='' className=' w-full h-full rounded-md object-cover ' />
                      </div>
                      <Link 
                      // @ts-ignore
                      href={picture} download className=' flex items-center' type='download'>
                        <small className=' text-sm'>Download</small>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                          </svg>
                      </Link>
                     </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
          <DrawerFooter className=' flex space-x-4 w-full'>
           <div className=" flex space-x-3 w-full">
            {/* <Link className=' py-2 px-6 bg-green-600 rounded-lg text-white' href={`/court/cases/${caseData.id}`}>Update Records </Link> */}
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
              {/* Delete function here  */}
                    <AlertDialog>
                <AlertDialogTrigger className='flex flex-row px-4  items-center justify-center hover:text-red-900 text-white space-x-2 hover:bg-red-300 bg-red-600  rounded-md'>
                    <p className=' font-poppins'>Delete Case</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-white flex-none  size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete case No: {`${caseData.caseNumber}`} ?</AlertDialogTitle>
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

              {/* End of delete function */}
           </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
    </div>
  )
}
