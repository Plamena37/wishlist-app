import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCardsContext } from '@/cards/hooks/useCards'
import { AddCardFormData, addCardSchema } from '@/cards/schemas/card.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/auth/hooks/useAuth'

export const AddCardForm = () => {
  const { addCard } = useCardsContext()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
    watch,
    setValue,
  } = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      title: '',
      description: '',
      isPublic: false,
    },
  })

  const onAddItem = async (data: AddCardFormData) => {
    console.log(data)

    addCard(data, user?.uid)
    // addCardItem(card?.id ?? '', {
    //   title: data.title,
    //   description: data.description || '',
    //   isPublic: data.isPublic,
    // })
    resetAddForm()
  }

  const isPublic = watch('isPublic')

  return (
    <form onSubmit={handleSubmit(onAddItem)}>
      <Input
        placeholder="Add Card Title..."
        {...register('title')}
      />
      {addErrors.title && (
        <p style={{ color: 'red' }}>{addErrors.title.message}</p>
      )}

      <Textarea
        placeholder="Add Card Description..."
        {...register('description')}
      />
      {addErrors.description && (
        <p style={{ color: 'red' }}>{addErrors.description.message}</p>
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
      {addErrors.isPublic && (
        <p style={{ color: 'red' }}>{addErrors.isPublic.message}</p>
      )}

      <Button
        type="submit"
        // disabled={loadingCardItem}
      >
        Add Item
      </Button>
    </form>
  )
}
