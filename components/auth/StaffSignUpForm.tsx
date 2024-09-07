
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react";
import Link from "next/link";
import { signUpSchema } from "@/lib/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes";
import { StaffSchema } from "@/lib/schema";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Gender } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import { staffRegistration } from "@/actions/register";
import { states } from "@/lib/jigawa";
import { localGovernment } from "@/lib/jigawa";


export function StaffSignUpForm () {

  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')



  const changeTerms = () => {
    return setTerms((prev: boolean): boolean => {
      return !prev
    })
  }

   const form = useForm<z.infer<typeof StaffSchema>>({
    resolver: zodResolver(StaffSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      otherNames: "",
      email: "",
      isTwoFactorEnabled: undefined,
      phone: "",
      state: "",
      localGovernment: "",
      employerName: "",
      gender: undefined,
      department: "",
      jobTitle: "",
      position: "",
      employmentLocation: "",
      staffNumber: "",
      salaryStructure: "",
      salaryGrade: "",
      step: "",
      password: "",
      passwordConfirmation: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof StaffSchema>) {
    setError('')
    setSuccess('')

    startTransition(() => {
      if(values.password !== values.passwordConfirmation) {
        setError('Password does not matched')
      }
      
      staffRegistration(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })

  }



  return (
    <div className=" flex mt-10 flex-col w-full ">
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
      <div className=" flex flex-col space-y-4 text-start pt-4">
          <FormField 
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
            />
            <FormField
              control={form.control}
              name="localGovernment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Government</FormLabel>
                  <FormControl>
                  <Select onValueChange={field.onChange} disabled={isPending} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your Local Government" />
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
      </fieldset>

      <fieldset className=" border  border-primary rounded-lg space-y-4 flex py-10 px-6 flex-col text-center items-center align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Employment Data</legend>
        <div className="grid text-start grid-cols-1 w-full lg:grid-cols-2 gap-2">
       <FormField 
          control={form.control}
          name="employerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer Name</FormLabel>
              <FormControl>
                <Input type="text" disabled={isPending} className=" outline-green-500" placeholder="Jigawa State High Court" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="department"
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
          name="jobTitle"
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
          name="position"
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
          name="employmentLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Location</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-green-500" placeholder="Jigawa Dutse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
            control={form.control}
            name="staffNumber"
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
          name="salaryStructure"
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
          name="salaryGrade"
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
          name="step"
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
       <div className="py-6 flex text-start justify-between w-full">
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
       <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-jgreen text-white w-full">Create your Account</Button>
      </form>
    </Form>
   <div className=" flex flex-col space-y-4 py-6">
    <Link href="/login" className=" flex space-x-2">
        <p className=""> Already have an account ? </p>
        <span className=" font-semibold">Log In</span>
    </Link>
   <fieldset className=" border py-4  border-primary rounded-lg flex flex-col text-center items-center align-middle justify-center">
      <legend className=" flex px-2 text-sm text-primary font-semibold" >Not a Ministry of Justice Staff?</legend>
        <Link href={'/register'} className=" flex space-x-3 w-ful py-2 delay-75 duration-150 ease-in-out transition-colorstext-center items-center  hover:text-primary font-semibold justify-center">
              <p>Public Registration</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-all delay-75 duration-150 ease-in-out translate-x-3 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
        </Link>
    </fieldset>
   </div>
    </div>
  )
}


