import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import {
  SignInWithEmailFormData,
  signInWithEmailSchema,
} from './schemas/auth.schema'
import { useAuth } from './hooks/useAuth'
import Loading from '@/assets/loading-purple.svg'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

interface SignInWithEmailFormProps {
  onClose?: () => void
}

export const SignInWithEmailForm = ({ onClose }: SignInWithEmailFormProps) => {
  const { signInWithEmail, authActionLoading, authError } = useAuth()
  const [hidePassword, setHidePassword] = useState(true)

  const form = useForm<SignInWithEmailFormData>({
    resolver: zodResolver(signInWithEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const handleSignInWithEmail = async (data: SignInWithEmailFormData) => {
    const result = await signInWithEmail(data.email, data.password)

    if (result.success) {
      onClose?.()
    }
  }

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault()
    }
  }

  const handlePasswordPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text')
    if (pasted.includes(' ')) {
      e.preventDefault()
    }
  }

  const toggleHidePassword = () => {
    setHidePassword((prev) => !prev)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSignInWithEmail)}
        className="w-full"
      >
        <div className="grid grid-cols-[1fr]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text
                    as="p"
                    variant="body"
                    className="font-semibold text-purple-900 mb-1"
                  >
                    Email
                  </Text>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Email"
                    error={!!errors.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text
                    as="p"
                    variant="body"
                    className="font-semibold text-purple-900 mb-1"
                  >
                    Password
                  </Text>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter Password"
                      error={!!errors.password}
                      onKeyDown={handlePasswordKeyDown}
                      onPaste={handlePasswordPaste}
                      type={hidePassword ? 'password' : 'text'}
                    />
                    <FontAwesomeIcon
                      icon={hidePassword ? faEyeSlash : faEye}
                      className="absolute top-2 right-2 cursor-pointer"
                      style={{ width: '14px' }}
                      onClick={toggleHidePassword}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-600 font-normal" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="mt-2 w-full"
            size="lg"
            disabled={authActionLoading}
          >
            {authActionLoading && (
              <Icon
                src={Loading}
                size="sm"
                className="animate-spin"
              />
            )}

            {authActionLoading ? 'Signing in…' : 'Sign in'}
          </Button>

          {authError && (
            <Text
              variant="body-sm"
              className="text-red-600 my-1"
            >
              {authError}
            </Text>
          )}
        </div>
      </form>
    </Form>
  )
}
