import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SignUpWithEmailFormData,
  signUpWithEmailSchema,
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

interface SignUpWithEmailFormProps {
  onClose?: () => void
}

export const SignUpWithEmailForm = ({ onClose }: SignUpWithEmailFormProps) => {
  const { signUpWithEmail, authError, authActionLoading } = useAuth()

  const form = useForm<SignUpWithEmailFormData>({
    resolver: zodResolver(signUpWithEmailSchema),
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
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Text
                    as="p"
                    variant="body"
                    className="font-semibold text-purple-900 mb-1"
                  >
                    Display Name
                  </Text>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Name"
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
                    Confirm Password
                  </Text>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    error={!!errors.confirmPassword}
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
            {authActionLoading ? 'Signing up…' : 'Sign up'}
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
