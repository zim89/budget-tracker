'use client'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { categoryService, type Category } from '../services/category.service'

export function useCategories() {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.findAll(),
  })

  const [items, setItems] = useState<Category[] | undefined>(data || [])

  useEffect(() => {
    if (data) setItems(data)
  }, [data])

  return { items, setItems }
}
