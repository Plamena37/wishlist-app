import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { AddCardFormData, addCardSchema } from '@/cards/schemas/card.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NewCard } from '@/lib/types/Cards'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form'
import { Text } from '@/components/ui/text'

export const AddCardForm = () => {
  const { addCard } = useCardsContext()
  const { user } = useAuth()

  const form = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      title: '',
      description: '',
      isPublic: true,
      items: [],
    },
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const isPublic = watch('isPublic')

  const onSubmit = async (data: AddCardFormData) => {
    addCard(data as NewCard, user?.uid || '')
    reset()
  }

  return (
    <Form {...form}>
      <form
        onChange={() => {
          clearErrors()
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="py-6 px-8 border-b border-gray-400"
      >
        <div className="grid grid-cols-[1fr] mb-6">
          <Text
            as="h4"
            variant="h4"
            className="mb-4 font-semibold text-purple-900"
          >
            What do I want?
          </Text>

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
                      Card Title
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
                    placeholder="Enter Card Title"
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
                      Card Description
                    </Text>
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter Card Description"
                    error={!!errors.description}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-sm font-normal" />
              </FormItem>
            )}
          />

          <FormItem className="flex items-center gap-4">
            <FormLabel>
              <div className="flex items-center gap-x-2">
                <Text
                  as="p"
                  variant="body"
                  className="font-semibold text-purple-900"
                >
                  Will Card Be Public
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
          </FormItem>

          <h4 className="font-semibold mt-2">Add Items:</h4>
          <div className="border border-gray-200 rounded-sm p-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-start mb-4"
              >
                <div>
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
                  <Input
                    placeholder="Item Name"
                    {...register(`items.${index}.name`)}
                    error={!!errors.items?.[index]?.name}
                    className="w-80"
                  />
                  <FormMessage className="text-red-600 text-sm font-normal">
                    {errors.items?.[index]?.name?.message ?? ''}
                  </FormMessage>
                </div>

                <div>
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
                  <Input
                    placeholder="Item Link"
                    {...register(`items.${index}.link`)}
                    error={!!errors.items?.[index]?.link}
                  />
                  <FormMessage className="text-red-600 text-sm font-normal">
                    {errors.items?.[index]?.link?.message ?? ''}
                  </FormMessage>
                </div>

                <div>
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
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Item Price"
                    {...register(`items.${index}.price`)}
                    error={!!errors.items?.[index]?.price}
                  />
                  <FormMessage className="text-red-600 text-sm font-normal">
                    {errors.items?.[index]?.price?.message ?? ''}
                  </FormMessage>
                </div>

                <div>
                  {/* Remove Button */}
                  <FormLabel>
                    <div className="mb-1 flex items-center gap-x-2">
                      <Text
                        as="p"
                        variant="body"
                        className="opacity-0"
                      >
                        Delete Item
                      </Text>
                    </div>
                  </FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-purple-900 self-center"
                    onClick={() => remove(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add Item Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  name: '',
                  link: '',
                  price: null,
                })
              }
              disabled={
                fields.length > 0 && !watch(`items.${fields.length - 1}.name`)
              }
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-purple-900"
              />
              Add Item
            </Button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
            // disabled={loadingCardItem}
          >
            Add Card
          </Button>
        </div>
      </form>
    </Form>
  )
}
