import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SignInWithEmailFormData,
  signInWithEmailSchema,
} from './schemas/auth.schema'
import { useAuth } from './hooks/useAuth'
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

interface SignInWithEmailFormProps {
  onClose?: () => void
}

export const SignInWithEmailForm = ({ onClose }: SignInWithEmailFormProps) => {
  const { signInWithEmail, authActionLoading, authError } = useAuth()

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
                  <Input
                    placeholder="Enter Password"
                    error={!!errors.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-normal" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="mt-2 w-full"
            disabled={authActionLoading}
          >
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
