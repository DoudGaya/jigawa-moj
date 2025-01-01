import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  amount: string
  paymentRef: string
  paymentFor: string
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED'
  caseId: string
  customerId: string
  paymentDate: string
}

interface TransactionListProps {
  searchQuery: string
  currentPage: number
}

export default function TransactionList({ searchQuery, currentPage }: TransactionListProps) {
  // Mock data - replace with actual data fetching logic
  const transactions: Transaction[] = [
    {
      id: '1',
      amount: '5000',
      paymentRef: 'REF001',
      paymentFor: 'Affidavit',
      paymentStatus: 'PAID',
      caseId: 'CASE001',
      customerId: 'CUST001',
      paymentDate: '2023-05-01',
    },
    // Add more mock transactions...
  ]

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.paymentRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.paymentFor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment Ref</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment For</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.paymentRef}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.paymentFor}</TableCell>
            <TableCell>
              <Badge
           
              >
                {transaction.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>{transaction.paymentDate}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" onClick={() => console.log('View PDF')}>
                View PDF
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}