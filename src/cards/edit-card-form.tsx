import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
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
import { useState } from 'react'

interface EditCardFormProps {
  card: Card
  onClose: (open: boolean) => void
}

export const EditCardForm = ({ card, onClose }: EditCardFormProps) => {
  const { editCard } = useCardsContext()

  const [showItems, setShowItems] = useState<boolean>(false)

  const form = useForm<EditCardFormData>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      title: card?.title || '',
      description: card?.description || '',
      isPublic: card?.isPublic ?? true,
      items: card?.items || [],
    },
  })

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const isPublic = watch('isPublic')

  const onSubmit = async (data: EditCardFormData) => {
    editCard(card.id, data)
    onClose(false)
  }

  const toggleShowItems = () => {
    setShowItems((prev) => !prev)
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
                      Card Title
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

          <FormItem>
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2 px-0 w-auto sm:px-0"
              onClick={toggleShowItems}
            >
              {showItems ? 'Hide items' : 'Show items'}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={cn(
                  'transition-transform duration-150',
                  showItems && 'rotate-180'
                )}
              />
            </Button>
          </FormItem>

          {showItems && (
            <>
              <h4 className="font-semibold">Items:</h4>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={cn(
                    'grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_0.5fr] sm:gap-4 gap-2 mb-2',
                    index !== fields.length - 1
                      ? 'border-b border-dashed border-b-gray-400 pb-2'
                      : ''
                  )}
                >
                  <div>
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

                  {/* Delete item button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-purple-900 self-start"
                    onClick={() => remove(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              ))}

              {/* Add item button */}
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
                  className="mr-2"
                />
                Add Item
              </Button>
            </>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mt-4 justify-between sm:justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
