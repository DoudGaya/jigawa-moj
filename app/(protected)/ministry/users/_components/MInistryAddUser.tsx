'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
import { uploadMultipleFilesToS3 } from '@/actions/amazon-s3'
import { Input } from "@/components/ui/input"
import { nigeriaStatesLGA } from '@/lib/jigawa'
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
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { uploadFileToS3 } from '@/actions/amazon-s3'
import { createUserSchema } from '@/lib/zod-schemas/user-schema'
import { GenericUser } from '@/typings'
import { UserRole } from '@prisma/client'
import { Gender } from '@prisma/client'
import { createUser } from '@/data/user'


interface AddUserProps {
  onSubmit: (data: GenericUser) => void
  onClose: () => void
}
export function MInistryAddUser({ onSubmit, onClose }: AddUserProps) {
  const [isPending, setIsPending] = useState(false)
  const [selectedState, setSelectedState] = useState<string>('')
  const [lgas, setLgas] = useState<string[]>([])
  const router = useRouter()
  const { toast } = useToast()



  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      gender: undefined,  
      state: '',
      localGovernment: '',
      password: '',
      passwordConfirmation: '',
      phone: '',
      role: undefined,
      otherNames: '',
    },
  })

  
  useEffect(() => {
    if (selectedState) {
      const stateLgas = nigeriaStatesLGA.find(
        (item) => item.state === selectedState
      )?.lgas || []
      setLgas(stateLgas)
    }
  }, [selectedState, form])

  async function handleSubmit(values: z.infer<typeof createUserSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };

      const data = await createUser(formDataToSubmit)
      onSubmit(data?.user as GenericUser)
      form.reset()
      onClose()
      toast({
        title: "User Added",
        description: "New User has been added successfully",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to add User. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
      router.refresh()
    }
  }

  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className=' border-green-500 border' disabled={isPending} {...field} />
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className='border-green-500 border' disabled={isPending} {...field} />
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
                <FormLabel>Other Names</FormLabel>
                <FormControl>
                  <Input className=' border-green-500 border' disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input className=' border-green-500 border' disabled={isPending} {...field} />
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
                  {/* <Input className=' border-green-500 border' disabled={isPending} {...field} /> */}
                  <Input
          className='border-green-500 border'
          disabled={isPending}
          {...field}
          value={field.value}
          onChange={(e) => {
            // Remove all non-digit characters
            const digits = e.target.value.replace(/\D/g, '');
            
            // Limit to 11 digits
            const truncated = digits.slice(0, 11);
            
            // Format the phone number
            let formatted = truncated;
            if (truncated.length >= 4) {
              formatted = `${truncated.slice(0, 4)}-${truncated.slice(4)}`;
            }
            if (truncated.length >= 8) {
              formatted = `${truncated.slice(0, 4)}-${truncated.slice(4, 8)}-${truncated.slice(8)}`;
            }
            
            // Update the field value with both formatted display and raw value
            field.onChange(truncated); // Store raw value for validation
            e.target.value = formatted; // Show formatted value in input
          }}
          placeholder="0806-2249-832"
        />

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
                                <SelectTrigger className="w-full border border-green-500">
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

<FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className=' col-span-2' >
                        <FormLabel>User Role</FormLabel>
                        <FormControl className=" w-full">
                        <Select 
                              onValueChange={field.onChange} 
                              
                              disabled={isPending}
                              defaultValue={field.value}>
                                <SelectTrigger className="w-full border border-green-500">
                                  <SelectValue placeholder="Select User Role" />
                                </SelectTrigger>
                                  <SelectContent>
                                      <SelectItem value={UserRole.ADMIN}> Ministry </SelectItem>
                                      <SelectItem value={UserRole.COURT}> Court </SelectItem>
                                      <SelectItem value={UserRole.POLICE}> Police </SelectItem>
                                      <SelectItem value={UserRole.STAFF}> Staff </SelectItem>
                                      <SelectItem value={UserRole.USER}> User </SelectItem>
                                  </SelectContent>
                              </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


      <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setSelectedState(value)
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full border border-green-500">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigeriaStatesLGA.map((stateData) => (
                      <SelectItem key={stateData.state} value={stateData.state}>
                        {stateData.state}
                      </SelectItem>
                    ))}
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
              <FormLabel>Local Government Area</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedState}
                >
                  <SelectTrigger className="w-full border border-green-500">
                    <SelectValue placeholder="Select an LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {lgas.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" col-span-2 w-full text-center ">
              <h3 className=' font-poppins'>Security Details</h3>
        </div>
        <div className=" col-span-2 grid grid-cols-2 gap-4 border border-green-500 p-4 rounded-lg"> 
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type='password' className=' border-green-500 border' disabled={isPending} {...field} />
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type='password' className='border-green-500 border' disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

       
        
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}

