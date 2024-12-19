'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { useCategories } from '@/shared/hooks/use-categories'
import { Check, ChevronsUpDown, LoaderCircle } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  transactionService,
  type TransactionFormData,
} from '@/shared/services/transaction.service'

export const FormSchema = z.object({
  amount: z.string().nonempty(),
  category_id: z.number().positive(),
  type: z.enum(['income', 'expense']),
  description: z.string().nonempty(),
})

export function TransactionForm({
  closeModal,
}: {
  closeModal: (open: boolean) => void
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (formData: TransactionFormData) =>
      transactionService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
    },
  })

  const { items } = useCategories()
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category_id: undefined,
      amount: '',
      type: 'income',
      description: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      mutation.mutate({ ...data, amount: Number(data.amount) })
      toast.success('Transaction created successfully.')
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
          name='category_id'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='font-bold'>Category:</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value && items
                        ? items.find(cat => cat.id === field.value)?.name
                        : 'Select category...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search category...' />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {items &&
                          items.length > 0 &&
                          items.map(item => (
                            <CommandItem
                              value={String(item.id)}
                              key={item.id}
                              onSelect={() => {
                                form.setValue('category_id', item.id)
                                setOpen(false)
                              }}
                            >
                              {item.name}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  item.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel className='font-bold'>Amount:</FormLabel>
              <FormControl>
                <Input {...field} />
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
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Description:</FormLabel>
              <FormControl>
                <Input placeholder='description...' {...field} />
              </FormControl>
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
