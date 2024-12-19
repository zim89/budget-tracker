'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { CategoryForm } from './category-form'

export const CategoryDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Create category</Button>
      </DialogTrigger>

      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription className='hidden'>...</DialogDescription>
        </DialogHeader>

        <CategoryForm closeModal={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
