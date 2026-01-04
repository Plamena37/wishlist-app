import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/hooks/useAuth'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { ROUTES } from '@/router/constants/app-routes'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import AccountDropdown from '@/components/account-dropdown/account-dropdown'
import { AccountDropdownLinks } from '@/components/account-dropdown/account-dropdown-links'
import { AuthTrigger } from '@/auth/auth-trigger'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

const navLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.CARDS, label: 'My Cards' },
  { to: ROUTES.FAQ, label: 'FAQ' },
]

const getActiveParent = (pathname: string): string | null => {
  if (pathname === '/') return ROUTES.HOME
  if (pathname.startsWith('/cards')) return ROUTES.CARDS
  if (pathname === '/faq') return ROUTES.FAQ
  return null
}

export const AppHeader = () => {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()
  const links = AccountDropdownLinks()
  const { isSm } = useBreakpoints()
  const [sheetOpen, setSheetOpen] = useState(false)

  const hideNavButtons = !user || !user.displayName
  const activeParent = getActiveParent(pathname)

  const handleCloseSheet = () => {
    setSheetOpen(false)
  }

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

        {isSm ? (
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
              <AuthTrigger>
                <Button
                  className={cn(
                    'hover:text-purple-900 hover:border-purple-900 border-b-1 border-b-transparent transition w-fit p-0 sm:p-0',
                    isSm ? 'text-md' : 'text-sm'
                  )}
                >
                  Sign In
                </Button>
              </AuthTrigger>
            )}
          </ul>
        ) : (
          <Sheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
          >
            <SheetTrigger>
              <FontAwesomeIcon
                icon={faBars}
                className="text-white px-1.5 py-2 hover:bg-purple-900 rounded-full cursor-pointer transition"
              />
            </SheetTrigger>
            <SheetContent>
              <ul className="flex flex-col gap-3 p-6 justify-center items-center h-full">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <SheetClose asChild>
                      <NavLink
                        to={to}
                        className={cn(
                          'hover:text-purple-900 hover:border-purple-900 border-b-2 border-b-transparent transition text-lg',
                          activeParent === to ? 'border-purple-900' : ''
                        )}
                      >
                        {label}
                      </NavLink>
                    </SheetClose>
                  </li>
                ))}

                {!hideNavButtons && (
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      className="hover:text-purple-900 hover:border-purple-900 text-black font-normal border-b-1 border-b-transparent transition w-fit p-0 text-lg"
                      onClick={signOut}
                    >
                      Sign Out
                    </Button>
                  </SheetClose>
                )}

                {hideNavButtons && (
                  <AuthTrigger onCloseSheet={handleCloseSheet}>
                    <Button
                      variant="link"
                      className="hover:text-purple-900 hover:border-purple-900 text-black font-normal border-b-1 border-b-transparent transition w-fit p-0 text-lg"
                    >
                      Sign In
                    </Button>
                  </AuthTrigger>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        )}
      </nav>
    </header>
  )
}
