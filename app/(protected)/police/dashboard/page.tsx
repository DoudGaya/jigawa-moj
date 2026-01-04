import { PoliceCaseForm } from "../_components/PoliceCaseForm"
import policeLogo1 from '@/public/img/police-logo1.jpg'
import policeLogo from '@/public/img/police.png'
import Image from "next/image"
export default async function Dashboard() {

  return (
    <div className="flex h-full flex-col bg-gray-200">
      <main className="flex-1 p-6 w-full">
      <div className=" md:flex items-center hidden space-x-3 justify-center">
        <div className=" px-4 py-4 rounded-lg flex space-x-2 items-center bg-white">
          <span className=" font-bold">0</span>
          <p className=" text-sm font-poppins">Submitted Cases</p>
        </div>
        <div className=" px-4 py-4  rounded-lg flex space-x-2 items-center bg-white">
          <span className=" font-bold">0</span>
          <p className=" text-sm font-poppins">Draft</p>
        </div>
      </div>
        <div 
          className="h-full bg-cover bg-center rounded-lg flex w-full items-center justify-center"
        >
          <div className=" flex flex-col items-center justify-center space-y-6">
           <Image src={policeLogo} className=" h-[160px] w-[160px] object-contain items-center" alt="" />
            <div className=" px-6">
              <PoliceCaseForm />
            </div>
          </div>
        </div>
      </main>
      <div className=" md:hidden grid grid-cols-2 items-center px-4 gap-4 pb-6 justify-center">
        <div className=" px-4 py-4 rounded-lg flex space-x-2 items-center bg-white">
          <span className=" font-bold">20</span>
          <p className=" text-sm font-poppins">Submitted Cases</p>
        </div>
        <div className=" px-4 py-4  rounded-lg flex space-x-2 items-center bg-white">
          <span className=" font-bold">10</span>
          <p className=" text-sm font-poppins">Draft</p>
        </div>
      </div>
      <div className="w-full font-poppins py-3 flex text-center justify-center">
        <span className=" text-sm text-gray-700">Powered by Zamfara State ICT and Digital Economy Office </span>
      </div>
    </div>
  )
}