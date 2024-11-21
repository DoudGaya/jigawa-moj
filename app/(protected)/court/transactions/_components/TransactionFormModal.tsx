import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const transactionSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  paymentFor: z.string().min(1, 'Payment purpose is required'),
  caseId: z.string().min(1, 'Case ID is required'),
  customerId: z.string().min(1, 'Customer ID is required'),
})

interface TransactionFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TransactionFormModal({ isOpen, onClose }: TransactionFormModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
  })

  const onSubmit = (data: z.infer<typeof transactionSchema>) => {
    console.log(data)
    // Handle form submission
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
        </DialogHeader>
        <form 
        // @ts-ignore
        onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" {...register('amount')} />
            {/* {errors.amount && <p className="text-red-500 text-sm">{errors?.amount?.message}</p>} */}
          </div>
          <div>
            <Label htmlFor="paymentFor">Payment For</Label>
            <Select onValueChange={(value) => register('paymentFor').onChange({ target: { value } })}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="affidavit">Affidavit</SelectItem>
                <SelectItem value="declaration">Declaration of Age</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {/* {errors.paymentFor && <p className="text-red-500 text-sm">{errors.paymentFor.message}</p>} */}
          </div>
          <div>
            <Label htmlFor="caseId">Case ID</Label>
            <Input id="caseId" {...register('caseId')} />
            {/* {errors.caseId && <p className="text-red-500 text-sm">{errors.caseId.message}</p>} */}
          </div>
          <div>
            <Label htmlFor="customerId">Customer ID</Label>
            <Input id="customerId" {...register('customerId')} />
            {/* {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId.message}</p>} */}
          </div>
          <Button type="submit">Create Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}