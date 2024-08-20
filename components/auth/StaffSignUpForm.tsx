
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

import { Button } from "@/components/ui/button"
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
// import { register, regsiter } from "@/actions/regsiter";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import { staffRegistration } from "@/actions/register";


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
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      OtherNames: "",
      state: "",
      position: "",
      role: "USER",
      salaryStructure: "",
      staffNumber: "",
      staffRole: "",
      localGovernment: "",
      email: "",
      phone: "",
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

      <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center px-6 align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Personal Information</legend>
      <div className=" grid text-start grid-cols-1 gap-2 md:grid-cols-2">
       <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Full Name" {...field} />
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
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Full Name" {...field} />
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
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Email Address" {...field} />
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
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="(234) 000 000 000" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={isPending} className=" outline-green-500 w-full" placeholder="Passsord" {...field} />
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
                    <Input type="password"disabled={isPending} className=" w-full outline-green-500" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      </div>
      </fieldset>

      <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center items-center align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Employment Data</legend>
      <div className=" grid text-start grid-cols-1 gap-2 md:grid-cols-2">
       <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Full Name" {...field} />
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
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Full Name" {...field} />
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
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Email Address" {...field} />
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
                <Input disabled={isPending} className=" outline-yellow-500" placeholder="(234) 000 000 000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
       <div className="grid text-start grid-cols-1 lg:grid-cols-2 gap-2">
       <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isPending} className=" outline-yellow-500" placeholder="Passsord" {...field} />
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
                <Input type="password"disabled={isPending} className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
      </fieldset>

      <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center items-center align-middle justify-center">
      <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Security Information</legend>
       <div className="grid text-start grid-cols-1 lg:grid-cols-2 gap-2">
       <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isPending} className=" outline-yellow-500" placeholder="Passsord" {...field} />
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
                <Input type="password"disabled={isPending} className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
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
       <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-jgreen text-white w-full">Create an Account</Button>
      </form>
    </Form>
   <div className=" flex flex-col space-y-4 py-6">
    <Link href="/login" className=" flex space-x-2">
        <p className=""> Already have an account ? </p>
        <span className=" font-semibold">Log In</span>
    </Link>
   <fieldset className=" border  border-primary rounded-lg flex flex-col text-center items-center align-middle justify-center">
        <legend className=" flex px-2 text-sm text-primary font-semibold" >or log in with</legend>
      <div className=" py-4 w-full ">
       Hello World
      </div>
    </fieldset>
   </div>
    </div>
  )
}


