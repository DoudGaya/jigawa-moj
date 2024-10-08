"use client"
import React, {useState} from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import logo from '@/public/img/icons/jigawa-icon.png'
  import { useRouter } from "next/navigation"
  import Image from 'next/image'
  
  import { Button } from '@/components/ui/button'
  import { Menu, FileText, Send, Save } from "lucide-react"
import LogoutButton from '@/components/auth/LogOutButton'


export const PoliceSideBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
  return (
    <div className=' h-full'>
    <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle className='flex space-x-2 items-center  '>
                <Image src={logo} className=' rounded-full h-10 w-10 border-2 border-primary object-contain object-center ' alt=''  />
                <span className=' font-poppins font-semibold text-sm'>Jigawa | Justice</span>
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col py-10 my-10 justify-between space-y-8">
            <div className=" flex flex-col space-y-4">
                <Button variant="ghost" className="justify-start font-poppins text-md" onClick={() => router.push('/police/draft-cases')}>
                <FileText className="mr-2 h-4 w-4" />
                Draft Cases
                </Button>
                <Button variant="ghost" className="justify-start font-poppins text-md" onClick={() => router.push('/police/submitted-cases')}>
                <Send className="mr-2 h-4 w-4" />
                Submitted Cases
                </Button>
            </div>
            <div className=" mb-8 ">
                <LogoutButton />
            </div>
          </nav>
        </SheetContent>
      </Sheet>
        <aside className="hidden w-64 bg-white h-full px-6 py-1 lg:block">
          <div className='flex space-x-2 items-center border-b py-2  '>
                <Image src={logo} className=' rounded-full h-10 w-10 border-2 border-primary object-contain object-center ' alt=''  />
                <span className=' font-poppins font-semibold text-sm'>Jigawa | Justice</span>
            </div>
            <nav className="flex flex-col my-10 space-y-2">
            <Button variant="ghost" className="justify-start py-2" onClick={() => router.push('/police/draft-cases')}>
              <FileText className="mr-2 h-4 w-4" />
                Draft Cases
            </Button>
            <Button variant="ghost" className="justify-start py-2" onClick={() => router.push('/police/submitted-cases')}>
                <Send className="mr-2 h-4 w-4" />
                Submitted Cases
            </Button>
            </nav>
        </aside>
    </div>
  )
}
