import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import GoogleColorfull from '@/assets/google-colorfull.svg'
import Facebook from '@/assets/fb.png'

interface AuthModalProps {
  onCloseSheet?: () => void
}

export const AuthModal = ({ onCloseSheet }: AuthModalProps) => {
  const { signInWithGoogle, signInWithFacebook } = useAuth()

  const handleGoogleSignIn = async () => {
    await signInWithGoogle()
    onCloseSheet?.()
  }

  const handleFacebookSignIn = async () => {
    await signInWithFacebook()
    onCloseSheet?.()
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
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
