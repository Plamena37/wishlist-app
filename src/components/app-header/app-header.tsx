import { Link, NavLink, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/hooks/useAuth'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { ROUTES } from '@/router/constants/app-routes'
import GoogleColorfull from '@/assets/google-colorfull.svg'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import AccountDropdown from '@/components/account-dropdown/account-dropdown'
import { AccountDropdownLinks } from '@/components/account-dropdown/account-dropdown-links'
import { Icon } from '@/components/ui/icon'

const navLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.CARDS, label: 'Cards' },
  { to: ROUTES.MY_CARDS, label: 'My Cards' },
]

const getActiveParent = (pathname: string): string | null => {
  if (pathname === '/') return ROUTES.HOME
  if (pathname.startsWith('/my-cards')) return ROUTES.MY_CARDS
  if (pathname.startsWith('/cards')) return ROUTES.CARDS
  return null
}

export const AppHeader = () => {
  const { user, signInWithGoogle } = useAuth()
  const { pathname } = useLocation()
  const links = AccountDropdownLinks()
  const { isSm } = useBreakpoints()

  const hideNavButtons = !user || !user.displayName
  const activeParent = getActiveParent(pathname)

  return (
    <header
      className={cn(
        'bg-purple-800 text-white flex items-center justify-between h-14 shrink-0 w-full shadow-sm z-50',
        isSm ? 'px-4' : 'px-2'
      )}
    >
      <nav className="container mx-auto flex items-center justify-between">
        <Link to={ROUTES.HOME}>
          <img
            src={logo}
            alt="App Logo"
            className={cn(isSm ? 'max-w-40' : 'w-24')}
          />
        </Link>

        <ul className={cn('flex items-center', isSm ? 'gap-6' : 'gap-3')}>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={cn(
                  'hover:text-purple-900 hover:border-purple-900 border-b-2 border-b-transparent transition',
                  activeParent === to ? 'border-purple-900' : '',
                  isSm ? 'text-md' : 'text-sm'
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
              className={cn(
                'py-4 rounded-full bg-gray-50 w-auto hover:bg-gray-300',
                isSm ? 'px-4' : 'px-1.5'
              )}
              onClick={signInWithGoogle}
            >
              <Icon
                src={GoogleColorfull}
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />

              {isSm && (
                <Text
                  as="p"
                  variant="body"
                  className="text-purple-900 font-semibold"
                >
                  Sign In With Google
                </Text>
              )}
            </Button>
          )}
        </ul>
      </nav>
    </header>
  )
}
