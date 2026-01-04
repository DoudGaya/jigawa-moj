'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { nigeriaStatesLGA , localGovernment } from '@/lib/jigawa'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



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

import { useToast } from "@/hooks/use-toast"
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'
import { useRouter } from 'next/navigation'
import { AdminStaffItem } from './AdminStaffItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StaffUser } from '@/typings'
import { staffRegistrationAction } from '@/actions/staffs'
import { StaffUserSchema } from '@/lib/zod-schemas/staff-schema'
import * as z from 'zod'



import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Gender } from "@prisma/client";


import { Switch } from "@/components/ui/switch"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"








export function AdminStaffPage ( { staffs }: {
    staffs: StaffUser[]
} ) {
  const [staffsList, setStaffList] = useState<StaffUser[]>(staffs || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')
  const [selectedState, setSelectedState] = useState('');
  const [lgas, setLgas] = useState([]);
  const { toast } = useToast()
  const router = useRouter()

  // @ts-ignore
  const handleStateChange = (value) => {
    setSelectedState(value);
    const stateLgas = nigeriaStatesLGA.find(s => s.state === value)?.lgas || [];
    // @ts-ignore
    setLgas(stateLgas);
    form.setValue('state', value);
    form.setValue('localGovernment', '');
  };


  const itemsPerPage = 30

  const form = useForm<z.infer<typeof StaffUserSchema>>({
    resolver: zodResolver(StaffUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      otherNames: "",
      email: "",
      phone: "",
      state: "",
      localGovernment: "",
      gender: undefined,
      staff: {
        dateOfEmployment: "", // create 
        maritalStatus: "", // create
        isJudge: undefined, // is judge
        department: "",
        employerName: "",
        jobTitle: "",
        position: "",
        employmentLocation: "",
        staffNumber: "",
        salaryStructure: "",
        salaryGrade: "",
        step: "",
        staffRole: "",
      },
      password: "",
      confirmPassword: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof StaffUserSchema>) {

    console.log(values)
    setError('')
    setSuccess('')
    startTransition(() => {
      staffRegistrationAction(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
        // @ts-ignore
        setStaffList([...staffsList, data.data])
      })

      toast({
        title: "Staff has been Registered",
        description: `${values.firstName} has been successfully registered.`,
      })
      router.refresh()
    })
  }

  const filteredStaffs = staffsList.filter(staff =>
    staff?.staff?.staffNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.staff?.staffRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.staff?.salaryStructure?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.staff?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.staff?.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff?.localGovernment?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredStaffs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStaff = filteredStaffs.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto h-full p-4">
     <div className=" bg-white py-4 px-3 rounded-lg">
      <div className=" flex w-full justify-between items-center">
      <Dialog>
        <div className=" flex space-y-2 flex-col">
            <p className=' text-lg font-poppins'>Staffs Registration Section</p>
           <div className="">
            <DialogTrigger asChild>
            <Button className=' font-poppins text-white'>Add New </Button>
            </DialogTrigger>
        </div>
        </div>
        <DialogContent className="sm:max-w-[600px] h-[70%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className=' py-5 flex text-center bg-gray-200 rounded-lg justify-center'>
               <p className=' flex items-start text-center font-poppins'> Staff Registration Form </p>
            </DialogTitle>
          </DialogHeader>
              {/* THE FORM GOES HERE */}

              <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">

          <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center space-y-4 px-6 align-middle justify-center">
            <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Personal Information</legend>
          <div className=" grid text-start grid-cols-1 gap-2 md:grid-cols-2">
          <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Abdulrahman" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Dauda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="grid text-start grid-cols-1 w-full lg:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="otherNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Name(s)</FormLabel>
                  <FormControl className=" w-full">
                    <Input disabled={isPending} className=" outline-green-500 w-full" placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl className=" w-full">
                  <Select 
                        onValueChange={field.onChange} 
                        disabled={isPending}
                        defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Your Gender" />
                          </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={Gender.MALE}> Male </SelectItem>
                                <SelectItem value={Gender.FEMALE}> Female </SelectItem>
                                <SelectItem value={Gender.OTHER}> Other </SelectItem>
                            </SelectContent>
                        </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className=" grid text-start grid-cols-1 md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="jigawa@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="(234) 000 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        </div>
        <div className="grid grid-cols-2 gap-2 text-start">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin State</FormLabel>
                  <Select 
                    onValueChange={handleStateChange}
                    disabled={isPending}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nigeriaStatesLGA.map((state) => (
                        <SelectItem key={state.state} value={state.state}>
                          {state.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localGovernment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin LGA</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    disabled={isPending || !selectedState}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an LGA" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lgas.map((lga) => (
                        <SelectItem key={lga} value={lga}>
                          {lga}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          </fieldset>

          <fieldset className=" border  border-primary rounded-lg space-y-4 flex py-10 px-6 flex-col text-center items-center align-middle justify-center">
            <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Employment Data</legend>
            <div className="grid text-start grid-cols-1 w-full lg:grid-cols-2 gap-2">
          <FormField 
              control={form.control}
              name="staff.employerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} className=" outline-green-500" placeholder="jigawa State High Court" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="staff.department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input type="text"disabled={isPending} className=" outline-green-500" placeholder="Your Department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" grid text-start w-full grid-cols-1 gap-2 md:grid-cols-2">
          <FormField
              control={form.control}
              name="staff.jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Chief Judge" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="staff.position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Position</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Job Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="grid w-full text-start grid-cols-1 gap-2 md:grid-cols-2">
            <FormField
              control={form.control}
              name="staff.employmentLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Location</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="jigawa Dutse" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name="staff.staffNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff Number</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} className=" outline-green-500" placeholder="S. 00000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

          </div>
          <div className=" grid w-full text-start grid-cols-1 md:grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="staff.salaryStructure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Structure</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="CONTISS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="staff.salaryGrade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Grade</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Level 8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
              control={form.control}
              name="staff.step"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Step 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            </div>
            <div className=" grid text-start grid-cols-1 md:grid-cols-2 gap-2">
            </div>
          </fieldset>

          <fieldset className=" border  border-primary px-6 rounded-lg flex py-6 flex-col text-center items-center align-middle justify-center">
          <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Security Information</legend>
          <div className="grid text-start w-full grid-cols-1 lg:grid-cols-2 gap-2">
          <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={isPending} className=" outline-green-500" placeholder="Passsord" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input type="password"disabled={isPending} className=" outline-green-500" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
                  {/* <div className="py-6 flex text-start justify-between w-full">
                      <FormField
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className=" w-full">
                          <div className=" flex justify-between items-center">
                          <div className=" flex flex-col">
                          <FormLabel>Two factor Authenication (Optional ) </FormLabel>
                          <FormDescription>Enable two Factor Authentication</FormDescription>
                          </div>
                            <FormControl>
                              <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div> */}
          </fieldset>


       <div className="flex items-center space-x-2">
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
          <FormSuccess message={success} />
          <FormError message={error} />
       <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-jgreen text-white w-full">Create your Account</Button>
      </form>
    </Form>


        </DialogContent>
      </Dialog>
      <div className=" w-[400px]">
      <div className="mb-4 flex flex-col space-y-2">
          <Label htmlFor="search" className=' text-lg font-poppins'>Search Staff </Label>
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
        <h2 className="text-xl font-semibold mb-4">Registered Staffs</h2>
        <Table className=' py-6'>
          <TableHeader className=' rounded-lg '>
            <TableRow className=' bg-green-500/70 hover:bg-green-500/70 rounded-t-lg font-semibold font-poppins text-white'>
              <TableHead className=' text-xs'>First Name</TableHead>
              <TableHead className=' text-xs'>Last Name</TableHead>
              <TableHead className=' text-xs'> State</TableHead>
              <TableHead className=' text-xs'>L.G.A</TableHead>
              <TableHead className=' text-xs'>Staff Number</TableHead>
              <TableHead className=' text-xs'>Staff Role</TableHead>
              <TableHead className=' text-xs'>Department</TableHead>
              <TableHead className=' text-xs'>Department</TableHead>
              <TableHead className=' text-xs'>Department</TableHead>
              <TableHead className=' text-xs'>Department</TableHead>
              <TableHead className=' text-xs'>Salary Staructure</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody className=' overflow-auto'>
              {currentStaff.map((staff, index) => (
                <AdminStaffItem staff={staff} key={index} />
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
