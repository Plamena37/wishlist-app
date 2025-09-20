import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Card, CardItem } from '@/lib/types/Cards'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { EditCardItemForm } from '@/card/edit-card-item-form'
import { Text } from '@/components/ui/text'

interface EditCardItemDialogProps {
  card: Card
  item: CardItem
  onMenuClose: () => void
}

export const EditCardItemDialog = ({
  card,
  item,
  onMenuClose,
}: EditCardItemDialogProps) => {
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
        <EditCardItemForm
          card={card}
          item={item}
          onClose={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}
