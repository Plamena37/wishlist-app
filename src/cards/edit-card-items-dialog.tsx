import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Card } from '@/lib/types/Cards'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { EditCardItemsForm } from '@/cards/edit-card-items-form'

interface EditCardItemsDialogProps {
  card: Card
  onMenuClose: () => void
}

export const EditCardItemsDialog = ({
  card,
  onMenuClose,
}: EditCardItemsDialogProps) => {
  const { t } = useTranslation()
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
          aria-label="Edit wishes"
        >
          <FontAwesomeIcon
            icon={faGift}
            className="text-purple-800"
          />
          <Text
            variant="body"
            className="text-purple-900 font-medium"
          >
            {t('wishlistActions.editWishes')}
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>{t('editWishes.title')}</DialogTitle>
        </DialogHeader>
        <EditCardItemsForm
          card={card}
          onClose={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}
