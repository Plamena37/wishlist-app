import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCardsContext } from '@/cards/hooks/useCards'
import {
  AddCardItemFormData,
  addCardItemSchema,
} from '@/card/schemas/card-item.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form'
import { Text } from '@/components/ui/text'

export const AddCardItemForm = () => {
  const { card, addCardItem, loadingCardItem } = useCardsContext()

  const form = useForm<AddCardItemFormData>({
    resolver: zodResolver(addCardItemSchema),
    defaultValues: {
      itemName: '',
      itemLink: '',
      itemPrice: '',
    },
  })

  const {
    handleSubmit,
    reset: resetAddForm,
    formState: { errors },
    reset,
  } = form

  const onAddItem = async (data: AddCardItemFormData) => {
    addCardItem(card?.id ?? '', {
      name: data.itemName,
      link: data.itemLink || '',
      price: data.itemPrice ? data.itemPrice : null,
      reservedBy: '',
    })
    resetAddForm()
  }

  const resetForm = () => {
    reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onAddItem)}
        className="py-6 px-8 border-b border-gray-400"
      >
        <div className="grid grid-cols-[1fr]">
          <Text
            as="h4"
            variant="h4"
            className="mb-4 font-semibold text-purple-900"
          >
            Add your desired items...
          </Text>

          <FormField
            control={form.control}
            name="itemName"
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
                    <Text
                      as="p"
                      variant="body"
                      className="text-gray-600"
                    >
                      (Required)
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Title"
                    error={!!errors.itemName}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemLink"
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
                    error={!!errors.itemLink}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itemPrice"
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
                    error={!!errors.itemPrice}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <div className="flex sm:gap-6 gap-2 justify-between sm:justify-end">
            <Button
              variant="outline"
              size="lg"
              type="reset"
              disabled={loadingCardItem}
              onClick={resetForm}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loadingCardItem}
            >
              Add Item
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
