import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { EditCardFormData, editCardSchema } from '@/cards/schemas/card.schema'
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

interface EditCardInfoFormProps {
  card: Card
  onClose: (open: boolean) => void
}

export const EditCardInfoForm = ({ card, onClose }: EditCardInfoFormProps) => {
  const { t } = useTranslation()
  const { editCard } = useCardsContext()

  const form = useForm<EditCardFormData>({
    resolver: zodResolver(editCardSchema(t)),
    defaultValues: {
      title: card?.title || '',
      description: card?.description || '',
      isPublic: card?.isPublic ?? true,
      items: card?.items || [],
    },
  })

  const {
    handleSubmit,
    // watch,
    // setValue,
    formState: { errors },
  } = form

  // const isPublic = watch('isPublic')

  const onSubmit = async (data: EditCardFormData) => {
    editCard(card.id, data)
    onClose(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[80dvh] overflow-y-auto"
      >
        <div className="grid grid-cols-[1fr] gap-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      {t('editWishlist.titleLabel')}
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('editWishlist.titlePlaceholder')}
                    error={!!errors.title}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="mb-1 flex items-center gap-x-2">
                    <Text
                      as="p"
                      variant="body"
                      className="font-semibold text-purple-900"
                    >
                      {t('editWishlist.descriptionLabel')}
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('editWishlist.descriptionPlaceholder')}
                    error={!!errors.description}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          {/* <FormItem className="flex items-center gap-4">
            <FormLabel>
              <div className="flex items-center gap-1">
                <Text
                  as="p"
                  variant="body"
                  className="font-semibold text-purple-900"
                >
                  Make Wishlist Public
                </Text>
              </div>
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Switch
                  id="switch-isPublic"
                  checked={isPublic}
                  onCheckedChange={(val) => {
                    setValue('isPublic', val, { shouldValidate: true })
                  }}
                />
                <Label htmlFor="switch-isPublic">
                  {isPublic ? 'Public' : 'Private'}
                </Label>
              </div>
            </FormControl>
            <FormMessage className="text-red-600 text-sm font-normal" />
          </FormItem> */}

          {/* Action buttons */}
          <div className="flex gap-2 mt-4 justify-between sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                aria-label="Cancel editing wishlist"
              >
                {t('common.cancel')}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="sm"
              aria-label="Save wishlist changes"
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
