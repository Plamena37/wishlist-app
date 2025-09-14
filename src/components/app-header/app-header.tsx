import { NavLink, useLocation } from 'react-router'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/firebase.config'
import { useAuth } from '@/auth/hooks/useAuth'
import { ROUTES } from '@/router/constants/app-routes'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

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
  const { user } = useAuth()
  const { pathname } = useLocation()

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  const signInButtonText =
    !user || user.isAnonymous ? 'Sign In With Google' : 'Sign Out'
  const handleButtonClick =
    !user || user.isAnonymous ? handleGoogleSignIn : handleSignOut

  const activeParent = getActiveParent(pathname)

  return (
    <header className="w-full border-b shadow-sm bg-white">
      <nav className="container mx-auto flex items-center justify-between p-2">
        <Text
          variant="h3"
          weight="semibold"
        >
          Wishlist App
        </Text>
        <ul className="flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={() =>
                  `hover:text-blue-600 transition ${
                    activeParent === to ? 'font-semibold text-blue-600' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="flex gap-2 items-center">
            {user && (
              <>
                <img
                  src={user.photoURL || ''}
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <p>{user.displayName || 'User'}</p>
              </>
            )}
            <Button
              variant="outline"
              className="p-2 ml-4"
              onClick={handleButtonClick}
            >
              {signInButtonText}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
