'use client'
import { CategoryDialog } from '@/components/category-dialog'
import { Statistic } from '@/components/statistic'
import { TransactionDialog } from '@/components/transaction-dialog'
import { TransactionList } from '@/components/transaction-list'

export default function Home() {
  return (
    <div className='container mx-auto space-y-8 p-24'>
      <div className='flex justify-center gap-10'>
        <Statistic />
        <div className='flex flex-col gap-5'>
          <CategoryDialog />
          <TransactionDialog />
        </div>
      </div>

      <TransactionList />
    </div>
  )
}
