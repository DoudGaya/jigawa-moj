"use client"
import { useState, useEffect } from 'react'
import { getAllCount } from '@/actions/admin'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cards as AdminCards } from './courtUtils'
import { getUserByEmail } from '@/data/user'


interface Cards {
    id: number
    name: string
    icon: React.ReactNode,
    count: number 
    url: string
}



const DashboardCard = ({
    name, 
    url, 
    id,
    icon, 
    count,
}: Cards) => {

    return (
        <div className=" bg-white dark:bg-black dark:text-gray-300 w-full shadow-md border border-primary/50 rounded-lg flex flex-col">
            <div className=" flex flex-row items-end p-2 justify-between">
            <div className=" flex flex-col p-2 hover:bg-gray-100 hover:dark:bg-gray-800 rounded-md cursor-pointer items-start">
                <p className=' text-4xl font-poppins font-[400] '>{ count }</p>
               <div className=" flex space-x-2 ">
                    {icon}
                    <p className=' font-poppins text-xs'> { name } </p>
               </div>
            </div>  
            <div className="">
                <button className='text-sm text-white font-poppins py-1 px-4 rounded-md bg-primary'>action</button>
            </div>
            </div>
            <Link href={ url } className=" rounded-b-lg flex space-x-3 justify-between px-2 text-green-900 bg-primary/30 p-1.5">
                <div className=' font-poppins text-sm'> {`All ${ name }`} </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
            </Link>
        </div>
    )
}


export const CourtAdminDashboardCards = () => {
    const [cards, setCards] = useState<Cards[]>(AdminCards)

    useEffect(() => {
        const fetchAndUpdateCards = async () => {
            try {
                const data = await getAllCount();
                setCards(prevCards =>
                    prevCards.map( card => ({
                        ...card,
                        // @ts-ignore
                        count: data[card.name.toLowerCase()] ?? card.count,
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        };

        fetchAndUpdateCards();
    }, []);



  return (
    <div className='grid grid-cols-2 w-full gap-4 mx-auto px-3 max-w-7xl'>
        {
            cards.map((single) => {
                return <DashboardCard 
                    key={single.id}
                    id={single.id}
                    name={single.name}
                    icon={single.icon}
                    count={single.count}
                    url={single.url}
                />
            })
        }
    </div>
    
  )
}
