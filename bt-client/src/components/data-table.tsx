'use client'
import type { Transaction } from '@/shared/services/transaction.service'
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from './ui/button'
import { useMemo, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import dayjs from 'dayjs'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

const columnHelper = createColumnHelper<Transaction>()

export const columns = [
  columnHelper.accessor('type', {
    size: 100,
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer items-center gap-1 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </span>
      )
    },
    cell: info => (
      <span
        className={cn(
          info.getValue() === 'income' ? 'text-green-600' : 'text-red-600',
        )}
      >
        {info.getValue() as string}
      </span>
    ),
  }),
  columnHelper.accessor('category_id.name', {
    size: 200,
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer items-center gap-1 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </span>
      )
    },
  }),
  columnHelper.accessor('description', {
    size: 500,
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer items-center gap-1 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Description
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </span>
      )
    },
  }),
  columnHelper.accessor('created_at', {
    size: 200,
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer items-center gap-1 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </span>
      )
    },
    cell: info => (
      <div>
        {dayjs(info.getValue() as string | number | Date).format(
          'DD MMM, YYYY (HH:mm)',
        )}
      </div>
    ),
  }),
  columnHelper.accessor('amount', {
    size: 100,
    header: ({ column }) => {
      return (
        <span
          className='flex cursor-pointer items-center gap-1 font-bold'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </span>
      )
    },
  }),
]

export const DataTable = ({ data }: { data: Transaction[] }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  let tableData = useMemo(() => {
    if (!data) return []

    return [...data].sort(
      (b, a) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
  }, [data])

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Search by description...'
          value={
            (table.getColumn('description')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('description')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <div className='min-h-[410px] rounded-md border'>
        <Table>
          <TableHeader className='bg-gray-100'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: header.column.columnDef.size,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.columnDef.size,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
  // Removed the dummy dayjs function
}
