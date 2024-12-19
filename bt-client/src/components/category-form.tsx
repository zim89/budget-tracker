'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { LoaderCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  categoryService,
  type CategoryFormData,
} from '@/shared/services/category.service'
import { Button } from './ui/button'

const FormSchema = z.object({
  name: z.string().nonempty(),
  type: z.enum(['income', 'expense']),
})

export const CategoryForm = ({
  closeModal,
}: {
  closeModal: (open: boolean) => void
}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (formData: CategoryFormData) =>
      categoryService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      type: 'income',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      mutation.mutate(data)
      toast.success('Category created successfully.')
      closeModal(false)
    } catch (error) {
      toast.error('Failed to create transaction.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='font-bold'>Category name:</FormLabel>
              <FormControl>
                <Input placeholder='Enter category name ...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='font-bold'>Type:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex gap-2'
                >
                  {[{ value: 'income' }, { value: 'expense' }].map(item => {
                    return (
                      <FormItem
                        key={item.value}
                        className='flex items-center gap-2 space-y-0'
                      >
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.value}
                        </FormLabel>
                      </FormItem>
                    )
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-2 gap-5'>
          <Button
            type='submit'
            className='flex w-full items-center justify-center'
          >
            {mutation.isPending ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              'Create'
            )}
          </Button>
          <Button
            type='reset'
            variant='outline'
            onClick={() => form.reset()}
            className='w-full'
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}
