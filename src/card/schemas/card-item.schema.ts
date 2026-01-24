import { z } from 'zod'

export const addCardItemSchema = (t: (key: string) => string) =>
  z.object({
    itemName: z.string().min(2, t('formValidation.cardItem.nameMin')),
    itemLink: z
      .string()
      .url(t('formValidation.cardItem.invalidUrl'))
      .optional()
      .or(z.literal('')),
    itemPrice: z
      .string()
      .optional()
      .refine(
        (val) => !val || !isNaN(Number(val)),
        t('formValidation.cardItem.invalidPrice')
      ),
  })

export const editCardItemSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('formValidation.cardItem.nameMin')).optional(),
    link: z
      .string()
      .url(t('formValidation.cardItem.invalidUrl'))
      .optional()
      .or(z.literal('')),
    price: z
      .string()
      .optional()
      .nullable()
      .refine(
        (val) => val === null || !val || !isNaN(Number(val)),
        t('formValidation.cardItem.invalidPrice')
      ),
    reservedBy: z.string().optional().or(z.literal('')),
  })

export type AddCardItemFormData = z.infer<ReturnType<typeof addCardItemSchema>>

export type EditCardItemFormData = z.infer<
  ReturnType<typeof editCardItemSchema>
>
