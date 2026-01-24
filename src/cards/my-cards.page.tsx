import { useEffect } from 'react'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { CardsList } from '@/cards/cards-list'
import { NotFoundCards } from '@/cards/not-found-cards'
import { AddCardDialog } from '@/cards/add-card-dialog'
import { SignInOverlay } from '@/components/overlay/sign-in-overlay'

const MyCardsPage = () => {
  const { user } = useAuth()
  const { getMyCards, myCards, loading, showSignInDialog } = useCardsContext()

  useEffect(() => {
    getMyCards(user?.uid || '')
  }, [user])

  return (
    <>
      <AddCardDialog />

      {myCards.length === 0 && !loading ? (
        <NotFoundCards />
      ) : (
        <CardsList
          cards={myCards}
          myCards
        />
      )}

      {showSignInDialog && <SignInOverlay />}
    </>
  )
}

export default MyCardsPage
