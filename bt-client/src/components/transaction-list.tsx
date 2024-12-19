'use client'
import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { useQuery } from '@tanstack/react-query'
import { transactionService } from '@/shared/services/transaction.service'

export const TransactionList = () => {
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.findAll(),
  })

  return (
    <div className='space-y-10 py-10'>
      <h2 className='text-2xl font-bold'>TRANSACTIONS:</h2>

      <ul className='space-y-2'>
        {data &&
          data.length > 0 &&
          [...data]
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
            )
            .map(item => (
              <li key={item.id} className='flex items-center justify-between'>
                <span className='flex items-center gap-3'>
                  <span
                    className={cn(
                      'w-[100px]',
                      item.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600',
                    )}
                  >
                    {item.type}
                  </span>
                  <span className='flex w-[100px] items-center'>
                    <Badge className='line-clamp-1'>
                      {item.category_id.name}
                    </Badge>
                  </span>

                  <span className='font-medium'>{item.description}</span>
                </span>
                <p className='flex items-center gap-3'>{item.amount}</p>
              </li>
            ))}
      </ul>
    </div>
  )
}
