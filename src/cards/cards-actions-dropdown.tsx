import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { Card } from '@/lib/types/Cards'
import { EditCardDialog } from '@/cards/edit-card-dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { DeleteCardDialog } from '@/cards/delete-card-dialog'
import { Button } from '@/components/ui/button'

interface CardsActionsDropdown {
  card: Card
  className?: string
  btnBgColor?: string
}

export const CardsActionsDropdown = ({
  card,
  className,
  btnBgColor = 'bg-gray-200',
}: CardsActionsDropdown) => {
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
          <EditCardDialog
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
