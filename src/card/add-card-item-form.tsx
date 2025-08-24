import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCardsContext } from '@/cards/hooks/useCards'
import {
  AddCardItemFormData,
  addCardItemSchema,
} from './schemas/card-item.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const AddCardItemForm = () => {
  const { card, addCardItem, loadingCardItem } = useCardsContext()

  const {
    register,
    handleSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm<AddCardItemFormData>({
    resolver: zodResolver(addCardItemSchema),
    defaultValues: {
      itemName: '',
      itemLink: '',
      itemPrice: '',
    },
  })

  const onAddItem = async (data: AddCardItemFormData) => {
    addCardItem(card?.id ?? '', {
      name: data.itemName,
      link: data.itemLink || '',
      price: data.itemPrice ? data.itemPrice : null,
      reservedBy: '',
    })
    resetAddForm()
  }

  return (
    <form onSubmit={handleSubmit(onAddItem)}>
      <Input
        placeholder="Add Item Name..."
        {...register('itemName')}
      />
      {addErrors.itemName && (
        <p style={{ color: 'red' }}>{addErrors.itemName.message}</p>
      )}

      <Input
        placeholder="Add Item Link..."
        {...register('itemLink')}
      />
      {addErrors.itemLink && (
        <p style={{ color: 'red' }}>{addErrors.itemLink.message}</p>
      )}

      <Input
        placeholder="Add Item Price..."
        {...register('itemPrice')}
      />
      {addErrors.itemPrice && (
        <p style={{ color: 'red' }}>{addErrors.itemPrice.message}</p>
      )}

      <Button
        type="submit"
        disabled={loadingCardItem}
      >
        Add Item
      </Button>
    </form>
  )
}
