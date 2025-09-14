import { useCardsContext } from '@/cards/hooks/useCards'
import { CardsList } from '@/cards/cards-list'
import { AddCardForm } from '@/cards/add-card-form'
import { SuccessToast } from '@/components/toast/success-toast'
import { ErrorToast } from '@/components/toast/error-toast'
import { useEffect } from 'react'

const MyCardsPage = () => {
  const {
    getMyCards,
    myCards,
    errorCard,
    successCard,
    clearSuccessCard,
    clearErrorCard,
  } = useCardsContext()

  useEffect(() => {
    getMyCards()
  }, [])

  return (
    <>
      <div className="p-6">
        <AddCardForm />
      </div>

      <CardsList
        cards={myCards}
        myCards
      />

      {successCard?.status && (
        <SuccessToast
          open={successCard.status}
          message={successCard.message}
          onClose={clearSuccessCard}
        />
      )}
      {errorCard?.status && (
        <ErrorToast
          open={errorCard.status}
          message={errorCard.message}
          onClose={clearErrorCard}
        />
      )}
    </>
  )
}

export default MyCardsPage
