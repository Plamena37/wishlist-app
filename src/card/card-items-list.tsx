import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import PageEaten from '@/assets/page-eaten.svg'
import { DeleteCardItemDialog } from './delete-card-item-dialog'
import { EditCardItemDialog } from './edit-card-item-dialog'
import { Text } from '@/components/ui/text'
import { Link } from 'react-router'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cardItemMessages } from '@/lib/constants/messages'
import { Card, CardItem } from '@/lib/types/Cards'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'

export const CardItemsList = () => {
  const { user } = useAuth()
  const {
    card,
    updateCardItem,
    canReserveCardItem,
    loadingCardItem,
    updatingCardItemId,
  } = useCardsContext()

  const handleReservedByLabel = (reservedBy: string): string => {
    if (user?.uid === reservedBy) {
      return cardItemMessages.item_reserved_by_me
    }
    if (reservedBy) {
      return cardItemMessages.item_reserved_by_another_user
    }
    return cardItemMessages.item_free
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
  if (!card.items || card.items.length === 0)
    return (
      <div className="flex flex-col justify-center items-center gap-4 p-8">
        <Icon
          src={PageEaten}
          style={{
            width: '150px',
            height: '150px',
          }}
        />
        <Text
          as="p"
          variant="body"
          className="text-gray-600"
        >
          No items have been added to this wishlist yet.
        </Text>
      </div>
    )

  return (
    <ul className="flex flex-col gap-6 w-[80%] p-8 mx-auto bg-white rounded-sm shadow-sm mt-6">
      {card.items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            'grid grid-cols-[1.6fr_0.4fr] gap-4',
            index !== card.items.length - 1
              ? 'border-b border-b-gray-300 pb-4'
              : ''
          )}
        >
          <div className="grid grid-cols-4 gap-4">
            <Text
              as="h5"
              variant="h5"
              className="font-semibold pr-4 border-r border-r-gray-300"
            >
              {item.name}
            </Text>

            <Text
              variant="body"
              className="font-semibold flex items-center gap-2 pr-4 border-r border-r-gray-300"
            >
              Link:
              {item.link ? (
                <Button
                  variant="link"
                  className="p-0 w-auto"
                >
                  <Link
                    to={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click Here
                  </Link>
                </Button>
              ) : (
                <Text
                  as="span"
                  variant="body-sm"
                >
                  No link provided
                </Text>
              )}
            </Text>

            <Text
              variant="body"
              className="font-semibold flex items-center gap-2 pr-4 border-r border-r-gray-300"
            >
              Price:
              {item.price ? (
                <Text
                  as="span"
                  variant="body-sm"
                >
                  {item.price} BGN
                </Text>
              ) : (
                <Text
                  as="span"
                  variant="body-sm"
                >
                  Apparently priceless 🤔
                </Text>
              )}
            </Text>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={!!item.reservedBy}
                id={`reserved-${item.id}`}
                onCheckedChange={(val) =>
                  handleToggleReservedBy(card, item, !!val)
                }
                disabled={
                  (item.id === updatingCardItemId && loadingCardItem) ||
                  canReserveCardItem
                }
              />
              <Label htmlFor={`reserved-${item.id}`}>
                {handleReservedByLabel(item.reservedBy)}
              </Label>
            </div>
          </div>

          {user?.uid === card.ownerId && (
            <div className="flex items-center gap-2">
              <EditCardItemDialog
                card={card}
                item={item}
              />
              <DeleteCardItemDialog
                cardId={card.id}
                item={item}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
