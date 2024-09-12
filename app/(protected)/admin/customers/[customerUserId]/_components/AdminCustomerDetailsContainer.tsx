"use client"
import React, { useState } from 'react'
import { AdminCustomerDetails } from './AdminCustomerDetails'
import { UserCustomer } from '@/typings'
import { Button } from '@/components/ui/button'
import { deleteUserAndCustomerDetailsById } from '@/actions/customers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AdminCustomerEditCard } from './AdminCustomerEditCard'


export const CustomerDetailsContainer = ({id, customer}: {
    id: string,
    customer: UserCustomer  
} ) => {
  
  const [editSection, setEditSection] = useState(false)
  const router = useRouter()





  
  const deleteCustomer = async () => {
      await deleteUserAndCustomerDetailsById(id)
      router.push("/admin/customers")
  }

  const updateEditModal = () => {
      setEditSection((prev) => {
          return !prev
      })
  }






  return (
        <div className='flex w-full flex-col h-full'>
          <div>
              <div className=" flex justify-between p-4 pb-0">
              <div className=" flex space-x-3 items-center ">
                <Link href={'/admin/dashboard'} className=' font-poppins text-sm  bg-green-400/40 text-green-950 rounded-lg py-1 px-3 '>Dashboard</Link> <span className=' -tracking-wider'>... </span>
                <Link href={'/admin/customers'} className=' font-poppins text-sm  bg-green-400/40 text-green-950 rounded-lg py-1 px-3 '>customers</Link>
              </div>
              <div className=" flex space-x-3">
                  <AlertDialog>
                    <AlertDialogTrigger className='py-1 bg-red-500/30 px-3 rounded-md text-red-800 hover:bg-red-500/50 font-poppins'>Delete Customer</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this account
                          and remove the data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className=' px-0 bg-transparent'>
                          <Button onClick={deleteCustomer} className=' text-white w-full hover:bg-red-500/70 bg-red-500 '>Yes Delete</Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                <Button onClick={updateEditModal} className=' py-1 font-poppins'>{editSection ? "Close Modal" : "Update Customer"}</Button>
              </div>
            </div>
          </div>

            <div className=" grid p-4 gap-4 lg:grid-cols-3 grid-cols-1 w-full">
              <div className=" w-full">
                <AdminCustomerDetails customer={customer} />
              </div>

              <div className=" col-span-2">
                    { editSection && (<AdminCustomerEditCard customer={customer} />)}
              </div>
            </div>
        </div>
  )
}
