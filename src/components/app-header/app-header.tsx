import { Link, NavLink, useLocation } from 'react-router'
import { useAuth } from '@/auth/hooks/useAuth'
import { ROUTES } from '@/router/constants/app-routes'
import GoogleColorfull from '@/assets/google-colorfull.svg'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import AccountDropdown from '@/components/account-dropdown/account-dropdown'
import { AccountDropdownLinks } from '@/components/account-dropdown/account-dropdown-links'
import { Icon } from '@/components/ui/icon'

const navLinks = [
  { to: ROUTES.CARDS, label: 'Home' },
  { to: ROUTES.MY_CARDS, label: 'My Cards' },
]

const getActiveParent = (pathname: string): string | null => {
  if (pathname.startsWith('/my-cards')) return ROUTES.MY_CARDS
  if (pathname.startsWith('/cards')) return ROUTES.CARDS
  return null
}

export const AppHeader = () => {
  const { user, signInWithGoogle } = useAuth()
  const { pathname } = useLocation()
  const links = AccountDropdownLinks()

  const hideNavButtons = !user || !user.displayName
  const activeParent = getActiveParent(pathname)

  return (
    <header className="bg-purple-800 text-white flex items-center justify-between h-14 w-full shadow-sm ">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to={ROUTES.HOME}>
          <Text
            variant="h3"
            className="text-white font-semibold cursor-pointer"
            weight="semibold"
          >
            Wishlist App
          </Text>
        </Link>

        <ul className="flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={cn(
                  'hover:text-purple-900 hover:border-purple-900 border-b-2 border-b-transparent transition',
                  activeParent === to ? 'border-purple-900' : ''
                )}
              >
                {label}
              </NavLink>
            </li>
          ))}

          {!hideNavButtons && <AccountDropdown links={links} />}

          {hideNavButtons && (
            <Button
              variant="primary"
              className="py-4 px-4 rounded-full bg-gray-50 w-auto"
              onClick={signInWithGoogle}
            >
              <Icon
                src={GoogleColorfull}
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />

              <Text
                as="p"
                variant="body"
                className="text-purple-900 font-semibold"
              >
                Sign In With Google
              </Text>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  )
}
