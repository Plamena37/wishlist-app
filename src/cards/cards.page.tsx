import { Link } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { useCardsContext } from '@/cards/hooks/useCards'
import { CardsList } from '@/cards/cards-list'
import { AddCardForm } from '@/cards/add-card-form'
import { SuccessToast } from '@/components/toast/success-toast'
import { ErrorToast } from '@/components/toast/error-toast'

const CardsPage = () => {
  const {
    cards,
    loading,
    errorCard,
    successCard,
    clearSuccessCard,
    clearErrorCard,
  } = useCardsContext()

  if (loading) return <p>Loading...</p>

  return (
    <>
      <Link to={ROUTES.HOME}>Go to Home</Link>

      <div className="p-6">
        <AddCardForm />
      </div>

      <CardsList cards={cards} />

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

export default CardsPage
