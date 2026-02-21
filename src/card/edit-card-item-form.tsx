import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Card, CardItem } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  EditCardItemFormData,
  editCardItemSchema,
} from '@/card/schemas/card-item.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form'
import { Text } from '@/components/ui/text'
import { DialogClose } from '@/components/ui/dialog'

interface EditCardItemFormProps {
  card: Card
  item: CardItem
  onClose: (open: boolean) => void
}

export const EditCardItemForm = ({
  card,
  item,
  onClose,
}: EditCardItemFormProps) => {
  const { t } = useTranslation()
  const { updateCardItem } = useCardsContext()

  const form = useForm<EditCardItemFormData>({
    resolver: zodResolver(editCardItemSchema(t)),
    defaultValues: {
      name: item?.name || '',
      link: item?.link || '',
      price: item?.price || null,
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (data: EditCardItemFormData) => {
    updateCardItem(card, item.id, data)
    onClose(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-[1fr]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      {t('editWishes.nameLabel')}
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('editWishes.namePlaceholder')}
                    error={!!errors.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      {t('editWishes.linkLabel')}
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('editWishes.linkPlaceholder')}
                    error={!!errors.link}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      {t('editWishes.priceLabel')}
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('editWishes.pricePlaceholder')}
                    error={!!errors.price}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-between sm:justify-end mt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Cancel editing"
              >
                {t('common.cancel')}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="sm"
              aria-label="Save changes to wish"
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
