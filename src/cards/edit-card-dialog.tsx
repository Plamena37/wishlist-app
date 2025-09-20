import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/lib/types/Cards'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { EditCardForm } from '@/cards/edit-card-form'
import { Text } from '@/components/ui/text'

interface EditCardDialogProps {
  card: Card
  onMenuClose: () => void
}

export const EditCardDialog = ({ card, onMenuClose }: EditCardDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) onMenuClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="sm:px-0 justify-start"
        >
          <FontAwesomeIcon
            icon={faPencil}
            className="text-purple-800"
          />
          <Text
            variant="body"
            className="text-purple-900 font-medium"
          >
            Edit
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {card.title}</DialogTitle>
        </DialogHeader>
        <EditCardForm
          card={card}
          onClose={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}
