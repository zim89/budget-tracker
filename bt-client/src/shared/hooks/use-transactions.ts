import { useQuery } from '@tanstack/react-query'
import {
  transactionService,
  type Transaction,
} from '../services/transaction.service'
import { useEffect, useState } from 'react'

export function useTransactions() {
  const { data } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionService.findAll(),
  })

  const [items, setItems] = useState<Transaction[] | undefined>(data || [])

  useEffect(() => {
    if (data) setItems(data)
  }, [data])

  return { items, setItems }
}
