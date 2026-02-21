import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faShare } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/useTranslation'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { useAppSnackbar } from '@/lib/hooks/useAppSnackbar'
import { ROUTES } from '@/router/constants/app-routes'
import { Card } from '@/lib/types/Cards'
import { EditCardInfoDialog } from '@/cards/edit-card-info-dialog'
import { EditCardItemsDialog } from '@/cards/edit-card-items-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { DeleteCardDialog } from '@/cards/delete-card-dialog'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

interface CardsActionsDropdown {
  card: Card
  className?: string
  btnBgColor?: string
  isCardMine: boolean
}

export const CardsActionsDropdown = ({
  card,
  className,
  btnBgColor = 'bg-gray-200',
  isCardMine,
}: CardsActionsDropdown) => {
  const { t } = useTranslation()
  const { isSm } = useBreakpoints()
  const { showSuccess } = useAppSnackbar()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  const handleOpenMenu = () => {
    setMenuOpen(true)
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/#${ROUTES.CARDS}/${card.id}`
    navigator.clipboard.writeText(link)
    showSuccess(t('successMessages.wishlistLinkCopied'))
    handleCloseMenu()
  }

  return (
    <DropdownMenu
      open={menuOpen}
      onOpenChange={setMenuOpen}
    >
      <DropdownMenuTrigger
        asChild
        className={className}
      >
        <Button
          variant="ghost"
          className={`w-auto sm:px-1.5 sm:py-3.5 rounded-full hover:${btnBgColor}`}
          aria-label="Card actions menu"
        >
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="text-purple-900"
            style={{ width: '16px', height: '16px' }}
            onClick={handleOpenMenu}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        className={cn(
          'p-0 text-blue-900 bg-white text-left',
          isSm ? 'w-52' : 'w-46'
        )}
      >
        <DropdownMenuItem
          className="hover:bg-muted"
          onSelect={(e) => e.preventDefault()}
        >
          <Button
            variant="ghost"
            className="sm:px-0 justify-start"
            onClick={handleCopyLink}
            aria-label="Copy wishlist link"
          >
            <FontAwesomeIcon
              icon={faShare}
              className="text-purple-800"
            />
            <Text
              variant="body"
              className="text-purple-900 font-medium"
            >
              {t('wishlistActions.copyLink')}
            </Text>
          </Button>
        </DropdownMenuItem>

        {isCardMine && (
          <>
            <DropdownMenuItem
              className="hover:bg-muted"
              onSelect={(e) => e.preventDefault()}
            >
              <EditCardInfoDialog
                card={card}
                onMenuClose={handleCloseMenu}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:bg-muted"
              onSelect={(e) => e.preventDefault()}
            >
              <EditCardItemsDialog
                card={card}
                onMenuClose={handleCloseMenu}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="hover:bg-muted"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteCardDialog
                card={card}
                onMenuClose={handleCloseMenu}
              />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
