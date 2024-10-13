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


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

import { createPoliceUser, deletePolice } from '@/actions/police'
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'
import { useRouter } from 'next/navigation'
import { PoliceUserType } from '@/typings'
import { AdminPoliceStationItem } from './AdminPoliceStationItem'
import { ScrollArea } from '@/components/ui/scroll-area'



export function AdminPoliceActionArea( { stations }: {
    stations: PoliceUserType[]
} ) {
  const [policeStations, setPoliceStations] = useState<PoliceUserType[]>(stations || [])
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
    resolver: zodResolver(policeUSerSchema),
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
        setPoliceStations([...policeStations, data.data])
    })
})

    toast({
      title: "Police Station Registered",
      description: `${data.police.stationName} has been successfully registered.`,
    })
    reset()
    router.refresh()
  }

  const filteredPoliceStations = policeStations.filter(station =>
    station?.police?.stationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station?.police?.stationAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station?.police?.stationLocalGovernment?.toLowerCase().includes(searchTerm.toLowerCase())
  )


  const totalPages = Math.ceil(filteredPoliceStations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPoliceStations = filteredPoliceStations.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto h-full p-4">
     <div className=" bg-white py-4 px-3 rounded-lg">
     {/* <h1 className="text-xl font-bold mb-4 ">Police Action Page  </h1> */}
      <div className=" flex w-full justify-between items-center">
      <Dialog>
        <div className=" flex space-y-2 flex-col">
            <p className=' text-lg font-poppins'>Police Registration Section</p>
           <div className="">
            <DialogTrigger asChild>
            <Button className=' font-poppins text-white'>Add New </Button>
            </DialogTrigger>
        </div>
        </div>
        <DialogContent className="sm:max-w-[600px] h-[70%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className=' py-5 flex text-center bg-gray-200 rounded-lg justify-center'>
               <p className=' flex items-start text-center font-poppins'> Police Station Registration Form </p>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center space-y-4 px-3">
         <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Station Information</legend>
               <div className=" grid grid-cols-2 gap-3 items-start text-start">
                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="police.name"> Station Name</Label>
                    <Input className=' w-full flex' {...register("police.stationName")} id="police.name" />
                    {errors.police?.stationName && <p className="text-red-500 text-sm">{errors.police.stationName.message}</p>}
                </div>

                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="police.address">Station Address</Label>
                    <Input className=' w-full flex' {...register("police.stationAddress")} id="police.address" />
                    {errors.police?.stationAddress && <p className="text-red-500 text-sm">{errors.police.stationAddress.message}</p>}
                </div>


                <div className=' w-full flex flex-col space-y-3'>
                <Label htmlFor="police.state">State</Label>
                <Select 
                onValueChange={(value) => setValue("police.stationState", value, { shouldValidate: true })}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Station State" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            states.map((state) => (
                                <SelectItem key={state.id} value={state.name}>{state.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                   {errors.police?.stationState && <p className="text-red-500 text-sm">{errors.police.stationState.message}</p>}
                </div>


                <div className=' w-full flex flex-col space-y-3'>
                <Label htmlFor="police.stationLocalGovernment">Local Government</Label>
                <Select 
                  onValueChange={(value) => setValue("police.stationLocalGovernment", value, { shouldValidate: true })}>
                    <SelectTrigger>
                    <SelectValue placeholder="Local Government" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            localGovernment.map((lga) => (
                                <SelectItem key={lga.id} value={lga.name}>{lga.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                    {/* <Label htmlFor="police.localGovernment">Local Government</Label>
                    <Input className=' w-full flex' {...register("police.stationLocalGovernment")} id="police.localGovernment" /> */}
                    {errors.police?.stationLocalGovernment && <p className="text-red-500 text-sm">{errors.police.stationLocalGovernment.message}</p>}
                </div>

                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="police.contactNumber">Contact Number</Label>
                    <Input className=' w-full flex' {...register("police.stationcontactNumber")} id="police.contactNumber" />
                    {errors.police?.stationcontactNumber && <p className="text-red-500 text-sm">{errors.police.stationcontactNumber.message}</p>}
                </div>

                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="police.contactEmail">Contact Email</Label>
                    <Input className=' w-full flex' {...register("police.contactEmail")} id="police.contactEmail" type="email" />
                    {errors.police?.contactEmail && <p className="text-red-500 text-sm">{errors.police.contactEmail.message}</p>}
                </div>
                
               </div>
            </fieldset>

          <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center space-y-4 px-3">
            <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Police Admin Information</legend>
            <div className=" grid grid-cols-2 gap-3 items-start text-start justify-items-start">
            <div className=' w-full flex flex-col space-y-3'>
                <Label className=' w-full' htmlFor="user.firstName">First Name</Label>
                <Input className=' w-full flex' {...register("firstName")} id="user.firstName" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className=' w-full flex flex-col space-y-3'>
                <Label className=' w-full' htmlFor="user.lastName">Last Name</Label>
                <Input className=' w-full flex' {...register("lastName")} id="user.lastName" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
            <div className=' w-full flex flex-col space-y-3'>
              <Label htmlFor="user.phone">Phone</Label>
              <Input className=' w-full flex' {...register("phone")} id="user.phone" />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className=' w-full flex flex-col space-y-3'>
                <Label htmlFor="user.gender">Gender</Label>
                <Select onValueChange={(value) => register("gender").onChange({ target: { value } })}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>

            <div className=' w-full flex flex-col space-y-3'>
              <Label htmlFor="user.state">State</Label>
              <Input className=' w-full flex' {...register("state")} id="user.state" />
              {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>
             
                <div className=' w-full flex flex-col space-y-3'>
              <Label htmlFor="user.localGovernment">Local Government</Label>
              <Input className=' w-full flex' {...register("localGovernment")} id="user.localGovernment" />
              {errors.localGovernment && <p className="text-red-500 text-sm">{errors.localGovernment.message}</p>}
            </div>

            </div>
           
         </fieldset>
         <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center space-y-4 px-3">
            <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Login Information</legend>
            {/* security Information */}
               <div className=" grid grid-cols-2 gap-3 text-start items-start ">
               <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="user.email"> Login Email</Label>
                    <Input className=' w-full flex' {...register("email")} id="user.email" type="email" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="user.email">Confirm Email</Label>
                    <Input className=' w-full flex' {...register("confirmEmail")} id="user.email" type="email" />
                    {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail.message}</p>}
                </div>
                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="user.password"> Login Password</Label>
                    <Input className=' w-full flex' {...register("password")} id="user.password" type="password" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className=' w-full flex flex-col space-y-3'>
                    <Label htmlFor="user.confirmPassword">Confirm Password</Label>
                    <Input className=' w-full flex' {...register("confirmPassword")} id="user.confirmPassword" type="password" />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
               </div>
            {/* End security Information */}
        </fieldset>
            <div className="">
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>

            <div className=" flex w-full ">
            <Button type="submit" disabled={isPending} className=' w-full text-white'>Submit Police Station</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className=" w-[400px]">
      <div className="mb-4 flex flex-col space-y-2">
          <Label htmlFor="search" className=' text-lg font-poppins'>Search Police Stations</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name, address, or local government"
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
      <div className="mt-8 bg-white h-full rounded-lg  px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Registered Police Stations</h2>
        <Table className=' py-6'>
          <TableHeader className=' rounded-lg '>
            <TableRow className=' bg-green-500/70 hover:bg-green-500/70 rounded-t-lg font-semibold font-poppins text-white'>
              <TableHead className=' text-xs'>Name</TableHead>
              <TableHead className=' text-xs'>Address</TableHead>
              <TableHead className=' text-xs'>Station LGA</TableHead>
              <TableHead className=' text-xs'>Contact Number</TableHead>
              <TableHead className=' text-xs'>Administrator</TableHead>
              <TableHead className=' text-xs'>Admin Phone</TableHead>
              <TableHead className=' text-xs'>Contact Email</TableHead>
              <TableHead className=' text-xs'>Action</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody className=' overflow-auto'>
              {currentPoliceStations.map((station, index) => (
                <AdminPoliceStationItem station={station} key={index} />
              ))}
            </TableBody>
        </Table>
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