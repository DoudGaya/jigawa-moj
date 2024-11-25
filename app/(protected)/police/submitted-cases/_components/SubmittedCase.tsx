"use client"
import { Separator } from '@/components/ui/separator'
import { CaseSchemaWithAllRecords, PoliceCaseSchemaType } from '@/typings'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileIcon } from 'lucide-react'
import { MapIcon } from 'lucide-react'
import { MapPinIcon } from 'lucide-react'
import { GavelIcon } from 'lucide-react'
import { UserIcon } from 'lucide-react'
import { useState } from 'react'
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
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import Image from 'next/image'

export const SubmittedCase = ( {caseData}: {caseData: CaseSchemaWithAllRecords} ) => {
  const [open, setOpen] = useState(false)
  return (
    <div className=' flex rounded-lg bg-white border border-green-500 shadow-sm flex-col'>
        <div className=" flex h-full flex-col px-4 py-4">
          <div className=" my-2 py-2 flex items-center justify-between spaxe-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <span className=' text-sm bg-green-500/30 px-1.5 cursor-pointer font-mono rounded-md'> { caseData.caseNumber } </span>
        </div>
        <Separator className=' mb-4' />
        <div className=" flex flex-col space-y-6">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Title</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.title }</p>
            </div>
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Description</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.caseDescription }</p>
            </div>
        </div>

        <div className=" flex w-full py-4">
        <div className=" flex w-full justify-between">
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Name of IPO</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.nameOfIPO }</p>
            </div>
            <div className=" flex flex-col"> 
              <span className=' font-poppins uppercase text-xs font-semibold text-gray-400'>Place of Offence</span>
              <p className=' text-xs font-poppins text-gray-800 '>{ caseData.placeOfOffense }</p>
            </div>
        </div>
        </div>
       </div>

       <div className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Case Details</h1> */}
      <Button onClick={() => setOpen(true)} className=' w-full text-white'>View Case Details</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className=' py-0'>
            <DrawerTitle>Case: {caseData.title}</DrawerTitle>
            <DrawerDescription>Case Number: {caseData.caseNumber}</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100vh-10rem)] px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <dt className="font-medium">Description</dt>
                      <dd>{caseData.caseDescription}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Type</dt>
                      <dd>{caseData.caseType}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Status</dt>
                      <dd>{caseData.caseStatus}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4" />
                      <div>
                        <dt className="font-medium">Location</dt>
                        <dd>{caseData.placeOfOffense}</dd>
                      </div>
                    </div>
                    <div>
                      <dt className="font-medium">IPO Name</dt>
                      <dd>{caseData.nameOfIPO}</dd>
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
                    <div>
                      <dt className="font-medium">Address</dt>
                      <dd>{caseData.defendantAddress}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Age</dt>
                      <dd>{caseData.defendantAge}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Sex</dt>
                      <dd>{caseData.defendantSex}</dd>
                    </div>
                    <div>
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
                    <div>
                      <dt className="font-medium">Court Address</dt>
                      <dd>{caseData?.court?.courtAddress || "N/A"}</dd>
                    </div>
                    <div>
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
                    { caseData.hearings.length > 0 ? caseData.hearings.map((hearing, index) => (
                      <li key={index} className="text-sm">
                        <span className="font-medium">{hearing.caseId}</span>
                        <br />
                        {/* {hearing.date?.toDateString()} at {hearing.time?.toLocaleDateString()} */}
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
                    { caseData.hearings.length > 0 ?  caseData.files.map((file, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
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
                    {caseData.pictures.map((picture, index) => (
                     <div key={index}  className=" flex flex-col w-full rounded-lg space-y-2">
                       <div className="aspect-square bg-muted rounded-md flex overflow-hidden items-center justify-center">
                        {/*  */}
                        <Image width={700} height={700}  
                        // @ts-ignore
                        src={picture} alt='' className=' w-full h-full rounded-md object-cover ' />
                      </div>
                      <Link 
                      // @ts-ignore
                      href={picture} download type='download'>Download Picture</Link>
                     </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
          <DrawerFooter className=' flex space-x-4 w-full'>
           <div className=" flex space-x-3 w-full">
            <Button>Update Records</Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
           </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
    </div>
  )
}
