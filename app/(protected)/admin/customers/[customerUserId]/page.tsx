import {  getCustomerByUserId } from '@/actions/customers'
import { CustomerDetailsContainer } from './_components/AdminCustomerDetailsContainer'
import { UserCustomer } from '@/typings'


const page = async (params: any) => {
  const id = params.params.customerUserId as string
  // @ts-ignore
  const customer = await getCustomerByUserId(id) as UserCustomer

  return (
   <div className="">
        <CustomerDetailsContainer customer={customer} id={id} />
   </div>
  )
}
export default page