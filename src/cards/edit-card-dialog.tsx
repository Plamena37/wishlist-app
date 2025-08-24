import { useState } from 'react'
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

interface EditCardDialogProps {
  card: Card
}

export const EditCardDialog = ({ card }: EditCardDialogProps) => {
  const [openCardId, setOpenCardId] = useState<string | null>(null)

  return (
    <Dialog
      open={openCardId === card.id}
      onOpenChange={(open) => setOpenCardId(open ? card.id : null)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {card.title}</DialogTitle>
        </DialogHeader>
        <EditCardForm
          card={card}
          onClose={() => setOpenCardId(null)}
        />
      </DialogContent>
    </Dialog>
  )
}
