import React from 'react'


interface PageProps {
    totalPages: number 
    currentPage: number
}



export const PaginationContainer = ({ totalPages, currentPage }: PageProps ) => {

  if (totalPages === 1) return null
  return (
    <div>
      <div className="">

      </div>
    </div>
  )
}
