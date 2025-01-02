'use client'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { MinistryUserItem } from './MinistryUserItem'
import { GenericUser } from '@/typings'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MInistryAddUser } from './MInistryAddUser'
import { useToast } from "@/hooks/use-toast"
import { createUser, deleteUser, updateUserById } from '@/data/user'
export function MinistryUserActionArea({
  users
}: {
  users: GenericUser[]
}) {
  const [usersItems, setUserItem] = useState<GenericUser[]>([...users])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 20

  const filteredUsers = usersItems.filter(item =>
    item?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())  ||
    item?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())  ||
    item?.localGovernment?.toLowerCase().includes(searchTerm.toLowerCase())  ||
    item?.role?.toLowerCase().includes(searchTerm.toLowerCase())  ||
    item?.email?.toLowerCase().includes(searchTerm.toLowerCase()) 
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUser = filteredUsers.slice(startIndex, endIndex)

  const handleUserDelete = async (userId: string) => {
    try {
      await deleteUser(userId)
      setUserItem(prevItems => prevItems.filter(item => item.id !== userId))
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting User:", error)
      toast({
        title: "Error",
        description: "Failed to delete User. Please try again.",
        variant: "destructive",
      })
    }
  }


  const handleUpdateUser = async (user: GenericUser) => {
    try {
      // Call the API to update the user
      // @ts-ignore
      const result = await updateUserById(user.id, user) as unknown as GenericUser


      
      // Update the local state
      setUserItem(prevItems => 
        prevItems.map(item => 
          item.id === user.id ? result : item
        )
      )
      
      // Show success toast
      toast({
        title: "User Updated",
        description: "User has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating User:", error)
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to update User. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddUser = (newUser: GenericUser) => {
    setUserItem(prevItems => [...prevItems, newUser])
    setIsDialogOpen(false)
    toast({
      title: "User Added",
      description: "New User has been added successfully",
    })
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-5vh)]">
      <div className="flex flex-col max-h-min py-0 my-0 bg-white dark:bg-dark-bg border-b drop-shadow-sm  w-full">
        <div className="w-full items-center flex px-6 justify-between py-4 rounded-lg">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row w-full md:justify-between md:items-center">
            <div className="flex space-y-2 flex-col">
              <p className='text-lg font-poppins font-semibold'>User Management</p>
              <div className="flex space-x-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className='font-poppins text-white dark:bg-primary'>Register a New User</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[80%] md:max-w-xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className='py-5 flex text-center bg-green-200 rounded-lg justify-center'>
                          <p className='flex items-start text-center font-poppins dark:text-primary text-primary'>Add User </p>
                        </DialogTitle>
                    </DialogHeader>
                    <MInistryAddUser onSubmit={handleAddUser} onClose={() => setIsDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col space-y-2">
                <Label htmlFor="search" className='text-base font-poppins font-semibold'>Search User </Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by title or description"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="max-w-sm outline-primary border-primary placeholder:text-primary w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow ">
        <div className="p-4">
          <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentUser.map((user) => (
              <MinistryUserItem onUpdate={ handleUpdateUser} user={user} key={user.id} onDelete={handleUserDelete} />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center py-4 bg-white dark:bg-dark-bg border-t">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='bg-black dark:bg-gray-600'
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className='bg-black dark:bg-gray-600'
        >
          Next
        </Button>
      </div>
    </div>
  )
}

