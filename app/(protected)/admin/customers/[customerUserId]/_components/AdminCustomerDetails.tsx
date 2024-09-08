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

       <div className=" flex w-full flex-col space-y-4 bg-gray-50 py-6 px-4 rounded-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>EMAIL</small>
              <p className=' text-sm font-poppins text-gray-800/80 font-semibold'>{ customer.email }</p>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-800/50'>PHONE</small>
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.phone }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>EMAIL</small>
              <p className=' text-sm font-poppins text-gray-800/80 font-semibold'>{ customer.email }</p>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-800/50'>PHONE</small>
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.phone }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-900/50'>STATE</small>
              <p className=' text-sm font-poppins text-gray-800/80 font-semibold'>{ customer.state }</p>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <small className=' text-xs uppercase font-poppins font-semibold text-gray-800/50'>Local Government</small>
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.localGovernment }</p>
            </div>
          </div>
       </div> 

       <hr />

       <div className=" flex w-full flex-col space-y-4 bg-gray-50 py-6 px-4 rounded-lg">
          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className='text-sm font-poppins text-gray-800/80 font-semibold'>Cases</small>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{customer.customer.cases.length }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className='text-sm font-poppins text-gray-800/80 font-semibold'>Transactions</small>

            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.customer.transactions.length }</p>
            </div>
          </div>

          <div className=" flex justify-between ">
            <div className=" flex flex-col items-start text-start  space-y-1 ">
              <small className='text-sm font-poppins text-gray-900/70 font-semibold'>Probates</small>
            </div>

            <div className=" flex flex-col items-end text-end space-y-1 ">
              <p className=' text-sm font-poppins text-gray-900/70 font-semibold'>{ customer.customer.probates.length }</p>
            </div>
          </div>
       </div> 

    </div>
  )
}
