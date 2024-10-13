"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react";
// import { CourtRegisterSchema, signUpSchema } from "@/lib/schema";
import { CourtRegisterSchema } from "@/lib/zod-schemas/courts-schema";
import { states } from "@/lib/jigawa";
import { localGovernment } from "@/lib/jigawa";
import { Gender, Tribunal } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";
import { useRouter } from "next/navigation";
import { useId } from "react";
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CourtRegistrationAction } from "@/actions/courts";


const courtLevel = [ 
    {
        id: 'qwerdfkn',
        name: "Supreme Court"
    },
    {
        id: 'asdfgfd',
        name: "High Court"
    },
    {
        id: 'kjnmll',
        name: "District Court"
    },
    {
      id: 'kjndfll',
      name: "Magistrate Court"
    },
    {
      id: 'kjnm23ll',
      name: "Customary Court"
    },
]

const jurisdiction = [
  {
    id: 1,
    name: "Jigawa State",
  },
  {
    id: 2,
    name: "Nigeria",
  },

]

const tribunal = [ 
  "SHARIA",
  "CIVIL",
  "ELECTION",
  "INDUSTRIAL",
  "TAX",
  "ADMINISTRATIVE",
  "OTHER",
]



interface Infrastructure {
  name: string 
  number: string
}





export function AdminCreateCourtForm() {

  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')
  const [infrastructure, setInfrastructure] = useState<Infrastructure[]>([])

  const [name, setName] = useState<string>("")
  const [number, setNumber] = useState<string>("")


  const router = useRouter()


  const changeTerms = () => {
    return setTerms((prev: boolean): boolean => {
      return !prev
    })
  }




  const addToInfrastructure = (event: any) => {
    event.preventDefault()
    setInfrastructure((prev: any) => {
      return [...prev, { name, number}]
    })

    setName("")
    setNumber("")
  }




  const deleteInfrastructure = (itemToDelete: string) => {
    setInfrastructure((prev) => prev.filter((item) => item.name !== itemToDelete));
  };


   const form = useForm<z.infer<typeof CourtRegisterSchema>>({
    resolver: zodResolver(CourtRegisterSchema),
    defaultValues: {
        firstName: "",
        lastName: "",
        otherNames: "",
        email: "",
        state: "",
        localGovernment: "",
        city: "", 
        courtAddress: "", // unasigned
        jurisdiction: "",
        courtName: "",
        courtLocalGovernment: "",
        tribunal: undefined,
        level: "",
        gender: undefined,
        phone: "",
        password: "",
        passwordConfirmation: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CourtRegisterSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      if(values.password !== values.passwordConfirmation) {
        setError('Password does not matched')
        return
      }
      CourtRegistrationAction(values)
      .then((data) => {
        if (data.error) {
         setError(data.error)
         return;
       }
       if (data.success) {
         setSuccess(data.success)
         router.refresh()
       }
      })
    })
  }



  return (
    <div className=" flex mt-6 flex-col">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
      <fieldset className=" border  border-primary rounded-lg space-y-8 flex py-4 px-6 flex-col text-center items-center align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" > Court Information</legend>
        <div className="grid text-start grid-cols-1 w-full lg:grid-cols-2 gap-2">
          <FormField 
              control={form.control}
              name="courtName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Court Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} className=" outline-green-500" placeholder="Magistrate Court Jigawa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <FormField
          control={form.control}
          name="tribunal"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Tribunal </FormLabel>
              <FormControl>
              <Select 
                    onValueChange={field.onChange} 
                    disabled={isPending}
                    defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder=" Tribunal" />
                      </SelectTrigger>
                        <SelectContent>
                            {
                              tribunal.map((emp, index) => {
                                return <SelectItem key={index} value={emp}> { `${emp.at(0)}${emp.slice(1, emp.length).toLocaleLowerCase()}` } </SelectItem>
                              })
                            }
                        </SelectContent>
                    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       <div className=" grid grid-cols-2 w-full gap-2 text-start ">
          <FormField 
              control={form.control}
              name="jurisdiction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Court Jurisdiction</FormLabel>
                  <FormControl>
                    <Select 
                    onValueChange={field.onChange} 
                    disabled={isPending}
                    defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          jurisdiction.map((state) => {
                            return (
                              <SelectItem key={state.id} value={state.name}> {state.name} </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courtLocalGovernment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Government</FormLabel>
                  <FormControl>
                  <Select onValueChange={field.onChange}  disabled={isPending} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder=" Local Government" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          localGovernment.map((state) => {
                            return (
                              <SelectItem   key={state.id} value={state.name}> {state.name} </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      </div>
      <div className=" grid text-start w-full grid-cols-1 gap-2 md:grid-cols-2">
       <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Court level</FormLabel>
              <FormControl>
              <Select 
                    onValueChange={field.onChange} 
                    disabled={isPending}
                    defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Court Level" />
                      </SelectTrigger>
                        <SelectContent>
                            {
                              courtLevel.map((emp) => {
                                return <SelectItem key={emp.id} value={emp.name}> { emp.name } </SelectItem>
                              })
                            }
                        </SelectContent>
                    </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Court Location </FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-green-500" placeholder="Address / Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       <div className=" grid text-start grid-cols-1 w-full">
       {/* <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cases Capacity</FormLabel>
              <FormControl>
                <Input disabled={isPending} type="number" className=" outline-green-500" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
         <FormField
          control={form.control}
          name="courtAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Court Address</FormLabel>
              <FormControl>
              <Textarea disabled={isPending} className=" outline-green-500" placeholder="e.g Gumel" {...field} />

                {/* <Input  /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
       {/* <div className=" flex flex-col border-y border-primary py-2 space-y-4 my-2">
        <div className=" flex flex-col divide-y ">
          { infrastructure ? infrastructure.map((item: Infrastructure) => {
              return (
                <div key={item.name} className=" flex items-center  hover:bg-gray-100 hover:cursor-pointer space-x-4 w-full">
                 <div className=" w-full flex justify-between px-3 rounded-md  ">
                  <p> { item.name }</p>
                  <p> { item.number }</p>
                 </div>
                  <Button className=" text-red-500 hover:text-red-300 bg-transparent  " onClick={() => deleteInfrastructure(item.name)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  </Button>
                </div>
              )
            }) : ""
            }
        </div>
        <div className=" flex space-x-3 w-full text-start items-end">
            <div className=" flex flex-col justify-center w-full">
              <label htmlFor="" className=" text-sm font-semibold font-poppins">Name</label>
              <Input type="text" id="item" name="number" onChange={(e) => {setName(e.target.value)}} value={name} className=" outline-green-500 " />
            </div>
            <div className=" flex flex-col ">
              <label htmlFor="amount" className=" text-sm font-semibold font-poppins">Number</label>
              <Input type="text" id="number" onChange={(e) => { setNumber(e.target.value)}} value={number} name="number" className=" outline-green-500 " />
            </div>
            <div className=" flex flex-col ">
            <Button onClick={addToInfrastructure}>Add</Button>
            </div>
        </div>
       </div> */}

      </fieldset>
      <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center space-y-4 px-6 align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Court Admin information</legend>
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
                        <SelectValue placeholder="Gender" />
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
        <div className="grid text-start grid-cols-1 md:grid-cols-2 gap-2">
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
      <div className=" grid grid-cols-2 gap-2 text-start ">
      <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin State</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-green-500" placeholder="Eg. Jigawa State" {...field} />
              </FormControl>
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
              <FormControl>
                <Input disabled={isPending} className=" outline-green-500" placeholder="Eg. Babura" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          {/* <FormField 
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State of Residence</FormLabel>
                  <FormControl>
                    <Select 
                    onValueChange={field.onChange} 
                    disabled={isPending}
                    defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your State" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          states.map((state) => {
                            return (
                              <SelectItem key={state.id} value={state.name}> {state.name} </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="localGovernment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Government</FormLabel>
                  <FormControl>
                  <Select onValueChange={field.onChange} disabled={isPending} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder=" Admin Local Government" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          localGovernment.map((state) => {
                            return (
                              <SelectItem   key={state.id} value={state.name}> {state.name} </SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
      </div>
      <div className=" grid grid-cols-1 w-full items-start text-start">
        {/* <FormField 
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Full Address</FormLabel>
                  <FormControl>
                  <Textarea
                      placeholder="No. 3 Gagarawa Avenue, Jigawa Dutse. "
                      className="resize-none w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
      </div>
      </fieldset>

     
      <fieldset className=" border  border-primary px-6 rounded-lg flex py-10 flex-col text-center items-center align-middle justify-center">
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
          name="passwordConfirmation"
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
      </fieldset>

      
       <div className="flex items-center space-x-2">
      <Checkbox id="terms" 
       checked={terms}
       onCheckedChange={changeTerms}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
          <FormSuccess message={success} />
          <FormError message={error} />
       <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-jgreen text-white w-full">Create a New Court</Button>
      </form>
    </Form>
    </div>
  )
}

