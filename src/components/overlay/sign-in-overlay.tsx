import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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

export const SignInOverlay = ({ title, onClose }: SignInOverlay) => {
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

  const titleCheck =
    title ??
    (showSignInWithEmail
      ? t('auth.signInToContinue')
      : t('auth.signUpToContinue'))

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-999">
      <div className="bg-gray-200 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-1.5rem)] translate-x-[-50%] translate-y-[-50%] gap-2 sm:gap-4 rounded-lg sm:p-6 p-4 shadow-lg justify-center items-center flex flex-col sm:max-w-104">
        <Text className="text-base sm:text-lg font-semibold text-center sm:text-left px-5 sm:px-0 leading-4 w-full">
          {titleCheck}
        </Text>

        <FontAwesomeIcon
          icon={faXmark}
          className="fixed top-5 sm:top-4 right-4 text-black-50 z-50 cursor-pointer"
          onClick={handleClose}
        />

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
            {t('auth.continueWithGoogle')}
          </Text>
        </Button>

        <Button
          variant="primary"
          className={cn(
            'p-4 rounded-full bg-gray-50 w-full hover:bg-gray-300  justify-center'
          )}
          onClick={handleSignInWithFacebook}
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
            {t('auth.continueWithFacebook')}
          </Text>
        </Button>
      </div>
    </div>
  )
}
