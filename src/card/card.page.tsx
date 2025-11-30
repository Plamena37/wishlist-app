import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { db } from '@/firebase.config'
import { doc, onSnapshot } from 'firebase/firestore'
import { cn } from '@/lib/utils'
import { Card, CardItem } from '@/lib/types/Cards'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { CARDS_COLLECTION } from '@/lib/constants'
import { loadingMessages } from '@/lib/constants/messages'
import { AddCardItemForm } from '@/card/add-card-item-form'
import { CardItemsList } from '@/card/card-items-list'
import { CardsActionsDropdown } from '@/cards/cards-actions-dropdown'
import {
  CardItemsSortDropdown,
  getSortablePrice,
  SortOption,
} from '@/card/card-items-sort-dropdown'
import { Collapse } from '@/components/ui/collapsible'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'

const HeaderCollapsedChild = () => {
  return (
    <div className="flex w-full px-6 py-4 border-b border-gray-400">
      <div className="flex-[0_0_25%] pr-8 border-r-2 border-gray-400">
        <Text
          as="h5"
          variant="h5"
          className="font-semibold text-gray-400"
        >
          What do I want?
        </Text>
      </div>
      <div className="flex-[0_0_75%] pl-8">
        <div className="flex items-center gap-x-2">
          <Text
            as="h5"
            variant="h5"
            className="font-semibold text-gray-400"
          >
            Add your items here
          </Text>
        </div>
      </div>
    </div>
  )
}

const MobileHeaderCollapsedChild = () => {
  return <div className="py-4"></div>
}

export default function CardPage() {
  const { cardId } = useParams()
  const {
    card,
    setCard,
    getCardById,
    checkUserCanEditCard,
    canEditCard,
    loading,
  } = useCardsContext()
  const { user } = useAuth()
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const navigate = useNavigate()
  const { isSm } = useBreakpoints()

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

  const handleCollapsedChange = (isOpen: boolean) => {
    setIsCollapseOpen(isOpen)
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
        title={loadingMessages.loading_card_title}
        subtitle={loadingMessages.loading_card_subtitle}
      />
    )
  }

  if (!card) return null

  return (
    <>
      {canEditCard && (
        <Collapse
          headerCollapsedChild={
            isSm ? <HeaderCollapsedChild /> : <MobileHeaderCollapsedChild />
          }
          collapsedText="Expand to Add Whishes"
          expandedText={`${isSm ? 'Collapse Form Fields' : ''}`}
          defaultCollapsed={!isCollapseOpen}
          onCollapsedChange={handleCollapsedChange}
        >
          <AddCardItemForm />
        </Collapse>
      )}

      <div className="flex w-full justify-between items-center pt-6 sm:pt-4 px-6 z-50">
        <Button
          variant="link"
          onClick={handleGoBack}
          className="w-auto px-0"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </Button>
        {user?.uid === card.ownerId && (
          <CardsActionsDropdown
            card={card}
            btnBgColor="bg-white"
          />
        )}
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
          className="sm:w-30 sm:h-30 w-20 h-20 mx-auto"
        />
        <Text
          as="h2"
          variant="h2"
          className="text-center font-semibold text-gray-800"
        >
          It's... {card.title}
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
          Items: ({sortedItems.length ?? 0})
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
