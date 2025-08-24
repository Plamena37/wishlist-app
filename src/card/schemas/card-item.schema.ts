import { z } from 'zod'

export const addCardItemSchema = z.object({
  itemName: z.string().min(2, 'Item name must be at least 2 characters long'),
  itemLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  itemPrice: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Number(val)),
      'Price must be a valid number'
    ),
})

export const editCardItemSchema = z.object({
  name: z.string().optional(),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  price: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => val === null || !val || !isNaN(Number(val)),
      'Price must be a valid number'
    ),
  reservedBy: z.string().optional().or(z.literal('')),
})

export type AddCardItemFormData = z.infer<typeof addCardItemSchema>

export type EditCardItemFormData = z.infer<typeof editCardItemSchema>
