import { useState } from 'react'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteCardDialogProps {
  card: Card
}

export const DeleteCardDialog = ({ card }: DeleteCardDialogProps) => {
  const { removeCard } = useCardsContext()
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null)

  const handleCloseDeleteDialog = () => {
    setDeleteCardId(null)
  }

  const handleDeleteCard = () => {
    if (!deleteCardId) return
    removeCard(deleteCardId)
    handleCloseDeleteDialog()
  }

  return (
    <Dialog
      open={deleteCardId === card.id}
      onOpenChange={(open) => setDeleteCardId(open ? card.id : null)}
    >
      <DialogTrigger asChild>
        <Button variant="dark">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{card.title}"?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setDeleteCardId(null)}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={handleDeleteCard}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
