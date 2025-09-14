import { z } from 'zod'

export const addCardSchema = z.object({
  title: z.string().min(2, 'Card title must be at least 2 characters long'),
  description: z.string().optional(),
  isPublic: z.boolean(),
  items: z
    .array(
      z.object({
        name: z.string().min(2, 'Item name must be at least 2 characters long'),
        link: z.string().optional().nullable(),
        price: z.string().nullable().optional(),
      })
    )
    .optional(),
})

export const editCardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.boolean(),
  items: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(2, 'Item name must be at least 2 characters long'),
        link: z.string().optional().nullable(),
        price: z.string().nullable().optional(),
        reservedBy: z.string().optional().nullable(),
      })
    )
    .optional(),
})

export type AddCardFormData = z.infer<typeof addCardSchema>

export type EditCardFormData = z.infer<typeof editCardSchema>
