'use client'
import { useState } from 'react'
import { TransactionForm } from './transaction-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

export const TransactionDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create transaction</Button>
      </DialogTrigger>

      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle>Create transaction</DialogTitle>
          <DialogDescription className='hidden'>...</DialogDescription>
        </DialogHeader>
        <TransactionForm closeModal={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
