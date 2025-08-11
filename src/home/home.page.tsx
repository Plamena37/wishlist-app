import { useState } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCardItemsContext } from '@/home/hooks/useCardItems'

const addItemSchema = z.object({
  itemName: z.string().min(2, 'Item name must be at least 2 characters long'),
  itemLink: z.string().url('Invalid URL').optional().or(z.literal('')),
  itemPrice: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Number(val)),
      'Price must be a valid number'
    ),
})

type AddItemFormData = z.infer<typeof addItemSchema>

const editItemSchema = z.object({
  name: z.string().min(2, 'Item name must be at least 2 characters long'),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  price: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Number(val)),
      'Price must be a valid number'
    ),
})

type EditItemFormData = z.infer<typeof editItemSchema>

export default function HomePage() {
  const { cards, loading, error, addItem, updateItem, deleteItem } =
    useCardItemsContext()

  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm<AddItemFormData>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      itemName: '',
      itemLink: '',
      itemPrice: '',
    },
  })

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEditForm,
    formState: { errors: editErrors },
  } = useForm<EditItemFormData>({
    resolver: zodResolver(editItemSchema),
    defaultValues: {
      name: '',
      link: '',
      price: '',
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const onAddItem = async (data: AddItemFormData) => {
    setActionError(null)
    setActionLoading(true)
    try {
      await addItem(cards[0].id, {
        name: data.itemName,
        link: data.itemLink || '',
        price: data.itemPrice ? Number(data.itemPrice) : null,
        reservedBy: null,
      })
      resetAddForm()
    } catch (err: any) {
      setActionError(err?.message || 'Failed to add item')
    } finally {
      setActionLoading(false)
    }
  }

  const onDeleteItem = async (cardId: string, itemId: string) => {
    setActionError(null)
    setActionLoading(true)
    try {
      await deleteItem(cardId, itemId)
    } catch (err: any) {
      setActionError(err?.message || 'Failed to delete item')
    } finally {
      setActionLoading(false)
    }
  }

  const startEdit = (item: any) => {
    setEditingItemId(item.id)
    resetEditForm({
      name: item.name,
      link: item.link || '',
      price: item.price?.toString() || '',
    })
  }

  const cancelEdit = () => {
    setEditingItemId(null)
    resetEditForm()
  }

  const onSaveEdit = async (
    cardId: string,
    itemId: string,
    data: EditItemFormData
  ) => {
    setActionLoading(true)
    try {
      await updateItem(cardId, itemId, {
        name: data.name,
        link: data.link,
        price: data.price ? Number(data.price) : null,
      })
      cancelEdit()
    } catch (err: any) {
      setActionError(err?.message || 'Failed to update item')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div>
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
          disabled={actionLoading}
        >
          Add Item
        </Button>
      </form>

      {actionError && <p style={{ color: 'red' }}>{actionError}</p>}

      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <p>Title: {card.title}</p>
            {card.description && <p>Description: {card.description}</p>}
            <p>Card is: {card.isPublic ? 'Public' : 'Private'}</p>
            <p>Card Owner: {card.ownerId}</p>
            <p>Items:</p>
            <ul>
              {card.items.map((item) => (
                <li key={item.id}>
                  {editingItemId === item.id ? (
                    <form
                      onSubmit={handleSubmitEdit((data) =>
                        onSaveEdit(card.id, item.id, data)
                      )}
                    >
                      <Input {...registerEdit('name')} />
                      {editErrors.name && (
                        <p style={{ color: 'red' }}>
                          {editErrors.name.message}
                        </p>
                      )}

                      <Input {...registerEdit('link')} />
                      {editErrors.link && (
                        <p style={{ color: 'red' }}>
                          {editErrors.link.message}
                        </p>
                      )}

                      <Input {...registerEdit('price')} />
                      {editErrors.price && (
                        <p style={{ color: 'red' }}>
                          {editErrors.price.message}
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={actionLoading}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </form>
                  ) : (
                    <>
                      <p>{item.name}</p>
                      <p>Price: {item.price}$</p>
                      {item.link && (
                        <Link
                          to={item.link}
                          target="_blank"
                        >
                          {item.link}
                        </Link>
                      )}
                      <p>Free: {item.reservedBy ? 'No' : 'Yes'}</p>
                      <Button onClick={() => startEdit(item)}>Edit Item</Button>
                      <Button onClick={() => onDeleteItem(card.id, item.id)}>
                        Delete Item
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
