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
import { nigeriaStatesLGA } from "@/lib/jigawa";
import { FormError } from "@/components/FormError";
import { useRouter } from "next/navigation";

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "@/components/ui/select"


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
  const [selectedState, setSelectedState] = useState('');
  const [lgas, setLgas] = useState([]);

  // @ts-ignore
  const handleStateChange = (value) => {
    setSelectedState(value);
    const stateLgas = nigeriaStatesLGA.find(s => s.state === value)?.lgas || [];
    // @ts-ignore
    setLgas(stateLgas);
    form.setValue('state', value);
    form.setValue('localGovernment', '');
  };


  const router = useRouter()


  const changeTerms = () => {
    return setTerms((prev: boolean): boolean => {
      return !prev
    })
  }




  // const addToInfrastructure = (event: any) => {
  //   event.preventDefault()
  //   setInfrastructure((prev: any) => {
  //     return [...prev, { name, number}]
  //   })

  //   setName("")
  //   setNumber("")
  // }






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

