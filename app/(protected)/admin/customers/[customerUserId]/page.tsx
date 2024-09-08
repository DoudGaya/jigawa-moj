import { getCourtById } from '@/actions/courts'
import React from 'react'
import { getCustomerByUserId } from '@/actions/customers'
import { AdminCustomerDetails } from './_components/AdminCustomerDetails'
import { UserCustomer } from '@/typings'

const page = async (params: any) => {

  const id = params.params.customerUserId as string

    const customer = await getCustomerByUserId(id)


  return (
    <div className='flex w-full h-full'>
      <div className=" grid grid-cols-3 w-full">
        <div className=" p-4 w-full rounded flex">
          <AdminCustomerDetails
            // @ts-ignore
            customer={customer} />
        </div>
      </div>
    </div>
  )
}
export default page