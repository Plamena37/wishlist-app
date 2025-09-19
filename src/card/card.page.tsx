import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { loadingMessages } from '@/lib/constants/messages'
import { AddCardItemForm } from '@/card/add-card-item-form'
import { CardItemsList } from '@/card/card-items-list'
import { Collapse } from '@/components/ui/collapsible'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { EditCardDialog } from '@/cards/edit-card-dialog'
import { DeleteCardDialog } from '@/cards/delete-card-dialog'
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
  const { card, getCardById, checkUserCanEditCard, canEditCard, loading } =
    useCardsContext()
  const { user } = useAuth()
  const [isCollapseOpen, setIsCollapseOpen] = useState(false)
  const navigate = useNavigate()
  const { isSm } = useBreakpoints()

  const handleCollapsedChange = (isOpen: boolean) => {
    setIsCollapseOpen(isOpen)
  }

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
          collapsedText="Expand Form Fields"
          expandedText={`${isSm ? 'Collapse Form Fields' : ''}`}
          defaultCollapsed={!isCollapseOpen}
          onCollapsedChange={handleCollapsedChange}
        >
          <AddCardItemForm />
        </Collapse>
      )}

      <div className="flex justify-between items-center pt-4 px-6 z-50">
        <Button
          variant="link"
          onClick={handleGoBack}
          className="w-auto px-0"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </Button>
        {user?.uid === card.ownerId && (
          <div className="flex items-center gap-2">
            <EditCardDialog card={card} />
            <DeleteCardDialog card={card} />
          </div>
        )}
      </div>

      <div
        className={cn(
          'flex flex-col items-center gap-4',
          user?.uid === card.ownerId ? 'mt-[-30px]' : 'mt-0'
        )}
      >
        <img
          src={card.image}
          alt="Card decoration"
          className="w-30 h-30 mx-auto"
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
            className="text-center mt-2 text-gray-600 px-10"
          >
            {card.description}
          </Text>
        )}
      </div>

      <CardItemsList />
    </>
  )
}
