'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { states, localGovernment } from '@/lib/jigawa'
import { policeUSerSchema, FormData } from '@/lib/zod-schemas/police-schema'
import { MinistryCaseForm } from './MinistryCaseForm'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { useToast } from "@/hooks/use-toast"

import { createPoliceUser, deletePolice } from '@/actions/police'
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'
import { useRouter } from 'next/navigation'
import { CaseSchemaWithAllRecords, PoliceUserType } from '@/typings'
import { AdminCaseItem } from './AdminCaseItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MinistryCaseSchema } from '@/lib/zod-schemas/case-schema'



export function CaseActionArea( { cases }: {
    cases: CaseSchemaWithAllRecords[]
} ) {
  const [caseItem, setcaseItem] = useState<CaseSchemaWithAllRecords[]>(cases || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')

  const router = useRouter()

  const { toast } = useToast()
  const itemsPerPage = 30

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(MinistryCaseSchema),
  })

  const onSubmit = (data: FormData) => {

    setError('')
    setSuccess('')
    startTransition(() => {      
      createPoliceUser(data)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
        // @ts-ignore
        setcaseItem([...caseItem, data.data])
    })
})

    toast({
      title: "Police Station Registered",
      description: `${data.police.stationName} has been successfully registered.`,
    })

    reset()
    router.refresh()
  }

  const filteredCaseItem = caseItem.filter(caseObj =>
    caseObj?.caseNumber.includes(searchTerm) ||
    caseObj?.title?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    caseObj?.caseDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    caseObj?.caseType?.toLowerCase().includes(searchTerm.toLowerCase())
  )


  const totalPages = Math.ceil(filteredCaseItem.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCaseItem = filteredCaseItem.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto h-full p-4">
     <div className=" bg-white py-4 px-3 rounded-lg">
     {/* <h1 className="text-xl font-bold mb-4 ">Police Action Page  </h1> */}
      <div className=" flex w-full justify-between items-center">
      <Dialog>
        <div className=" flex space-y-2 flex-col">
            <p className=' text-lg font-poppins'>Case Maganement System</p>
           <div className="">
            <DialogTrigger asChild>
              <Button className=' font-poppins text-white'>Add New </Button>
            </DialogTrigger>
        </div>
        </div>
        <DialogContent className="sm:max-w-[700px] h-[70%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className=' py-5 flex text-center bg-green-200 rounded-lg justify-center'>
               <p className=' flex items-start text-center font-poppins text-green-800'> Add a new Case </p>
            </DialogTitle>
          </DialogHeader>
          <MinistryCaseForm />
        </DialogContent>
      </Dialog>
      <div className=" w-[400px]">
      <div className="mb-4 flex flex-col space-y-2">
          <Label htmlFor="search" className=' text-lg font-poppins'>Search a case</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by caseID, title, or description"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="max-w-sm"
          />
        </div>
      </div>
      </div>
     </div>
      <div className=" mt-2 h-full rounded-lg  px-4 py-4">
        <h2 className="text-xl font-semibold mb-4"></h2>
          <div className=" grid grid-cols-3 gap-3">
           {currentCaseItem.map((caseitem, index) => (
              <AdminCaseItem caseitem={caseitem} key={index} />
            ))}

          </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="py-2 px-4 bg-gray-200 rounded">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}