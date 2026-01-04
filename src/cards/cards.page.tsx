import { useEffect } from 'react'
import { useCardsContext } from '@/cards/hooks/useCards'
import { errorMessages, loadingMessages } from '@/lib/constants/messages'
import { CardsList } from '@/cards/cards-list'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'
import { NotFoundCards } from '@/cards/not-found-cards'
import { AddCardDialog } from '@/cards/add-card-dialog'
import { SignInOverlay } from '@/components/overlay/sign-in-overlay'

const CardsPage = () => {
  const { getAllPublicCards, publicCards, loading, showSignInDialog } =
    useCardsContext()

  useEffect(() => {
    getAllPublicCards()
  }, [])

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
      <AddCardDialog />

      {publicCards.length === 0 ? (
        <NotFoundCards subtitle={errorMessages.no_cards_found_subtitle} />
      ) : (
        <CardsList cards={publicCards} />
      )}

      {showSignInDialog && <SignInOverlay />}
    </>
  )
}

export default CardsPage
