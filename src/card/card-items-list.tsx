import { useCallback } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Card, CardItem } from '@/lib/types/Cards'
import {
  EditCardItemFormData,
  editCardItemSchema,
} from '@/card/schemas/card-item.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface CardListProps {
  editingItemId: string | null
  setEditingItemId: (id: string | null) => void
}

export const CardItemsList = ({
  editingItemId,
  setEditingItemId,
}: CardListProps) => {
  const {
    card,
    canEditCard,
    checkUserCanReserveCardItem,
    updateCardItem,
    deleteCardItem,
    loadingCardItem,
  } = useCardsContext()
  const { user } = useAuth()
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEditForm,

    formState: { errors: editErrors },
  } = useForm<EditCardItemFormData>({
    resolver: zodResolver(editCardItemSchema),
    defaultValues: {
      name: '',
      link: '',
      price: '',
      reservedBy: '',
    },
  })

  const cancelEdit = () => {
    setEditingItemId(null)
    resetEditForm()
  }

  const onSaveEdit = (
    card: Card,
    itemId: string,
    data: EditCardItemFormData
  ) => {
    updateCardItem(card, itemId, data, cancelEdit)
  }

  const handleEditCardItem = useCallback(
    (item: CardItem) => () => {
      checkUserCanReserveCardItem(user, item)
      // setCanUserReserve(!item.reservedBy || item.reservedBy === user?.uid)
      setEditingItemId(item.id)
      resetEditForm({
        name: item.name,
        link: item.link || '',
        price: item.price?.toString() || '',
        // ...(canReserveCardItem && { reservedBy: item.reservedBy || '' }),
      })
    },
    [checkUserCanReserveCardItem, user, setEditingItemId, resetEditForm]
  )

  const handleDeleteCardItem = useCallback(
    (cardId: string, itemId: string) => () => {
      deleteCardItem(cardId, itemId)
    },
    [deleteCardItem]
  )

  const handleReservedByLabel = (reservedBy: string): string => {
    if (user?.uid === reservedBy) {
      return 'Reserved by you 💪'
    }
    if (reservedBy) {
      return 'Reserved 🙄'
    }
    return 'Free 💝'
  }

  const handleToggleReservedBy = useCallback(
    (card: Card, item: CardItem, checked: boolean) => {
      if (!user) return

      // Reserve
      if (item.reservedBy === '' && checked) {
        updateCardItem(card, item.id, { reservedBy: user?.uid })
      }

      // Unreserve
      else if (item.reservedBy === user.uid && !checked) {
        updateCardItem(card, item.id, { reservedBy: '' })
      }
    },
    [user, updateCardItem]
  )

  if (!card) return null
  if (!card.items) return <p>No items found</p>

  return (
    <ul>
      {card.items.map((item) => (
        <li key={item.id}>
          {editingItemId === item.id ? (
            <form
              onSubmit={handleSubmitEdit((data) =>
                onSaveEdit(card, item.id, data)
              )}
            >
              <Input
                {...registerEdit('name')}
                placeholder="Name"
              />
              {editErrors.name && (
                <p style={{ color: 'red' }}>{editErrors.name.message}</p>
              )}

              <Input
                {...registerEdit('link')}
                placeholder="Link"
              />
              {editErrors.link && (
                <p style={{ color: 'red' }}>{editErrors.link.message}</p>
              )}

              <Input
                {...registerEdit('price')}
                placeholder="Price"
              />
              {editErrors.price && (
                <p style={{ color: 'red' }}>{editErrors.price.message}</p>
              )}

              {/* <div className="flex items-center">
                <Checkbox
                  checked={!!item.reservedBy}
                  id={`reserved-${item.id}`}
                  // disabled={canReserveCardItem}
                  onCheckedChange={(val) =>
                    handleToggleReservedBy(card, item, !!val)
                  }
                />
                <Label htmlFor={`reserved-${item.id}`}>
                  {handleReservedByLabel(item.reservedBy)}
                </Label>
                {editErrors.reservedBy && (
                  <p style={{ color: 'red' }}>
                    {editErrors.reservedBy.message}
                  </p>
                )}
              </div> */}

              <Button
                type="submit"
                disabled={loadingCardItem}
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
              {item.link ? (
                <Link
                  to={item.link}
                  target="_blank"
                >
                  {item.link}
                </Link>
              ) : (
                <p>No link available</p>
              )}
              <div className="flex items-center">
                <Checkbox
                  checked={!!item.reservedBy}
                  id={`reserved-${item.id}`}
                  // disabled={canReserveCardItem}
                  onCheckedChange={(val) =>
                    handleToggleReservedBy(card, item, !!val)
                  }
                />
                <Label htmlFor={`reserved-${item.id}`}>
                  {handleReservedByLabel(item.reservedBy)}
                </Label>
              </div>

              {canEditCard && (
                <div>
                  <Button onClick={handleEditCardItem(item)}>Edit Item</Button>
                  <Button onClick={handleDeleteCardItem(card.id, item.id)}>
                    Delete Item
                  </Button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  )
}
