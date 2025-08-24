import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { AddCardFormData, addCardSchema } from '@/cards/schemas/card.schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

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
      isPublic: true,
    },
  })

  const isPublic = watch('isPublic')

  const onAddItem = async (data: AddCardFormData) => {
    addCard(data, user?.uid || '')
    resetAddForm()
  }

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
