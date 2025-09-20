import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { Card, CardItem } from '@/lib/types/Cards'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { EditCardItemDialog } from '@/card/edit-card-item-dialog'
import { DeleteCardItemDialog } from '@/card/delete-card-item-dialog'

interface CardActionsDropdown {
  card: Card
  item: CardItem
  className?: string
  btnBgColor?: string
}

const CardActionsDropdown = ({
  card,
  item,
  className,
  btnBgColor = 'bg-gray-200',
}: CardActionsDropdown) => {
  const { isSm } = useBreakpoints()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCloseMenu = () => {
    setMenuOpen(false)
  }

  const handleOpenMenu = () => {
    setMenuOpen(true)
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
          isSm ? 'w-42' : 'w-28'
        )}
      >
        <DropdownMenuItem
          className="hover:bg-muted"
          onSelect={(e) => e.preventDefault()}
        >
          <EditCardItemDialog
            card={card}
            item={item}
            onMenuClose={handleCloseMenu}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-muted"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteCardItemDialog
            cardId={card.id}
            item={item}
            onMenuClose={handleCloseMenu}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CardActionsDropdown
