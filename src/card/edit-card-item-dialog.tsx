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

interface EditCardItemDialogProps {
  card: Card
  item: CardItem
}

export const EditCardItemDialog = ({ card, item }: EditCardItemDialogProps) => {
  const [openCardItemId, setOpenCardItemId] = useState<string | null>(null)

  return (
    <Dialog
      open={openCardItemId === item.id}
      onOpenChange={(open) => setOpenCardItemId(open ? item.id : null)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <FontAwesomeIcon
            icon={faPencil}
            className="text-purple-800"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {card.title}</DialogTitle>
        </DialogHeader>
        <EditCardItemForm
          card={card}
          item={item}
          onClose={() => setOpenCardItemId(null)}
        />
      </DialogContent>
    </Dialog>
  )
}
