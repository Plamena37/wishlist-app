import { useCallback } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { Card } from '@/lib/types/Cards'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { Button } from '@/components/ui/button'

interface CardsListProps {
  cards: Card[]
}

export const CardsList = ({ cards }: CardsListProps) => {
  const { user } = useAuth()
  const { removeCard } = useCardsContext()

  const handleDeleteCard = useCallback(
    (cardId: string) => () => {
      removeCard(cardId)
    },
    [removeCard]
  )

  return (
    <ul>
      {cards.map((card) => (
        <div
          key={card.id}
          className="border-b border-b-slate-200 py-4"
        >
          <Link
            to={`${ROUTES.CARDS}/${card.id}`}
            key={card.id}
            className="flex gap-4"
          >
            <p>Title: {card.title}</p>
            <p>Card Owner: {card.ownerId}</p>
          </Link>

          {card.ownerId === user?.uid && (
            <>
              <Button
                variant="outline"
                // onClick={() => console.log(card.id)}
              >
                Edit
              </Button>
              <Button
                variant="dark"
                onClick={handleDeleteCard(card.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      ))}
    </ul>
  )
}
