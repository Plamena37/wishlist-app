import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import {
  SignUpWithEmailFormData,
  signUpWithEmailSchema,
} from '@/auth/schemas/auth.schema'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useAuth } from '@/auth/hooks/useAuth'
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

interface SignUpWithEmailFormProps {
  onClose?: () => void
}

export const SignUpWithEmailForm = ({ onClose }: SignUpWithEmailFormProps) => {
  const { t } = useTranslation()
  const { signUpWithEmail, authError, authActionLoading } = useAuth()
  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

  const form = useForm<SignUpWithEmailFormData>({
    resolver: zodResolver(signUpWithEmailSchema(t)),
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const {
    handleSubmit,

    formState: { errors },
  } = form

  const handleSignInWithEmail = async (data: SignUpWithEmailFormData) => {
    const result = await signUpWithEmail(
      data.email,
      data.password,
      data.displayName
    )

    if (result.success) {
      onClose?.()
    }
  }

  const handlePasswordChange = (
    value: string,
    onChange: (v: string) => void
  ) => {
    const noSpaces = value.replace(/\s/g, '')
    onChange(noSpaces)
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

  const toggleHideConfirmPassword = () => {
    setHideConfirmPassword((prev) => !prev)
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
                    {t('auth.form.emailLabel')}
                  </Text>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('auth.form.emailPlaceholder')}
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
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text
                    as="p"
                    variant="body"
                    className="font-semibold text-purple-900 mb-1"
                  >
                    {t('auth.form.displayNameLabel')}
                  </Text>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('auth.form.displayNamePlaceholder')}
                    error={!!errors.displayName}
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
                    {t('auth.form.passwordLabel')}
                  </Text>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder={t('auth.form.passwordPlaceholder')}
                      error={!!errors.password}
                      onChange={(e) =>
                        handlePasswordChange(e.target.value, field.onChange)
                      }
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text
                    as="p"
                    variant="body"
                    className="font-semibold text-purple-900 mb-1"
                  >
                    {t('auth.form.passwordLabelConfirm')}
                  </Text>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder={t('auth.form.passwordPlaceholderConfirm')}
                      error={!!errors.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange(e.target.value, field.onChange)
                      }
                      onPaste={handlePasswordPaste}
                      type={hideConfirmPassword ? 'password' : 'text'}
                    />
                    <FontAwesomeIcon
                      icon={hideConfirmPassword ? faEyeSlash : faEye}
                      className="absolute top-2 right-2 cursor-pointer"
                      style={{ width: '14px' }}
                      onClick={toggleHideConfirmPassword}
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
            className="mt-1 sm:mt-2 w-full"
            size="lg"
            disabled={authActionLoading}
            aria-label="Sign up with Email"
          >
            {authActionLoading && (
              <Icon
                src={Loading}
                size="sm"
                className="animate-spin"
                alt="Loading Icon"
              />
            )}
            {authActionLoading ? t('auth.signingUp') : t('auth.signUp')}
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
