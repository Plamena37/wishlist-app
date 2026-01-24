import { z } from 'zod'

export const addCardSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(2, t('formValidation.card.cardNameMin')),
    description: z.string().optional(),
    isPublic: z.boolean(),
    items: z
      .array(
        z.object({
          name: z.string().min(2, t('formValidation.card.cardNameMin')),
          link: z.string().optional().nullable(),
          price: z.string().nullable().optional(),
        })
      )
      .optional(),
    createdAt: z.string().optional(),
    lastUpdatedAt: z.string().optional(),
  })

export const editCardSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(2, t('formValidation.card.cardNameMin')),
    description: z.string().optional(),
    isPublic: z.boolean(),
    items: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string().min(2, t('formValidation.card.cardNameMin')),
          link: z.string().optional().nullable(),
          price: z.string().nullable().optional(),
          reservedBy: z.string().optional().nullable(),
        })
      )
      .optional(),
    createdAt: z.string().optional(),
    lastUpdatedAt: z.string().optional(),
  })

export type AddCardFormData = z.infer<ReturnType<typeof addCardSchema>>

export type EditCardFormData = z.infer<ReturnType<typeof editCardSchema>>
