import { instanceBase } from '../api/axios'

export interface Category {
  id: number
  name: string
  type: 'income' | 'expense'
  transactions: number[]
}

export interface CategoryFormData {
  name: string
  type?: 'income' | 'expense'
}

class CategoryService {
  private BASE_URL = '/categories'

  async findAll() {
    const response = await instanceBase.get<Category[]>(this.BASE_URL)
    return response.data
  }

  async create(data: CategoryFormData) {
    const response = await instanceBase.post(this.BASE_URL, data)
    return response.data
  }
}

export const categoryService = new CategoryService()
