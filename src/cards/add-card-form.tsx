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
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { NewCard } from '@/lib/types/Cards'

export const AddCardForm = () => {
  const { addCard } = useCardsContext()
  const { user } = useAuth()

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      title: '',
      description: '',
      isPublic: true,
      items: [],
    },
  })

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        placeholder="Add Card Title..."
        {...register('title')}
      />
      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

      <Textarea
        placeholder="Add Card Description..."
        {...register('description')}
      />
      {errors.description && (
        <p style={{ color: 'red' }}>{errors.description.message}</p>
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
        <p style={{ color: 'red' }}>{errors.isPublic.message}</p>
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
              // {...register(`items.${index}.price`, {
              //   setValueAs: (val) => (val === '' ? null : parseFloat(val)),
              // })}
            />
            {errors.items?.[index]?.price && (
              <p className="text-red-500">
                {errors.items[index]?.price?.message}
              </p>
            )}
          </div>

          {/* Remove Button */}
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
          icon={faPlusCircle}
          className="mr-2"
        />
        Add Item
      </Button>

      <Button
        type="submit"
        className="w-full"
        // disabled={loadingCardItem}
      >
        Add Card
      </Button>
    </form>
  )
}
