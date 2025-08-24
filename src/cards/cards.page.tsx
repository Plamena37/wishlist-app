import { Link } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { useCardsContext } from '@/cards/hooks/useCards'
import { CardsList } from '@/cards/cards-list'
import { AddCardForm } from '@/cards/add-card-form'

const CardsPage = () => {
  const { cards, loading, error } = useCardsContext()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <Link to={ROUTES.HOME}>Go to Home</Link>

      <AddCardForm />

      <CardsList cards={cards} />
    </>
  )
}

export default CardsPage
