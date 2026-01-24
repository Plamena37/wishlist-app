import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useAuth } from '@/auth/hooks/useAuth'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { ROUTES } from '@/router/constants/app-routes'
import logo from '@/assets/logo.png'
import { Button } from '@/components/ui/button'
import AccountDropdown from '@/components/account-dropdown/account-dropdown'
import { AccountDropdownLinks } from '@/components/account-dropdown/account-dropdown-links'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'
import {
  LanguageSwitcher,
  MobileLanguageSwitcher,
} from '@/components/language-switcher/language-switcher'
import { SignInOverlay } from '@/components/overlay/sign-in-overlay'
import { SignInOverlayDialog } from '@/components/overlay/sign-in-overlay-dialog'

const getActiveParent = (pathname: string): string | null => {
  if (pathname === '/') return ROUTES.HOME
  if (pathname.startsWith('/cards')) return ROUTES.CARDS
  if (pathname === '/faq') return ROUTES.FAQ
  return null
}

export const AppHeader = () => {
  const { t } = useTranslation()
  const { user, signOut, isUserSignedIn, authProviderActionLoading } = useAuth()
  const { pathname } = useLocation()
  const links = AccountDropdownLinks()
  const { isSm } = useBreakpoints()

  const [sheetOpen, setSheetOpen] = useState(false)
  const [openSignInOverlay, setOpenSignInOverlay] = useState(false)

  const navLinks = [
    { to: ROUTES.HOME, label: t('navigation.home') },
    { to: ROUTES.CARDS, label: t('navigation.myCards') },
    { to: ROUTES.FAQ, label: t('navigation.faq') },
  ]

  const hideNavButtons = !user || !user.displayName
  const activeParent = getActiveParent(pathname)

  const handleOpenSignInOverlay = () => {
    setOpenSignInOverlay((prev) => !prev)
  }

  const handleCloseSignInOverlay = () => {
    setOpenSignInOverlay(false)
  }

  const handleCloseSheet = () => {
    setSheetOpen(false)
  }

  useEffect(() => {
    if (!sheetOpen) {
      setOpenSignInOverlay(false)
    }
  }, [sheetOpen])

  useEffect(() => {
    if (isUserSignedIn) {
      setSheetOpen(false)
    }
  }, [isUserSignedIn])

  if (authProviderActionLoading) {
    return (
      <LoadingOverlay
        title={t('auth.loggingIn')}
        subtitle={t('loading.loadingRequest')}
      />
    )
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 left-0 bg-purple-800 text-white flex items-center justify-between h-14 shrink-0 w-full shadow-sm z-50',
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
                <Button
                  className={cn(
                    'hover:text-purple-900 hover:border-purple-900 border-b-1 border-b-transparent transition w-fit p-0 sm:p-0',
                    isSm ? 'text-md' : 'text-sm'
                  )}
                  onClick={handleOpenSignInOverlay}
                >
                  {t('navigation.signIn')}
                </Button>
              )}

              <li>
                <LanguageSwitcher />
              </li>
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
                <SheetDescription className="sr-only">
                  <SheetTitle />
                </SheetDescription>
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
                        {t('navigation.signOut')}
                      </Button>
                    </SheetClose>
                  )}

                  {hideNavButtons && (
                    <Dialog
                      open={openSignInOverlay}
                      onOpenChange={handleOpenSignInOverlay}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="hover:text-purple-900 hover:border-purple-900 text-black font-normal border-b-1 border-b-transparent transition w-fit p-0 text-lg"
                        >
                          {t('navigation.signIn')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent
                        onKeyDown={(e) => e.stopPropagation()}
                        onKeyUp={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        className="gap-2 sm:gap-4"
                      >
                        <DialogHeader className="sr-only">
                          <DialogTitle />
                        </DialogHeader>
                        <SignInOverlayDialog />
                      </DialogContent>
                    </Dialog>
                  )}

                  <li>
                    <MobileLanguageSwitcher onClose={handleCloseSheet} />
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          )}
        </nav>
      </header>

      {openSignInOverlay && isSm && (
        <SignInOverlay onClose={handleCloseSignInOverlay} />
      )}
    </>
  )
}
