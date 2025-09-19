import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

interface EditCardItemFormProps {
  card: Card
  item: CardItem
  onClose: () => void
}

export const EditCardItemForm = ({
  card,
  item,
  onClose,
}: EditCardItemFormProps) => {
  const { updateCardItem } = useCardsContext()

  const form = useForm<EditCardItemFormData>({
    resolver: zodResolver(editCardItemSchema),
    defaultValues: {
      name: item?.name || '',
      link: item?.link || '',
      price: item?.price || null,
      reservedBy: item?.reservedBy || '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = async (data: EditCardItemFormData) => {
    updateCardItem(card, item.id, data)
    onClose()
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
                      Item Title
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Title"
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
                      Item Link
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Link"
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
                      Item Price
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Price"
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
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
