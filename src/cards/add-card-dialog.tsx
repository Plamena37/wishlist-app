import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { useTranslation } from '@/lib/hooks/useTranslation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AddCardForm } from '@/cards/add-card-form'
import { Text } from '@/components/ui/text'
import { SignInOverlay } from '@/components/overlay/sign-in-overlay'

interface AddCardDialogProps {
  onClose?: () => void
}

export const AddCardDialog = ({ onClose }: AddCardDialogProps) => {
  const { isCreateCardDialogOpen, toggleCreateCardDialog } = useCardsContext()
  const { user } = useAuth()
  const { t } = useTranslation()

  const handleOpenChange = (nextOpen: boolean) => {
    if (!user || !user.displayName) {
      toggleCreateCardDialog(false)
      return
    }

    if (!nextOpen) onClose?.()
    toggleCreateCardDialog(nextOpen)
  }

  const isAuthenticated = user?.displayName && user

  return (
    <Dialog
      open={isCreateCardDialogOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto mt-4 mr-4"
          aria-label="Add new wishlist"
        >
          <Text
            variant="body"
            className="font-medium"
          >
            {t('wishlistActions.createWishlist')}
          </Text>
        </Button>
      </DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle> {t('wishlistActions.createWishlist')}</DialogTitle>
        </DialogHeader>
        {isAuthenticated ? (
          <AddCardForm onClose={handleOpenChange} />
        ) : (
          <SignInOverlay />
        )}
      </DialogContent>
    </Dialog>
  )
}
