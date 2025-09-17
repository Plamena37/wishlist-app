import { useEffect, useState } from 'react'
import { useCardsContext } from '@/cards/hooks/useCards'
import { errorMessages, loadingMessages } from '@/lib/constants/messages'
import { CardsList } from '@/cards/cards-list'
import { AddCardForm } from '@/cards/add-card-form'
import { Collapse } from '@/components/ui/collapsible'
import { Text } from '@/components/ui/text'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'
import { NotFoundCards } from '@/cards/not-found-cards'

const HeaderCollapsedChild = () => {
  return (
    <div className="flex w-full px-6 py-4 border-b border-gray-400">
      <div className="flex-[0_0_25%] pr-8 border-r-2 border-gray-400">
        <Text
          as="h5"
          variant="h5"
          className="font-semibold text-gray-400"
        >
          What do you want?
        </Text>
      </div>
      <div className="flex-[0_0_75%] pl-8">
        <div className="flex items-center gap-x-2">
          <Text
            as="h5"
            variant="h5"
            className="font-semibold text-gray-400"
          >
            Create a New Card
          </Text>
        </div>
      </div>
    </div>
  )
}

const CardsPage = () => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  const { getAllPublicCards, publicCards, loading } = useCardsContext()

  useEffect(() => {
    getAllPublicCards()
  }, [])

  const handleCollapsedChange = (isOpen: boolean) => {
    setIsCollapseOpen(isOpen)
  }

  if (loading) {
    return (
      <LoadingOverlay
        title={loadingMessages.loading_cards_title}
        subtitle={loadingMessages.loading_cards_subtitle}
      />
    )
  }

  return (
    <>
      <Collapse
        headerCollapsedChild={<HeaderCollapsedChild />}
        collapsedText="Expand Form Fields"
        expandedText="Collapse Form Fields"
        defaultCollapsed={!isCollapseOpen}
        onCollapsedChange={handleCollapsedChange}
      >
        <AddCardForm />
      </Collapse>

      {publicCards.length === 0 ? (
        <NotFoundCards subtitle={errorMessages.no_cards_found_subtitle} />
      ) : (
        <CardsList cards={publicCards} />
      )}
    </>
  )
}

export default CardsPage
