import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import { EditCardFormData, editCardSchema } from '@/cards/schemas/card.schema'
import { Input } from '@/components/ui/input'
import { Form, FormMessage } from '@/components/form/form'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'

interface EditCardItemsFormProps {
  card: Card
  onClose: (open: boolean) => void
}

export const EditCardItemsForm = ({
  card,
  onClose,
}: EditCardItemsFormProps) => {
  const { editCard } = useCardsContext()

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
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = form

  const onSubmit = async (data: EditCardFormData) => {
    editCard(card.id, data)
    onClose(false)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  useEffect(() => {
    if ((card.items?.length ?? 0) === 0 && fields.length === 0) {
      append({
        name: '',
        link: '',
        price: null,
      })
    }
  }, [card.items, fields.length, append])

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[80dvh] overflow-y-auto space-y-4"
      >
        {fields.map((field, index) => (
          <div
            key={field.id}
            className={cn(
              'grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_0.5fr] sm:gap-4 gap-2 mb-2',
              // 'p-2 odd:bg-purple-100 even:bg-white',
              index !== fields.length - 1
                ? 'border-b-2 border-dashed border-b-purple-800 pb-2'
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
              className="text-purple-900 self-start w-full"
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
          size="sm"
          className="w-full mt-2"
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
          Add Wish
        </Button>

        <div className="flex gap-2 justify-between sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
