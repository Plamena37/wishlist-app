import { useFieldArray, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { AddCardFormData, addCardSchema } from '@/cards/schemas/card.schema'
import { NewCard } from '@/lib/types/Cards'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form/form'
import { Text } from '@/components/ui/text'

const cardImages = [
  import.meta.env.VITE_CLOUDINARY_FOLDER_URL + '/balloon_ume1we.png',
  import.meta.env.VITE_CLOUDINARY_FOLDER_URL + '/cake_2_hepdyj.png',
  import.meta.env.VITE_CLOUDINARY_FOLDER_URL + '/confetti_1_a9sx8z.png',
  import.meta.env.VITE_CLOUDINARY_FOLDER_URL + '/giftbox_iyqioz.png',
]

const getRandomCardImage = () => {
  return cardImages[Math.floor(Math.random() * cardImages.length)]
}

export const AddCardForm = () => {
  const { addCard, loadingCardItem } = useCardsContext()
  const { user } = useAuth()
  const { isSm } = useBreakpoints()

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
    addCard(data as NewCard, user?.uid || '', getRandomCardImage())
    reset()
  }

  const resetForm = () => {
    reset()
  }

  return (
    <Form {...form}>
      <form
        onChange={() => {
          clearErrors()
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="py-4 px-8 border-b border-gray-400"
      >
        <div className="grid grid-cols-[1fr]">
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
                    placeholder="Enter Title"
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
                    placeholder="Enter Description"
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
              <div className="flex items-center gap-1">
                <Text
                  as="p"
                  variant="body"
                  className="font-semibold text-purple-900"
                >
                  Make Card Public
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

          <Text
            as="h5"
            variant="h5"
            className="font-semibold mt-2"
          >
            Add Items:
          </Text>
          <div
            className={cn(
              'border border-gray-200 rounded-sm',
              isSm ? 'py-4' : 'py-2'
            )}
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  'grid grid-cols-1 sm:grid-cols-4 sm:gap-4 gap-2 mb-2',
                  index !== fields.length - 1
                    ? 'border-b border-dashed border-b-gray-400 pb-2'
                    : ''
                )}
              >
                <div>
                  {isSm && (
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
                  )}
                  <Input
                    placeholder="Enter Name"
                    {...register(`items.${index}.name`)}
                    error={!!errors.items?.[index]?.name}
                  />
                  <FormMessage className="text-red-600 text-sm font-normal">
                    {errors.items?.[index]?.name?.message ?? ''}
                  </FormMessage>
                </div>

                <div>
                  {isSm && (
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
                  )}
                  <Input
                    placeholder="Enter Link"
                    {...register(`items.${index}.link`)}
                    error={!!errors.items?.[index]?.link}
                  />
                  <FormMessage className="text-red-600 text-sm font-normal">
                    {errors.items?.[index]?.link?.message ?? ''}
                  </FormMessage>
                </div>

                <div>
                  {isSm && (
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
                  )}
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter Price"
                    {...register(`items.${index}.price`)}
                    error={!!errors.items?.[index]?.price}
                  />
                  <FormMessage className="text-red-600 text-sm font-normal">
                    {errors.items?.[index]?.price?.message ?? ''}
                  </FormMessage>
                </div>

                <div>
                  {isSm && (
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
                  )}
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
              Add Card
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
