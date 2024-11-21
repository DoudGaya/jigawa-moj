"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { z } from "zod"
import Link from "next/link";
import { loginSchema } from "@/lib/schema"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

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
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { login } from "@/actions/login"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes"
import { useSearchParams } from "next/navigation"


export function LoginForm() {

  const [isPending, startTransition] = useTransition()
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already been used with another provider" : ""
   const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values)
      .then((data) => {
        if (data?.error) {
          form.reset() 
          setError(data.error)
        }
        if (data?.success) {
          form.reset()
          setSuccess(data.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
        }
      }).catch( (error) => {
        setError("Something Went Wrong!")
      })
    })
  }

  return (
    <div className=" flex mt-6 flex-col w-full justify-center h-full ">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
      <fieldset className=" border  border-primary rounded-lg flex py-6 flex-col text-center space-y-4 px-6 align-middle justify-center">
        <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Log in Form</legend>
        {showTwoFactor && (
          <div className=" w-full flex flex-col justify-start items-start text-start">
          <FormField
           control={form.control}
           name="code"
           render={({ field }) => (
             <FormItem>
               <FormLabel>An OTP is sent to your email address</FormLabel>
               <FormControl className=" flex items-center justify-center w-full text-center">
               <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
                <InputOTPGroup>
                  < InputOTPSlot index = { 0 } />
                  < InputOTPSlot index = { 1 } />
                  < InputOTPSlot index = { 2 } />
                  < InputOTPSlot index = { 3 } />
                  < InputOTPSlot index = { 4 } />
                  < InputOTPSlot index = { 5 } />
                </InputOTPGroup>
              </InputOTP>
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
         {/* <Button className="" onClick={onSubmit}> Request New OTP</Button> */}
          </div>
        )

        }
        { !showTwoFactor && (
         <>
        <div className=" flex items-start text-start w-full flex-col space-y-2">
        <FormField
           control={form.control}
           name="email"
           render={({ field }) => (
             <FormItem className=" w-full">
               <FormLabel>Email Address</FormLabel>
               <FormControl>
                 <Input type="email" disabled={isPending} className=" outline-green-500" placeholder="Email Address" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        <FormField
           control={form.control}
           name="password"
           render={({ field }) => (
             <FormItem className=" w-full">
               <FormLabel>Password</FormLabel>
               <FormControl>
                 <Input type="password" disabled={isPending} className=" outline-green-500" placeholder="Password" {...field} />
               </FormControl>
               <FormMessage />
             </FormItem>
           )}
         />
        </div>
         </>
        )
        }
         <FormError message={error ||  urlError} />
        <FormSuccess message={success} />
       <Button type="submit" disabled={isPending} className=" bg-primary text-white hover:bg-black/90 w-full"> {showTwoFactor ? "Confirm OTP" : "Log In"} </Button>
      </fieldset>
      </form>
    </Form>
    <div className=" py-6">
    {/* <Link href="/register" className=" flex justify-between text-sm space-x-2">
        <p className=" hover:underline"> Don't have an account ? </p>
        <span className=" font-semibold">Register</span>
    </Link> */}

      <div className="">
        <Button asChild size={'sm'} variant={'link'} className=" px-0 font-normal text-sm text-black ">
            <Link href={'/forgot-password'}>Forgot Password</Link>
        </Button>
      </div>
      </div>
    </div>
  )
}

