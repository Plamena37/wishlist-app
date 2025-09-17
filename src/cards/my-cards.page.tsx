import { useEffect, useState } from 'react'
import { errorMessages } from '@/lib/constants/messages'
import { useCardsContext } from '@/cards/hooks/useCards'
import { CardsList } from '@/cards/cards-list'
import { AddCardForm } from '@/cards/add-card-form'
import { Collapse } from '@/components/ui/collapsible'
import { Text } from '@/components/ui/text'
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

const MyCardsPage = () => {
  const { getMyCards, myCards } = useCardsContext()
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)

  const handleCollapsedChange = (isOpen: boolean) => {
    setIsCollapseOpen(isOpen)
  }

  useEffect(() => {
    getMyCards()
  }, [])

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

      {myCards.length === 0 ? (
        <NotFoundCards subtitle={errorMessages.no_my_cards_found_subtitle} />
      ) : (
        <CardsList
          cards={myCards}
          myCards
        />
      )}
    </>
  )
}

export default MyCardsPage
