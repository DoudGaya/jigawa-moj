"use client"

import { UserCustomer } from "@/typings"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { useTransition } from "react";
// import { signUpSchema } from "@/lib/schema";
import { signUpSchema } from "@/lib/zod-schemas/user-schema"
import { states } from "@/lib/jigawa";
import { localGovernment } from "@/lib/jigawa";
import { Gender } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormSuccess } from "@/components/FormSuccess";
import { FormError } from "@/components/FormError";
// import { UpdateUserRecordSchema } from "@/lib/schema"
import { UpdateUserRecordSchema } from "@/lib/zod-schemas/user-schema"
import { updateCustomerDetailsId } from "@/actions/customers"



import { createNewCustomer } from "@/actions/customers";
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
import { ScrollArea } from "@/components/ui/scroll-area"



const employmentStatus = [
  {
    id: 1,
    name: "Student ",
  },
  {
    id: 2,
    name: "Employed ",
  },
  {
    id: 3,
    name: "Unemployed ",
  }
]

const maritalStatus = [
  {
    id: 1,
    name: "Single ",
  },
  {
    id: 2,
    name: "Married ",
  },
  {
    id: 3,
    name: "Divorced",
  }
]




export const AdminCustomerEditCard = ( {customer}: {
    customer: UserCustomer
} ) => {

    
  const router = useRouter()



  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')

  const changeTerms = () => {
    return setTerms((prev: boolean): boolean => {
      return !prev
    })
  }

   const form = useForm<z.infer<typeof UpdateUserRecordSchema>>({
    resolver: zodResolver(UpdateUserRecordSchema),
    defaultValues: {
      firstName: customer?.firstName || undefined,
      lastName: customer?.lastName || undefined,
      otherNames: customer?.otherNames,
      email: customer?.email || undefined,
      phone: customer?.phone || undefined,
      gender: customer.gender || undefined,
      state: customer?.state,
      localGovernment: customer?.localGovernment || undefined,
      maritalStatus: customer.customer?.maritalStatus || undefined,
      occupation: customer?.customer?.occupation || undefined,
      city: customer?.customer?.city || undefined,
      employmentStatus: customer?.customer?.employmentStatus || undefined,
      address: customer?.customer?.address || undefined,
      password: undefined,
      passwordConfirmation:  undefined
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UpdateUserRecordSchema>) {
    setError('')
    setSuccess('')
    if (values.password) {
      if (values.password !== values.passwordConfirmation) {
        return {error: "Password and Password Confirmation must match"}
      }
    }
    startTransition(() => {
      updateCustomerDetailsId(customer.id, values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })

      router.refresh()
    })
  }

  return (
    <div className=" bg-white h-[78vh] flex flex-col rounded-lg p-4 w-full">
        <div className="pb-2 border-b">
             <h3 className=" font-poppins font-semibold">Update User's Profile</h3>
        </div>
        <ScrollArea className="" >
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <fieldset className=" border  border-primary rounded-lg flex py-10 flex-col text-center space-y-4 px-6 align-middle justify-center">
          <legend className=" flex px-2 py-1 text-primary font-poppins font-semibold" >Personal Information</legend>
        <div className=" grid text-start grid-cols-1 gap-2 md:grid-cols-3">
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
        </div>
        <div className="grid text-start grid-cols-1 w-full lg:grid-cols-3 gap-2">
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
          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-2 text-start ">
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

          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status ( Optional ) </FormLabel>
                <FormControl>
                <Select 
                      onValueChange={field.onChange} 
                      disabled={isPending}
                      defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Marital Status" />
                        </SelectTrigger>
                          <SelectContent>
                              {
                                maritalStatus.map((emp) => {
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

          </div>

          <div className=" grid lg:grid-cols-3 grid-cols-1 gap-2 text-start ">
          <FormField
          control={form.control}
          name="employmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment Status ( Optional )</FormLabel>
              <FormControl>
              <Select 
                    onValueChange={field.onChange} 
                    disabled={isPending}
                    defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Eployment Status" />
                      </SelectTrigger>
                        <SelectContent>
                            {
                              employmentStatus.map((emp) => {
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
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation (Optional) </FormLabel>
                  <FormControl>
                    <Input disabled={isPending} className=" outline-green-500" placeholder="Occupation ( Optional )" {...field} />
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
                  <FormLabel>City (Optional) </FormLabel>
                  <FormControl>
                    <Input type="text" disabled={isPending} className=" outline-green-500" placeholder="Jigawa, Dutse ( Optional ) " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        
        <div className=" grid grid-cols-1 w-full items-start text-start">
          <FormField 
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
              />
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

  
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit" disabled={isPending} className=" bg-primary hover:bg-jgreen text-white w-full">Update Customer Records</Button>
        </form>
          </Form>
         
          </ScrollArea>
    </div>
  )
}
