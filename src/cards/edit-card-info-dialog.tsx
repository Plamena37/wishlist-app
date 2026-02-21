import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
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
import { EditCardInfoForm } from '@/cards/edit-card-info-form'
import { Text } from '@/components/ui/text'

interface EditCardInfoDialogProps {
  card: Card
  onMenuClose: () => void
}

export const EditCardInfoDialog = ({
  card,
  onMenuClose,
}: EditCardInfoDialogProps) => {
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
          aria-label="Edit wishlist"
        >
          <FontAwesomeIcon
            icon={faPencil}
            className="text-purple-800"
          />
          <Text
            variant="body"
            className="text-purple-900 font-medium"
          >
            {t('wishlistActions.editWishlist')}
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>
            {t('common.edit')} {card.title}
          </DialogTitle>
        </DialogHeader>
        <EditCardInfoForm
          card={card}
          onClose={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  )
}
