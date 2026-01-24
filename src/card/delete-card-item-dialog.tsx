import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '@/lib/hooks/useTranslation'
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
  const { t } = useTranslation()
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
            {t('common.delete')}
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('editWishes.deleteWish')}</DialogTitle>
        </DialogHeader>
        <Text variant="h5">
          {t('editWishes.deleteConf')}
          <Text
            variant="h5"
            weight="semibold"
          >
            “{item.name}”
          </Text>{' '}
          ?
        </Text>
        <div className="flex justify-center sm:justify-end gap-2 sm:mt-4 mt-1">
          <DialogClose asChild>
            <Button variant="outline">{t('common.cancel')}</Button>
          </DialogClose>
          <Button
            variant="dark"
            onClick={handleDeleteCardItem}
          >
            {t('common.delete')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
