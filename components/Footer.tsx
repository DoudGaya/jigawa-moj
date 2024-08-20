import Image from 'next/image'
import React from 'react'
import nigeria from '@/public/img/nigeria.png'
import jigawa from '@/public/img/icons/jigawa-icon.png'
import Link from 'next/link'

interface LinksUrls {
    id: number,
    title: string 
    url: string
}

const loginLinks = [
    {
        id: 1,
        title: 'Control',
        url: ''
    },
    {
        id: 1,
        title: 'Customer Log In',
        url: ''
    },
    {
        id: 1,
        title: 'Judge or Staff Log in',
        url: ''
    },
    {
        id: 1,
        title: 'Court Admin Log in',
        url: ''
    },
]

const signUpLinks = [
    {
        id: 1,
        title: 'Control',
        url: ''
    },
    {
        id: 1,
        title: 'Customer Log Sign Up',
        url: ''
    },
    {
        id: 1,
        title: 'Judge or Staff Sign Up',
        url: ''
    },
    {
        id: 1,
        title: 'Court Admin Sign Up',
        url: ''
    },
]



export const Footer = () => {
  return (
    <div className=' w-full px-4 bg-gray-200 mt-20 '>
        <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 gap-x-6 max-w-5xl mx-auto py-10">
            <div className=" flex flex-col">
                <div className=" border-b-2 border-jyellow flex flex-col  space-y-3 py-1">
                    <div className=" flex flex-row space-x-3">
                        <Image src={nigeria} alt='' className=' h-14 w-14  rounded-full border-2 border-primary' />
                        <Image src={jigawa} alt='' className=' h-14 w-14 rounded-full border-2 border-primary' />
                    </div>
                    <p className=' font-poppins font-semibold'>Jigawa State Minsiry of justice </p>
                </div>
                <div className=" space-y-4 my-4">
                    {/* <h1 className=' font-poppins text-yellow-500  '>ABOUT US</h1> */}
                    <div className=' font-poppins w-full flex flex-col space-y-3 text-sm text-justify '>
                     <div className="">
                        <span className=' font-semibold mr-2 '>Misson:</span>
                        To improve the delivery of Justice, through robustness and professionalism while maintaining synergy with all tiers of government.
                     </div>
                     <div className="">
                        <span className=' font-semibold mr-2 '>Misson:</span>
                        Justice for all citizens consistent with the ideals of democracy and the rule of law.
                     </div>
                    </div>
                </div>
                <div className=" flex flex-row space-x-2">
                    Follow us: Social media links
                </div>
            </div>
            <div className="  font-poppins lg:pr-10 py-14">
            <div className=" space-y-4 my-4">
                <h1 className=' font-poppins font-semibold  '>Useful Links </h1>
                   <div className="">
                    <ul className=' grid grid-cols-1 w-full gap-4 md:grid-cols-2'>
                               {
                                   loginLinks.map((links: LinksUrls) => {
                                       return (
                                        <li className='' key={links.id}>
                                            <Link className=' flex space-x-3 border py-2 px-2 border-primary group rounded-md items-center group-hover:text-primary font-semibold transition-all ease-in-out' href={ links.url}>
                                            <p className=' font-poppins text-sm'> {links.title } </p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 transition-all ease-in-out group-hover:translate-x-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                            </svg>
                                            </Link>
                                        </li>
                                    )
                                })
                               }
                        </ul>
                   </div>
            </div>
            </div>
             
        </div>
    </div>
  )
}
