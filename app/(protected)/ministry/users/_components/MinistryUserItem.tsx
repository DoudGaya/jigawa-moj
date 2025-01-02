'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { GenericUser, Gender, UserRole } from "@/types"
import { GenericUser,  } from '@/typings'
import { Gender, UserRole } from '@prisma/client'
import { UpdateUserDialog } from './UpdateUserDialog'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'

interface UserCardProps {
  user: GenericUser
  onUpdate: (updatedUser: GenericUser) => void
  onDelete: (userId: string) => void
}

export function MinistryUserItem({ user, onUpdate, onDelete }: UserCardProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm">Phone: {user.phone}</p>
          <p className="text-sm">Gender: {user.gender}</p>
          <p className="text-sm">Role: {user.role}</p>
          <p className="text-sm">State: {user.state}</p>
          <p className="text-sm">LGA: {user.localGovernment}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setIsUpdateDialogOpen(true)}>Update</Button>
        <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>Delete</Button>
      </CardFooter>

      <UpdateUserDialog
        user={user}
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        onUpdate={onUpdate}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(user.id)
          setIsDeleteDialogOpen(false)
        }}
      />
    </Card>
  )
}




// import { 
//   Card, 
//   CardContent, 
//   CardHeader, 
//   CardTitle ,
//   CardFooter
// } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Image from "next/image"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { GenericUser } from "@/typings"

// interface GalleryItemProps {
//   user: GenericUser
//   onDelete: (userId: string) => void
// }

// export function MinistryUserItem({ user, onDelete }: GalleryItemProps) {
//   const handleDelete = () => {
//     onDelete(user.id)
//   }

//   return (
//     <section
// className=" px-0"
// >
// <div className="">
//   <div className="h-full px-0">
//       <div className=' h-full'>
//       Hello People
//       </div>
//   </div>
// </div>
// </section>

//   )
// }

