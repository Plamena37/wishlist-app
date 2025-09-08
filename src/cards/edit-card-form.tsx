import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/lib/types/Cards'
import { useCardsContext } from './hooks/useCards'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditCardFormData, editCardSchema } from './schemas/card.schema'

interface EditCardFormProps {
  card: Card
  onClose: () => void
}

export const EditCardForm = ({ card, onClose }: EditCardFormProps) => {
  const { editCard } = useCardsContext()

  const {
    register,
    handleSubmit,

    formState: { errors: addErrors },
    watch,
    setValue,
  } = useForm<EditCardFormData>({
    resolver: zodResolver(editCardSchema),
    defaultValues: {
      title: card?.title || '',
      description: card?.description || '',
      isPublic: card?.isPublic || true,
    },
  })

  const isPublic = watch('isPublic')

  const onSubmit = async (data: EditCardFormData) => {
    editCard(card.id, data)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        type="button"
        variant="outline"
        onClick={onClose}
      >
        Close
      </Button>

      <Button
        type="submit"
        // disabled={loadingCardItem}
      >
        Edit
      </Button>
    </form>
  )
}
