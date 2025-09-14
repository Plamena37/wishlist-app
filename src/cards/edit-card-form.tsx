import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { EditCardFormData, editCardSchema } from '@/cards/schemas/card.schema'

interface EditCardFormProps {
  card: Card
  onClose: () => void
}

export const EditCardForm = ({ card, onClose }: EditCardFormProps) => {
  const { editCard } = useCardsContext()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EditCardFormData>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      title: card?.title || '',
      description: card?.description || '',
      isPublic: card?.isPublic ?? true,
      items: card?.items || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const isPublic = watch('isPublic')

  const onSubmit = async (data: EditCardFormData) => {
    editCard(card.id, data)
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        placeholder="Edit Card Title..."
        {...register('title')}
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <Textarea
        placeholder="Edit Card Description..."
        {...register('description')}
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <div className="flex items-center space-x-2">
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
      {errors.isPublic && (
        <p className="text-red-500">{errors.isPublic.message}</p>
      )}

      <h4 className="font-semibold">Items:</h4>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex gap-2 items-start"
        >
          <div>
            <Input
              placeholder="Item Name"
              {...register(`items.${index}.name`)}
            />
            {errors.items?.[index]?.name && (
              <p className="text-red-500">
                {errors.items[index]?.name?.message}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Item Link"
              {...register(`items.${index}.link`)}
            />
            {errors.items?.[index]?.link && (
              <p className="text-red-500">
                {errors.items[index]?.link?.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="number"
              step="0.01"
              placeholder="Price"
              {...register(`items.${index}.price`)}
            />
            {errors.items?.[index]?.price && (
              <p className="text-red-500">
                {errors.items[index]?.price?.message}
              </p>
            )}
          </div>

          {/* Delete item button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
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
          icon={faPlusCircle}
          className="mr-2"
        />
        Add Item
      </Button>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Close
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}
