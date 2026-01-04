import {  getCustomerByUserId } from '@/actions/customers'
import { CustomerDetailsContainer } from './_components/AdminCustomerDetailsContainer'
import { UserCustomer } from '@/typings'


const page = async (params: any) => {
  const id = params.params.customerUserId as string
  const customer = await getCustomerByUserId(id)

  if (!customer) {
    return <div>Customer not found</div>
  }

  return (
   <div className="">
        <CustomerDetailsContainer customer={customer} id={id} />
   </div>
  )
}
export default page