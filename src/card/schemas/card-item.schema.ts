import { z } from 'zod'

export const addCardItemSchema = z.object({
  itemName: z.string().min(2, 'Name too short (min 2)'),
  itemLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  itemPrice: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), 'Price must be a valid'),
})

export const editCardItemSchema = z.object({
  name: z.string().min(2, 'Name too short (min 2)'),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  price: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => val === null || !val || !isNaN(Number(val)),
      'Price must be a valid'
    ),
  reservedBy: z.string().optional().or(z.literal('')),
})

export type AddCardItemFormData = z.infer<typeof addCardItemSchema>

export type EditCardItemFormData = z.infer<typeof editCardItemSchema>
