import { useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

interface DeleteCardDialogProps {
  card: Card
  onMenuClose: () => void
}

export const DeleteCardDialog = ({
  card,
  onMenuClose,
}: DeleteCardDialogProps) => {
  const { removeCard } = useCardsContext()
  const { cardId } = useParams<{ cardId: string }>()
  const navigate = useNavigate()

  const handleDeleteCard = () => {
    if (!card.id) return
    removeCard(card.id)
    if (cardId && cardId === card.id) {
      navigate(-1)
    }
  }

  const handleCloseMenu = (open: boolean) => {
    if (!open) onMenuClose()
  }

  return (
    <Dialog onOpenChange={(open) => handleCloseMenu(open)}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="sm:px-0 text-red-600 border-red-600 hover:text-red-600 justify-start"
        >
          <FontAwesomeIcon icon={faTrash} />
          <Text
            variant="body"
            className="text-red-600 font-medium"
          >
            Delete
          </Text>
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
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
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
