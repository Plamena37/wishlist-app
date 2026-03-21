import { useCallback, useState } from 'react'
import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import PageEaten from '@/assets/page-eaten.svg'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Card, CardItem } from '@/lib/types/Cards'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import CardActionsDropdown from '@/card/card-actions-dropdown'
import { Text } from '@/components/ui/text'
// import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { SignInOverlay } from '@/components/overlay/sign-in-overlay'

interface CardItemsList {
  items: CardItem[]
}

export const CardItemsList = ({ items }: CardItemsList) => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const {
    card,
    updateCardItem,
    canReserveCardItem,
    loadingCardItem,
    updatingCardItemId,
  } = useCardsContext()
  const [openSignInOverlay, setOpenSignInOverlay] = useState(false)

  const handleReservedByLabel = (reservedBy: string): string => {
    if (user?.uid === reservedBy) {
      return t('cardPage.reservedByYou')
    }
    if (reservedBy) {
      return t('cardPage.reserved')
    }
    return t('cardPage.free')
  }

  const handleToggleReservedBy = useCallback(
    (card: Card, item: CardItem, checked: boolean) => {
      if (!user?.displayName || !user) return

      if (!item.reservedBy && checked) {
        updateCardItem(card, item.id, { reservedBy: user.uid })
      } else if (item.reservedBy === user.uid && !checked) {
        updateCardItem(card, item.id, { reservedBy: '' })
      }
    },
    [user, updateCardItem]
  )

  if (!card) return null
  if (!card.items || card.items.length === 0)
    return (
      <div className="flex flex-col justify-center items-center gap-4 sm:p-8 p-4">
        <Icon
          src={PageEaten}
          style={{
            width: '150px',
            height: '150px',
          }}
          alt="Page Eaten Icon"
        />
        <Text
          as="p"
          variant="body"
          className="text-gray-600 text-center"
        >
          {t('cardPage.noItems')}
        </Text>
      </div>
    )

  const toggleSignInOverlay = (isReserved: string) => {
    if ((user && user?.displayName) || isReserved) return
    setOpenSignInOverlay((prev) => !prev)
  }

  return (
    <>
      <ul className="flex flex-col gap-6 w-[90%] sm:w-[80%] py-4 mb-6 px-2 sm:px-8 sm:py-8 mx-auto bg-white rounded-sm shadow-sm mt-2 sm:mt-6">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              'relative px-4',
              index !== card.items.length - 1
                ? 'border-b border-b-gray-300 pb-4'
                : ''
            )}
          >
            {user?.uid === card.ownerId && (
              <CardActionsDropdown
                card={card}
                item={item}
                className="absolute top-0 right-0"
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <Text
                as="h5"
                variant="h5"
                className="font-semibold pr-4 lg:border-r border-r-gray-300"
              >
                {item.name}
              </Text>

              <Text
                variant="body"
                className="font-semibold flex items-center gap-2 pr-4 lg:border-r border-r-gray-300"
              >
                {t('cardPage.link')}:
                {item.link ? (
                  <Button
                    variant="link"
                    className="p-0 w-auto"
                    aria-label="Wish Link"
                  >
                    <Link
                      to={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('common.clickHere')}
                    </Link>
                  </Button>
                ) : (
                  <Text
                    as="span"
                    variant="body-sm"
                  >
                    {t('cardPage.noLink')}
                  </Text>
                )}
              </Text>

              <Text
                variant="body"
                className="font-semibold flex items-center gap-2 pr-4 lg:border-r border-r-gray-300"
              >
                {t('cardPage.price')}:
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
                    {t('cardPage.noPrice')}
                  </Text>
                )}
              </Text>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id={`reserved-${item.id}`}
                    checked={Boolean(item.reservedBy)}
                    onChange={(e) => {
                      toggleSignInOverlay(item.reservedBy)
                      handleToggleReservedBy(card, item, e.target.checked)
                    }}
                    disabled={
                      (item.id === updatingCardItemId && loadingCardItem) ||
                      canReserveCardItem
                    }
                    className="h-4.5 w-4.5 rounded-sm border-2 border-gray-400 appearance-none    cursor-pointer checked:bg-purple-800 checked:border-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  />
                  {Boolean(item.reservedBy) && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="absolute text-white"
                      style={{
                        width: '12px',
                        height: '12px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )}
                </label>
                {/* <Checkbox
                  checked={Boolean(item.reservedBy)}
                  id={`reserved-${item.id}`}
                  className="cursor-pointer"
                  onCheckedChange={(val) => {
                    toggleSignInOverlay(item.reservedBy)
                    handleToggleReservedBy(card, item, Boolean(val))
                  }}
                  disabled={
                    (item.id === updatingCardItemId && loadingCardItem) ||
                    canReserveCardItem
                  }
                /> */}
                <Label
                  htmlFor={`reserved-${item.id}`}
                  className="cursor-pointer"
                >
                  {handleReservedByLabel(item.reservedBy)}
                </Label>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {openSignInOverlay && (
        <SignInOverlay title={t('auth.holdUpSignInFirst')} />
      )}
    </>
  )
}
