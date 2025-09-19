import { useNavigate } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { Card } from '@/lib/types/Cards'
import { useAuth } from '@/auth/hooks/useAuth'
import { DeleteCardDialog } from '@/cards/delete-card-dialog'
import { EditCardDialog } from '@/cards/edit-card-dialog'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

interface CardsListProps {
  cards: Card[]
  myCards?: boolean
}

export const CardsList = ({ cards, myCards = false }: CardsListProps) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const navigateTo = (card: Card) => {
    navigate(`${myCards ? ROUTES.MY_CARDS : ROUTES.CARDS}/${card.id}`)
  }

  return (
    <ul className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 py-4 justify-items-center max-w-[1240px] mx-auto">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col justify-start items-center gap-4 bg-white shadow-sm rounded-sm p-4 w-[250px] h-[300px] hover:shadow-lg transition-shadow duration-200"
        >
          <img
            src={card.image}
            alt="Card decoration"
            className="w-20 h-20 object-contain"
          />
          <Text
            as="h5"
            variant="h5"
            className="font-semibold text-purple-900"
          >
            {card.title}
          </Text>

          <Text
            variant="body-sm"
            className="text-gray-600 text-center"
          >
            {card.description && card.description.length > 65
              ? `${card.description.slice(0, 65)}…`
              : card.description}
          </Text>

          <div className="flex flex-col justify-self-end gap-2 mt-auto">
            <Button
              variant="primary"
              onClick={() => navigateTo(card)}
            >
              View Details
            </Button>

            {card.ownerId === user?.uid && (
              <>
                <EditCardDialog card={card} />
                <DeleteCardDialog card={card} />
              </>
            )}
          </div>
        </div>
      ))}
    </ul>
  )
}
