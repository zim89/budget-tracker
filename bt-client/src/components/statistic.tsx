import { useTransactions } from '@/shared/hooks/use-transactions'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'

export const Statistic = () => {
  const { items } = useTransactions()

  const income_sum =
    items?.reduce((acc, item) => {
      return item.type === 'income' ? acc + item.amount : acc
    }, 0) || 0

  const expense_sum =
    items?.reduce((acc, item) => {
      return item.type === 'expense' ? acc + item.amount : acc
    }, 0) || 0

  const balance = income_sum - expense_sum
  return (
    <Card className='max-w-min space-y-4 self-start p-8 text-2xl font-bold'>
      <div className='flex gap-8'>
        <h2 className='w-48'>Total Income: </h2>
        <span className='text-green-600'>{income_sum.toString()}</span>
      </div>
      <div className='flex gap-8'>
        <h2 className='w-48'>Total Expenses: </h2>
        <span className='text-red-600'>{expense_sum.toString()}</span>
      </div>
      <div className='flex max-w-min gap-8 rounded-md border bg-zinc-100 p-2'>
        <h2 className='w-48'>Overall Balance: </h2>
        <span className={cn(balance >= 0 ? 'text-green-600' : 'text-red-600')}>
          {balance.toString()}
        </span>
      </div>
    </Card>
  )
}
