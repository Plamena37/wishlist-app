import { z } from 'zod'

// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
// password: z
//   .string()
//   .min(8, 'Password must be at least 8 characters')
//   .regex(
//     passwordRegex,
//     'Password must contain a letter, a number, and a symbol'
//   ),

export const signInWithEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Za-z]/, 'Must contain a letter')
    .regex(/\d/, 'Must contain a number')
    .regex(/[^\w\s]/, 'Must contain a symbol'),
})

export const signUpWithEmailSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    displayName: z
      .string()
      .min(2, 'Display name must be at least 2 characters')
      .max(50, 'Display name is too long'),
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/[A-Za-z]/, 'Must contain a letter')
      .regex(/\d/, 'Must contain a number')
      .regex(/[^\w\s]/, 'Must contain a symbol'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type SignInWithEmailFormData = z.infer<typeof signInWithEmailSchema>

export type SignUpWithEmailFormData = z.infer<typeof signUpWithEmailSchema>
