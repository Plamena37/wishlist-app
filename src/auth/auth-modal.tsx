import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import GoogleColorfull from '@/assets/google-colorfull.svg'
import Facebook from '@/assets/fb.png'
import { SignInWithEmailForm } from './sign-in-with-email-form'
import { SignUpWithEmailForm } from './sign-up-with-email-form'

interface AuthModalProps {
  onCloseSheet?: () => void
}

export const AuthModal = ({ onCloseSheet }: AuthModalProps) => {
  const { signInWithGoogle, signInWithFacebook, clearAuthError } = useAuth()
  const [showSignInWithEmail, setShowSignInWithEmail] = useState(true)

  const handleGoogleSignIn = async () => {
    await signInWithGoogle()
    onCloseSheet?.()
  }

  const handleFacebookSignIn = async () => {
    await signInWithFacebook()
    onCloseSheet?.()
  }

  const toggleShowSignInWithEmail = () => {
    setShowSignInWithEmail((prev) => !prev)
    clearAuthError()
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="w-full flex flex-col items-center">
        {showSignInWithEmail ? (
          <SignInWithEmailForm />
        ) : (
          <SignUpWithEmailForm />
        )}

        <Button
          onClick={toggleShowSignInWithEmail}
          variant="link"
          className="text-xs sm:py-0"
        >
          {showSignInWithEmail
            ? 'Don\'t have an account? Sign up'
            : 'Have an account? Sign In'}
        </Button>

        <div className="flex gap-2 justify-center items-center w-full pt-2">
          <div className="border-b-2 border-b-gray-300 w-full"></div>
          <Text className="text-xs text-gray-800 font-medium">OR</Text>
          <div className="border-b-2 border-b-gray-300 w-full"></div>
        </div>
      </div>

      <Button
        variant="primary"
        className={cn(
          'p-4 rounded-full bg-gray-50 w-full max-w-56 hover:bg-gray-300 justify-start'
        )}
        onClick={handleGoogleSignIn}
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
          Continue with Google
        </Text>
      </Button>

      <Button
        variant="primary"
        className={cn(
          'p-4 rounded-full bg-gray-50 w-full max-w-56 hover:bg-gray-300 justify-start'
        )}
        onClick={handleFacebookSignIn}
      >
        <Icon
          src={Facebook}
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
          Continue with Facebook
        </Text>
      </Button>
    </div>
  )
}
