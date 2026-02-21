import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import GoogleColorfull from '@/assets/google-colorfull.svg'
import Facebook from '@/assets/fb.png'
import { SignInWithEmailForm } from '@/auth/sign-in-with-email-form'
import { SignUpWithEmailForm } from '@/auth/sign-up-with-email-form'

interface SignInOverlay {
  title?: string
  onClose?: () => void
}

export const SignInOverlayDialog = ({ title, onClose }: SignInOverlay) => {
  const { t } = useTranslation()
  const { signInWithGoogle, signInWithFacebook, clearAuthError } = useAuth()
  const { setShowSignInDialog } = useCardsContext()
  const [open, setOpen] = useState(true)
  const [showSignInWithEmail, setShowSignInWithEmail] = useState(true)

  if (!open) return null

  const handleClose = () => {
    setOpen(false)
    setShowSignInDialog(false)
    onClose?.()
    clearAuthError()
  }

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
    handleClose()
  }

  const handleSignInWithFacebook = () => {
    signInWithFacebook()
    handleClose()
  }

  const toggleShowSignInWithEmail = () => {
    setShowSignInWithEmail((prev) => !prev)
    clearAuthError()
  }

  return (
    <>
      <Text className="text-base sm:text-lg font-semibold text-center sm:text-left px-5 sm:px-0 leading-4 w-full">
        {(title ?? showSignInWithEmail)
          ? t('auth.signInToContinue')
          : t('auth.signUpToContinue')}
      </Text>

      <div className="w-full flex flex-col items-center">
        {showSignInWithEmail ? (
          <SignInWithEmailForm onClose={handleClose} />
        ) : (
          <SignUpWithEmailForm onClose={handleClose} />
        )}

        <Button
          onClick={toggleShowSignInWithEmail}
          variant="link"
          className="text-xs sm:py-0"
          aria-label="Toggle Sign in or up form"
        >
          {showSignInWithEmail
            ? t('auth.dontHaveAccount')
            : t('auth.haveAccount')}
        </Button>

        <div className="flex gap-2 justify-center items-center w-full pt-2">
          <div className="border-b-2 border-b-gray-300 w-full"></div>
          <Text className="text-xs text-gray-800 font-medium">
            {t('auth.or')}
          </Text>
          <div className="border-b-2 border-b-gray-300 w-full"></div>
        </div>
      </div>

      <Button
        variant="primary"
        className={cn(
          'p-4 rounded-full bg-gray-50 w-full hover:bg-gray-300 justify-center'
        )}
        onClick={handleSignInWithGoogle}
        aria-label="Continue with Google button"
      >
        <Icon
          src={GoogleColorfull}
          style={{
            width: '20px',
            height: '20px',
          }}
          alt="Google Icon"
        />

        <Text
          as="p"
          variant="body"
          className="text-purple-900 font-semibold"
        >
          {t('auth.continueWithGoogle')}
        </Text>
      </Button>

      <Button
        variant="primary"
        className={cn(
          'p-4 rounded-full bg-gray-50 w-full hover:bg-gray-300  justify-center'
        )}
        onClick={handleSignInWithFacebook}
        aria-label="Continue with Facebook button"
      >
        <Icon
          src={Facebook}
          style={{
            width: '20px',
            height: '20px',
          }}
          alt="Facebook Icon"
        />

        <Text
          as="p"
          variant="body"
          className="text-purple-900 font-semibold"
        >
          {t('auth.continueWithFacebook')}
        </Text>
      </Button>
    </>
  )
}
