'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useCategories } from '@/shared/hooks/use-categories'
import { useEffect, useState } from 'react'
import type { ControllerRenderProps } from 'react-hook-form'

export function CategoryCombobox({
  field,
}: {
  field: ControllerRenderProps<
    {
      amount: string
      category_id: number
    },
    'category_id'
  >
}) {
  const { items } = useCategories()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value && items && items.length > 0
            ? items.find(item => item.name === value)?.name
            : 'Select category...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
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
                    key={item.name}
                    value={item.name}
                    onSelect={currentValue => {
                      setValue(currentValue === value ? '' : currentValue)
                      field.value = item.id
                      setOpen(false)
                    }}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === item.name ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
