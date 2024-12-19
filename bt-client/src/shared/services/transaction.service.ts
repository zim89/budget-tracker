import { instanceBase } from '../api/axios'

export interface Transaction {
  id: number
  amount: number
  type: 'income' | 'expense'
  description: string
  created_at: string
  updated_at: string
  category_id: {
    id: number
    name: string
    type: 'income' | 'expense'
  }
}

export interface TransactionFormData {
  amount: number
  type?: 'income' | 'expense'
  description: string
  category_id: number
}

class TransactionService {
  private BASE_URL = '/transactions'

  async findAll() {
    const response = await instanceBase.get<Transaction[]>(this.BASE_URL)
    return response.data
  }

  async create(data: TransactionFormData) {
    const response = await instanceBase.post(this.BASE_URL, data)
    return response.data
  }
}

export const transactionService = new TransactionService()
