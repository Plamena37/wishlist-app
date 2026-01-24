import { z } from 'zod'

// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
// password: z
//   .string()
//   .min(8, 'Password must be at least 8 characters')
//   .regex(
//     passwordRegex,
//     'Password must contain a letter, a number, and a symbol'
//   ),

export const signInWithEmailSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t('formValidation.auth.invalidEmail')),
    password: z
      .string()
      .min(8, t('formValidation.auth.passwordMin'))
      .regex(/[A-Za-z]/, t('formValidation.auth.passwordLetter'))
      .regex(/\d/, t('formValidation.auth.passwordNumber'))
      .regex(/[^\w\s]/, t('formValidation.auth.passwordSymbol')),
  })

export const signUpWithEmailSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z.string().email(t('formValidation.auth.invalidEmail')),
      displayName: z
        .string()
        .min(2, t('formValidation.auth.displayNameMin'))
        .max(50, t('formValidation.auth.displayNameMax')),
      password: z
        .string()
        .min(8, t('formValidation.auth.passwordMin'))
        .regex(/[A-Za-z]/, t('formValidation.auth.passwordLetter'))
        .regex(/\d/, t('formValidation.auth.passwordNumber'))
        .regex(/[^\w\s]/, t('formValidation.auth.passwordSymbol')),
      confirmPassword: z
        .string()
        .min(1, t('formValidation.auth.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('formValidation.auth.passwordsDoNotMatch'),
    })

export type SignInWithEmailFormData = z.infer<
  ReturnType<typeof signInWithEmailSchema>
>

export type SignUpWithEmailFormData = z.infer<
  ReturnType<typeof signUpWithEmailSchema>
>
