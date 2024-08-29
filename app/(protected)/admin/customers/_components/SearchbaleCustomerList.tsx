import { CustomerType } from '@/typings'
import React from 'react'
import { SearchParamsProps } from '../page'
import { CustomerDataTable } from './customer-data-table'
import { ColumnDef } from "@tanstack/react-table"
import { UserCustomer } from '@/typings'
import { MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<UserCustomer>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },

  {
    accessorKey: "lastName",
    header: "Last Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "phone",
    header: "Phone Number",
  },

  {
    accessorKey: "state",
    header: "State",
  },

  {
    accessorKey: "localGovernment",
    header: "Local Government",
  },

  {
    accessorKey: "gender",
    header: "Gender",
  },

  {
    accessorKey: "occupation",
    header: "Occupation",
  },

  {
    accessorKey: "occupation",
    header: "Occupation",
  },

]


export const SearchbaleCustomerList = ( {customers, totalPages }: {
  customers: UserCustomer[],
  totalPages: number
} ) => {
  return (
    <div>
      {
        customers.map((single) => {
          return (
            <CustomerDataTable key={single.id} data={customers} columns={columns} />
          )
        })
      }
    </div>
  )
}
