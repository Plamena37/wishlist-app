import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { CardItem } from '@/lib/types/Cards'
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

interface DeleteCardItemDialogProps {
  cardId: string
  item: CardItem
  onMenuClose: () => void
}

export const DeleteCardItemDialog = ({
  cardId,
  item,
  onMenuClose,
}: DeleteCardItemDialogProps) => {
  const { deleteCardItem } = useCardsContext()

  const handleDeleteCardItem = () => {
    deleteCardItem(cardId, item.id)
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
          <DialogTitle>Delete Card Item</DialogTitle>
        </DialogHeader>
        <Text variant="h5">Are you sure you want to delete "{item.name}"?</Text>
        <div className="flex justify-center sm:justify-end gap-2 sm:mt-4 mt-1">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
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
