import { Link } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { Button } from '@/components/ui/button'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '@/firebase.config'
import { useAuth } from '@/auth/hooks/useAuth'

const HomePage = () => {
  const { user } = useAuth()

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

  return (
    <div className="bg-purple-50 flex gap-4 justify-center items-center p-6">
      <h2>Home</h2>

      <Link to={ROUTES.CARDS}>Go to Cards</Link>
      <Button
        variant="outline"
        className="p-2"
        onClick={handleButtonClick}
      >
        {signInButtonText}
      </Button>

      {user && (
        <>
          <img
            src={user.photoURL || ''}
            alt={user.displayName || 'User'}
            className="w-10 h-10 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <p>Welcome, {user.displayName || 'User'}!</p>
        </>
      )}
    </div>
  )
}

export default HomePage
