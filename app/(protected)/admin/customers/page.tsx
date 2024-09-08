import React from 'react'
import { SearchbaleCustomerList } from './_components/AdminCustomerItem';
import { CustomerActionArea } from './_components/CustomerTopNav'
import { getAllCustomerCount, getAllCustomers } from '@/actions/customers';
import { CustomerType } from '@/typings';
import { PaginationContainer } from './_components/PaginationContainer';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface SearchParamsProps {
  searchParams: {[key: string]: string | string[] | undefined}
}

const page = async ({searchParams}: SearchParamsProps) => {


  const pagenum = searchParams.pagenum ?? 0 as number

  // @ts-ignore
  const {customers, totalCustomers, totalPages} = await getAllCustomers(pagenum)





  return (
    <div className=' flex flex-col'>
      <div className=" w-full max-w-6xl mx-auto py-2">
        <CustomerActionArea customerCount={totalCustomers} />
      </div>
        <div className="max-w-6xl mx-auto my-2 px-6 lg:px-0 py-2 w-full">
          <div className=" md:grid hidden justify-items-center border-y py-4 grid-cols-7 w-full">
            <div className="">First Name</div>
            <div className="">Last Name</div>
            <div className="">Email</div>
            <div className="">Phone</div>
            <div className="">State</div>
            <div className="">Local Government</div>
            <div className=" text-end flex w-full justify-end">
              <p>Actions</p>
            </div>
          </div>
          <ScrollArea className=' my-4'>
            <SearchbaleCustomerList 
            // @ts-ignore
            customers={customers}/>
          </ScrollArea>
          {/* <PaginationContainer  totalPages={totalPages} /> */}
      </div>
    </div>
  )
}

export default page