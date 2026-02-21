import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { db } from '@/firebase.config'
import { doc, onSnapshot } from 'firebase/firestore'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { CARDS_COLLECTION } from '@/lib/constants'
import { Language } from '@/i18n/constants'
import { Card, CardItem } from '@/lib/types/Cards'
import { CardItemsList } from '@/card/card-items-list'
import { CardsActionsDropdown } from '@/cards/cards-actions-dropdown'
import {
  CardItemsSortDropdown,
  getSortablePrice,
  SortOption,
} from '@/card/card-items-sort-dropdown'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'

export default function CardPage() {
  const { t, lang } = useTranslation()
  const { cardId } = useParams()
  const { card, setCard, getCardById, checkUserCanEditCard, loading } =
    useCardsContext()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [sortedItems, setSortedItems] = useState<CardItem[]>(card?.items || [])
  const [sortBy, setSortBy] = useState<SortOption | null>(null)

  const sortItems = (
    itemsToSort: CardItem[] | undefined,
    option: SortOption | null
  ) => {
    if (!itemsToSort) return []
    if (!option) return [...itemsToSort]
    return [...itemsToSort].sort((a, b) => {
      switch (option) {
        case 'titleAsc':
          return a.name.localeCompare(b.name)
        case 'titleDesc':
          return b.name.localeCompare(a.name)
        case 'priceAsc':
          return getSortablePrice(a.price) - getSortablePrice(b.price)
        case 'priceDesc':
          return getSortablePrice(b.price) - getSortablePrice(a.price)
        case 'statusFree': {
          const aFree = !a.reservedBy
          const bFree = !b.reservedBy
          if (aFree === bFree) return 0
          return aFree ? -1 : 1
        }
        case 'statusReserved': {
          const aFree = !a.reservedBy
          const bFree = !b.reservedBy
          if (aFree === bFree) return 0
          return aFree ? 1 : -1
        }
        default:
          return 0
      }
    })
  }

  useEffect(() => {
    setSortedItems(sortItems(card?.items, sortBy))
  }, [card?.items, sortBy])

  useEffect(() => {
    if (!cardId) return

    const ref = doc(db, CARDS_COLLECTION, cardId)

    // 🔑 Start realtime listener
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Card
        setCard({ ...data, id: snap.id })
      } else {
        setCard(null) // document deleted
      }
    })

    // Cleanup when component unmounts or cardId changes
    return () => unsubscribe()
  }, [cardId])

  useEffect(() => {
    if (cardId) {
      getCardById(cardId)
      checkUserCanEditCard(user)
    }
  }, [cardId, user])

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <LoadingOverlay
        title={t('loading.loadingCardTitle')}
        subtitle={t('loading.loadingCardSubtitle')}
      />
    )
  }

  if (!card) return null

  return (
    <>
      <div className="flex w-full justify-between items-center pt-6 sm:pt-4 px-6 z-10">
        <Button
          variant="link"
          onClick={handleGoBack}
          className="w-auto px-0"
          aria-label="Go back to previous page"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          {t('common.goBack')}
        </Button>
        <CardsActionsDropdown
          card={card}
          btnBgColor="bg-white"
          isCardMine={user?.uid === card.ownerId}
        />
      </div>

      <div
        className={cn(
          'flex flex-col items-center sm:gap-4 gap-2 p-2 sm:p-4',
          user?.uid === card.ownerId ? 'mt-4 sm:mt-[-30px]' : 'mt-0'
        )}
      >
        <img
          src={card.image}
          alt="Card decoration"
          className="sm:w-30 sm:h-30 w-20 h-20 mx-auto select-none"
        />
        <Text
          as="h2"
          variant="h2"
          className="text-center font-semibold text-gray-800"
        >
          {lang === Language.EN ? 'It\'s...' : ''} {card.title}
        </Text>
        {card.description && (
          <Text
            as="p"
            variant="body"
            className="text-center sm:mt-2 text-gray-600 sm:px-10 px-4 whitespace-pre-line"
          >
            {card.description}
          </Text>
        )}
      </div>
      <div className="flex justify-between w-[90%] sm:w-[80%] pl-0.5 mx-auto mt-4 sm:mt-0">
        <Text
          variant="body"
          className="text-purple-900 font-medium"
        >
          {t('cardPage.wishes')}: ({sortedItems.length ?? 0})
        </Text>
        <CardItemsSortDropdown
          items={card.items}
          sortBy={sortBy}
          onSortChange={(s) => setSortBy(s)}
          onSorted={(sorted) => setSortedItems(sorted)}
        />
      </div>
      <CardItemsList items={sortedItems} />
    </>
  )
}
