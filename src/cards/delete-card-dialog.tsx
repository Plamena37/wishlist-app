import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
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
import { Text } from '@/components/ui/text'

interface DeleteCardDialogProps {
  card: Card
}

export const DeleteCardDialog = ({ card }: DeleteCardDialogProps) => {
  const { removeCard } = useCardsContext()
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()

  const [deleteCardId, setDeleteCardId] = useState<string | null>(null)

  const handleCloseDeleteDialog = () => {
    setDeleteCardId(null)
  }

  const handleDeleteCard = () => {
    if (!deleteCardId) return
    removeCard(deleteCardId)
    handleCloseDeleteDialog()
    if (cardId && cardId === deleteCardId) {
      navigate(-1)
    }
  }

  return (
    <Dialog
      open={deleteCardId === card.id}
      onOpenChange={(open) => setDeleteCardId(open ? card.id : null)}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-600/10"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Card</DialogTitle>
        </DialogHeader>
        <Text variant="h5">
          Are you sure you want to delete "{card.title}"?
        </Text>
        <div className="flex justify-center sm:justify-end gap-2 sm:mt-4 mt-1">
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
