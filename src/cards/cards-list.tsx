import { Link } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { Card } from '@/lib/types/Cards'
import { useAuth } from '@/auth/hooks/useAuth'
import { DeleteCardDialog } from '@/cards/delete-card-dialog'
import { EditCardDialog } from '@/cards/edit-card-dialog'

interface CardsListProps {
  cards: Card[]
}

export const CardsList = ({ cards }: CardsListProps) => {
  const { user } = useAuth()

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
            <div className="flex gap-2 mt-2">
              <EditCardDialog card={card} />

              <DeleteCardDialog card={card} />
            </div>
          )}
        </div>
      ))}
    </ul>
  )
}
