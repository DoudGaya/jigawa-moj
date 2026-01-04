import React from 'react'
import { SearchbaleCustomerList } from './_components/SearchbaleCustomerList';
import { CustomerActionArea } from './_components/CustomerActionArea'
import { getAllCustomerCount, getAllCustomers } from '@/actions/customers';
import { CustomerType } from '@/typings';
import { PaginationContainer } from './_components/PaginationContainer';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface SearchParamsProps {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

const page = async (props: SearchParamsProps) => {
  const searchParams = await props.searchParams;


  const pagenum = searchParams.pagenum ?? 0 as number

  // @ts-ignore
  const {customers, totalCustomers, totalPages} = await getAllCustomers(pagenum)





  return (
    <div className=' flex flex-col'>
      <div className=" w-full max-w-6xl mx-auto py-4">
        <CustomerActionArea customerCount={totalCustomers} />
      </div>
        <div className="max-w-6xl mx-auto w-full px-6">
        
          <ScrollArea>
            <SearchbaleCustomerList 
            // @ts-ignore
            customers={customers}
            totalPages={totalPages}
            />
          </ScrollArea>
          {/* <PaginationContainer  totalPages={totalPages} /> */}
      </div>
    </div>
  )
}

export default page