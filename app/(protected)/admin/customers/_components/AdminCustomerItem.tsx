import React from 'react'
import { UserCustomer } from '@/typings'
import Link from 'next/link'




export const SearchbaleCustomerList = ( {customers}: {
  customers: UserCustomer[],
} ) => {

  return (
    <div className=' grid grid-cols-1 gap-2'>
      {
        customers.map((single) => {
          return (
            <div key={single.id} className=" bg-white py-6 lg:py-3 px-3 rounded-md flex flex-col">
              <div className="lg:hidden w-full justify-between flex px-2 items-center ">
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 stroke-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <Link href={`/admin/customers/${  single.id }`} className=' flex lg:hidden items-center bg-green-500/30 rounded-md px-2 py-1 space-x-2'>
                  <p className=' text-sm'>Details</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-green-800 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
              
              </div>
             <div className=" grid grid-cols-1 md:grid-cols-7 gap-y-6 lg:gap-y-0 justify-items-start px-4 py-6 lg:px-0 lg:py-0 lg:justify-items-center w-full items-center">
                <div className='text-sm flex flex-col lg:flex-none lg:block font-poppins'>
                  <small className=' lg:hidden block uppercase font-semibold text-gray-700/50'>First Name</small>
                  <p className=' font-semibold lg:font-normal'>{ single.firstName }</p>
                </div>

                <div className='text-sm flex flex-col lg:flex-none lg:block font-poppins'>
                  <small className=' lg:hidden block uppercase font-semibold text-gray-700/50'>First Name</small>
                  <p className=' font-semibold lg:font-normal'>{ single.lastName }</p>
                </div>

                <div className='text-sm flex flex-col lg:flex-none lg:block font-poppins'>
                  <small className=' lg:hidden block uppercase font-semibold text-gray-700/50'>First Name</small>
                  <p className=' font-semibold lg:font-normal'>{ single.email }</p>
                </div>
                <div className='text-sm flex flex-col lg:flex-none lg:block font-poppins'>
                  <small className=' lg:hidden block uppercase font-semibold text-gray-700/50'>First Name</small>
                  <p className=' font-semibold lg:font-normal'>{ single.phone }</p>
                </div>

                <div className='text-sm flex flex-col lg:flex-none lg:block font-poppins'>
                  <small className=' lg:hidden block uppercase font-semibold text-gray-700/50'>First Name</small>
                  <p className=' font-semibold lg:font-normal'>{ single.state }</p>
                </div>

                <div className='text-sm flex flex-col lg:flex-none lg:block font-poppins'>
                  <small className=' lg:hidden block uppercase font-semibold text-gray-700/50'>First Name</small>
                  <p className=' font-semibold lg:font-normal'>{ single.localGovernment }</p>
                </div>
                <div className=" flex justify-end w-full items-end">
                <Link href={`/admin/customers/${ single.id }`} className=' hidden lg:flex items-center bg-green-500/30 rounded-md px-2 py-1 space-x-2'>
                  <p className=' text-sm'>Details</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 stroke-green-800 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
                  </div>
             </div>
            </div>
          )
        })
      }
    </div>
  )
}
 