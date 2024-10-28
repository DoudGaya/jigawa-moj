import React from 'react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { MdOutlineLocalPolice } from "react-icons/md";
import { PiBank } from "react-icons/pi";
import { PiUserSwitch } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";

const softwares = [
    {
        name: 'Police Station Management System',
        link: '/ministry/police',
        icon: <MdOutlineLocalPolice className=' size-10' />,
        description: "Manage all police stations. This section allows for easy registration, profile management, and access control for different police stations, this section allow police to create a case." 
    },
    {
        name: 'Staff Management System',
        link: '/ministry/staff',
        icon:  <PiUserSwitch className=' size-10' />,
        description: "This section allows staff registration. It includes information about court staff, roles, responsibilities, and status within the system." 
    },
    {
        name: 'Court Management System',
        link: '/ministry/court',
        icon: <PiBank className=' size-10' />,
        description: "Oversee and manage court information, schedules, and proceedings. This section includes details about court locations, schedules, and the assigned judges or officials." 
    },
    {
        name: 'Case Management System',
        link: '/ministry/cases',
        icon: <HiOutlineDocumentText className=' size-10' />,
        description: "Track and manage all active and archived cases. This section provides insights into case statuses, types, involved parties, and court dates for streamlined case tracking." 
    }
]

export const AdminDocs = () => {
  return (
    <div className='flex flex-col gap-4 rounded-lg h-full'>
        <Separator className=' w-full my-1 bg-green-400' />
        <div className=" grid grid-cols-2 gap-4 h-full w-full rounded-lg ">
            {
                softwares.map((software, index) => {
                    return (
                        <div key={index} className=' bg-white py-4 shadow-sm rounded-lg px-6'>
                        <Link className=' flex flex-col space-y-6' href={software.link}>
                            <div className=' text-lg font-poppins font-semibold text-green-800'>
                                {software.icon}
                                <span>{software.name}</span>
                            </div>
                            <p> { software.description } </p>
                        </Link>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}

{/* <div className=" bg-white p-4 shadow-lg rounded-lg ">Hello Again</div> */}
  {/* <h1 className=' text-lg font-popping font-semibold text-green-800'>Ministry of Justice Software Features</h1> */}
           {/* <Separator className=' w-full' /> */}
            {/* <ul className=' flex flex-col space-y-4 font-poppins'>
                <li>
                    <Link href="">Police Station Management System </Link>
                </li>
                <li>
                    <Link href="">Staff Management System</Link>
                </li>
                <li>
                    <Link href="">Court Management System</Link>
                </li>
                <li>
                    <Link href="">Case Management System </Link>
                </li>
            </ul> */}