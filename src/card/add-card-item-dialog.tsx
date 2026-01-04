import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { AddCardItemForm } from '@/card/add-card-item-form'

interface AddCardItemDialogProps {
  onClose?: () => void
}

export const AddCardItemDialog = ({ onClose }: AddCardItemDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) onClose?.()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto mt-4 mr-4"
        >
          <Text
            variant="body"
            className="font-medium"
          >
            Add Wishes
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Add your desired items...</DialogTitle>
        </DialogHeader>
        <AddCardItemForm onClose={handleOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
