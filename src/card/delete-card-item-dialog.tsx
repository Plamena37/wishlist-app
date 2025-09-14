import { useState } from 'react'
import { CardItem } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteCardItemDialogProps {
  cardId: string
  item: CardItem
}

export const DeleteCardItemDialog = ({
  cardId,
  item,
}: DeleteCardItemDialogProps) => {
  const { deleteCardItem } = useCardsContext()
  const [deleteCardItemId, setDeleteCardItemId] = useState<string | null>(null)

  const handleCloseDeleteDialog = () => {
    setDeleteCardItemId(null)
  }

  const handleDeleteCardItem = () => {
    deleteCardItem(cardId, item.id)
    handleCloseDeleteDialog()
  }

  return (
    <Dialog
      open={deleteCardItemId === item.id}
      onOpenChange={(open) => setDeleteCardItemId(open ? item.id : null)}
    >
      <DialogTrigger asChild>
        <Button variant="dark"> Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Card Item</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{item.name}"?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setDeleteCardItemId(null)}
          >
            Cancel
          </Button>
          <Button
            variant="dark"
            onClick={handleDeleteCardItem}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
