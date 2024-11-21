'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from 'lucide-react'
import TransactionSearchBar from './_components/TransactionSearchBar'
import TransactionList from './_components/TransactionList'
import TransactionFormModal from './_components/TransactionFormModal'
import TransactionPagination from './_components/TransactionPagination'

export default function CourtTransactionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Court Transactions</h1>
      
      <div className="mb-6">
        <TransactionSearchBar onSearch={handleSearch} />
      </div>
      
      <div className="mb-6">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Transaction
        </Button>
      </div>
      
      <TransactionList searchQuery={searchQuery} currentPage={currentPage} />
      
      <div className="mt-6">
        <TransactionPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={10} />
      </div>
      
      <TransactionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}