import { z } from 'zod'

export const addCardSchema = z.object({
  title: z.string().min(2, 'Card title must be at least 2 characters long'),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
})

export const editCardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
})

export type AddCardFormData = z.infer<typeof addCardSchema>

export type EditCardFormData = z.infer<typeof editCardSchema>
