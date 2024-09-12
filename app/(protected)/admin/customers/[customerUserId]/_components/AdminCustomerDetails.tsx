import { UserCustomer } from '@/typings'
import { User } from '@prisma/client'
import React from 'react'
import { localGovernment } from '../../../../../../lib/jigawa';



export const AdminCustomerDetails = ({customer}: {customer: UserCustomer}) => {


  return (
    <div className='w-full bg-white px-4 py-6 text-center space-y-3 rounded-lg flex items-center flex-col'>

       <div className=" flex flex-col items-center space-y-3">
          <div className=" border-2 flex-none rounded-full border-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="size-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
          </div>
            <p className=' font-poppins '>{customer.firstName} {customer.lastName} </p>
       </div>

       <div className=" flex w-full flex-col space-y-3 bg-gray-50 py-6 px-4 rounded-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>EMAIL</small>
              <p className=' text-sm font-poppins text-gray-800/80 font-semibold'>{ customer.email || "N/A" }</p>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-800/50'>PHONE</small>
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.phone || "N/A" }</p>
            </div>
          </div>
          
          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>GENDER</small>
              <p className=' text-sm font-poppins text-gray-800/80 font-semibold'>{ customer.gender || "N/A" }</p>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-800/50'>Marital Status</small>
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.customer.maritalStatus || "N/A" }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
              <div className=" flex flex-col items-start text-start  space-y-1 ">
                <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>Employment Status</small>
                <p className=' text-sm font-poppins text-gray-800/80 font-semibold'>{ customer.customer.employmentStatus || "N/A"  }</p>
              </div>

              <div className=" flex flex-col items-end text-end space-y-1 ">
                <small className=' text-xs uppercase font-poppins font-semibold text-gray-800/50'>Employment</small>
                <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.customer.occupation || "N/A" }</p>
              </div>
          </div>

          <div className=" flex w-full">
              <div className=" flex flex-col items-start text-start  space-y-2 ">
                <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>Address</small>
                <p className=' text-xs font-poppins text-gray-800/80 '>{ customer.customer.address || "N/A" }</p>
              </div>
          </div>



          </div> 

          
       <hr />

       <div className=" flex w-full flex-col space-y-4 bg-gray-50 py-6 px-4 rounded-lg">
          <div className=" flex justify-between ">
              <button className=" flex items-center hover:underline space-x-2 ">
                  <small className='text-sm font-poppins text-gray-800/80 font-semibold'>Cases</small>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" stroke-3 stroke-gray-800/70 size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
              </button>
            <div className=" flex space-x-1 justify-center items-center ">
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{customer.customer.cases.length }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
              <button className=" flex items-center hover:underline space-x-2 ">
                  <small className='text-sm font-poppins text-gray-800/80 font-semibold'>Transactions</small>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" stroke-3 stroke-gray-800/70 size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
              </button>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.customer.transactions.length }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
              <button className=" flex items-center hover:underline space-x-2 ">
                  <small className='text-sm font-poppins text-gray-800/80 font-semibold'>Probates</small>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" stroke-3 stroke-gray-800/70 size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
              </button>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.customer.probates.length }</p>
            </div>
          </div>
       </div> 

    </div>
  )
}
