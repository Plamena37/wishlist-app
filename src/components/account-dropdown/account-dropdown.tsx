import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '@/auth/hooks/useAuth'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AccountDropdownLink } from './account-dropdown-links'

// const getUserInitials = (displayName?: string): string => {
//   if (displayName) {
//     const [firstName, lastName] = displayName.split(' ')
//     return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
//   }
//   return 'CC'
// }

interface AccountDropdownProps {
  className?: string
  links: AccountDropdownLink[]
}

const AccountDropdown = ({ links }: AccountDropdownProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // const userInitials = getUserInitials(user?.displayName || '')

  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    link: AccountDropdownLink
  ) => {
    e.preventDefault()
    if (link.onClick) {
      link.onClick()
    } else {
      navigate(link.href)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user && (
          <img
            src={user.photoURL || ''}
            alt={user.displayName || 'User'}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            referrerPolicy="no-referrer"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        className="p-0 w-42 text-blue-900 bg-white"
        data-testid="account-dropdown-menu"
      >
        {links.map((link) => (
          <DropdownMenuItem
            key={link.label}
            disabled={link.disabled}
            className="py-0 px-0 hover:bg-muted"
            data-testid={link.testid}
          >
            <Button
              variant="ghost"
              onClick={(e) => handleLinkClick(e, link)}
              disabled={link.disabled}
              className="disabled:opacity-100 flex text-blue-900 text-sm font-normal items-center justify-start gap-0 h-[35px] px-4 w-full"
              data-testid={`link-${link.testid}`}
            >
              <FontAwesomeIcon
                icon={link.icon}
                className={cn(
                  'text-purple-900 mr-2',
                  link.disabled ? 'opacity-100 text-gray-500' : ''
                )}
                data-testid={`icon-${link.testid}`}
              />
              <span className="text-purple-900">{link.label}</span>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
