"use client"
import React from "react"
import Image from "next/image"
import danModi from '@/public/img/dan-modi.jpg'
import judge from '@/public/img/judge.jpg'
import jigawa from '@/public/img/jigawa-state.png'
import nigeria from '@/public/img/nigeria.png'
import image1 from '@/public/img/carousel/image1.jpg'
import image2 from '@/public/img/carousel/image2.jpg'
import image3 from '@/public/img/carousel/image3.jpg'
import image4 from '@/public/img/carousel/image4.jpg'
import { useCurrentUser } from "@/hooks/use-current-user"
import Link from "next/link"

const caroselImages = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
]
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export const Banner = () => {

    const user = useCurrentUser()
  return (
    <>  
    <div className=" h-[100vh] flex flex-col bg-white w-full text-center overflow-hidden" >
       <div className=" my-auto  mx-auto max-w-6xl w-full flex flex-col px-6">
        <div className=" flex items-center py-2 space-x-4 justify-center">
            <div className="">
                <Image src={nigeria} alt="" className=" h-28 w-28 border-4 border-primary rounded-full" />
            </div>
            <div className="">
                <Image src={jigawa} alt="" className=" h-28 w-28 border-4 border-primary rounded-full" />
            </div>
        </div>
            <Carousel>
                <CarouselPrevious />
                <CarouselContent className="-ml-4 py-4 my-4">
                        {
                    caroselImages.map((item): any => {
                        return (
                            <CarouselItem key={item.id} className="basis-1/3">
                               <div className=" h-[200px] overflow-hidden rounded-md">
                                <Image src={item.image} className=" h-full object-cover object-center w-full" alt="" />
                               </div>
                            </CarouselItem>
                        )
                    })
                } 
                </CarouselContent>
                <CarouselNext />
            </Carousel>
        <h1 className=' text-2xl md:text-2xl font-poppins text-[#1E1815] max-w-2xl mx-auto font-semibold'>Welcome to Jigawa State Ministry of Justice <span className=" text-primary"> eFiling </span>Facility</h1>
      {/* {
        user ? (
            <p className=" font-poppins text-md my-4 font-semibold">Welcome back {user.firstName}, Go to <Link className=" text-primary" href={'/user/dashboard'}> Dashboard </Link> </p>
        ) : (
            <div className=" flex flex-col space-y-1">
            <div className=" items-center justify-center flex w-full  max-w-4xl gap-x-6 gap-y-2 my-6 mx-auto">
                <Link href={'/register'} className=" px-8 py-2 rounded-md border delay-75 duration-150 ease-in-out transition-colors border-primary text-center items-center hover:bg-primary hover:text-white font-semibold justify-center">
                    <p>Create an Account</p>
                </Link>
            </div>
            <p className=" font-semibold">Already have an account <Link href={'/login'} className=" text-primary underline ">Log In</Link> </p>
       </div>
        )
      } */}
       </div>
      
    </div>
</>
)
}
