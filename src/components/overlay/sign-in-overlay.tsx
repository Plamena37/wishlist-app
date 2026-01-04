import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import GoogleColorfull from '@/assets/google-colorfull.svg'
import Facebook from '@/assets/fb.png'

export const SignInOverlay = () => {
  const { signInWithGoogle, signInWithFacebook } = useAuth()
  const { setShowSignInDialog } = useCardsContext()
  const [open, setOpen] = useState(true)

  if (!open) return null

  const handleClose = () => {
    setOpen(false)
    setShowSignInDialog(false)
  }

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
    handleClose()
  }

  const handleSignInWithFacebook = () => {
    signInWithFacebook()
    handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-lg"
      data-testid="loading-overlay-container"
    >
      <div className="bg-gray-200 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg sm:p-6 p-4 shadow-lg justify-center items-center flex flex-col sm:max-w-96">
        <Text className="text-base sm:text-lg font-semibold text-center sm:text-left mb-2 px-5 sm:px-0 leading-6 w-full">
          Sign in to continue ✨
        </Text>

        <FontAwesomeIcon
          icon={faXmark}
          className="fixed top-5 sm:top-4 right-4 text-black-50 z-50 cursor-pointer"
          onClick={handleClose}
        />

        <Button
          variant="primary"
          className={cn(
            'p-4 rounded-full bg-gray-50 w-full max-w-56 hover:bg-gray-300 justify-start'
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
            Continue with Google
          </Text>
        </Button>

        <Button
          variant="primary"
          className={cn(
            'p-4 rounded-full bg-gray-50 w-full max-w-56 hover:bg-gray-300 justify-start'
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
            Continue with Facebook
          </Text>
        </Button>
      </div>
    </div>
  )
}
