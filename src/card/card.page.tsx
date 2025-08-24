import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { AddCardItemForm } from './add-card-item-form'
import { CardItemsList } from './card-items-list'

export default function CardPage() {
  const { cardId } = useParams()
  const {
    card,
    getCardById,
    checkUserCanEditCard,
    canEditCard,
    loading,
    error,
  } = useCardsContext()
  const { user } = useAuth()

  useEffect(() => {
    if (cardId) {
      getCardById(cardId)
      checkUserCanEditCard(user)
    }
  }, [cardId, user, checkUserCanEditCard, getCardById])

  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  if (!card) return null

  return (
    <div>
      <Link to={ROUTES.CARDS}>Go to Cards</Link>

      {canEditCard && <AddCardItemForm />}

      <CardItemsList
        editingItemId={editingItemId}
        setEditingItemId={setEditingItemId}
      />
    </div>
  )
}
