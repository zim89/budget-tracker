'use client'
import { CategoryDialog } from '@/components/category-dialog'
import { DataTable } from '@/components/data-table'
import { Statistic } from '@/components/statistic'
import { TransactionDialog } from '@/components/transaction-dialog'
import { useQuery } from '@tanstack/react-query'
import { transactionService } from '@/shared/services/transaction.service'

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.findAll(),
  })

  return (
    <div className='container mx-auto space-y-8 p-24'>
      <div className='flex justify-center gap-10'>
        <Statistic />
        <div className='flex flex-col gap-5'>
          <CategoryDialog />
          <TransactionDialog />
        </div>
      </div>

      {data && data.length > 0 && (<DataTable data={data} />)}
    </div>
  )
}
