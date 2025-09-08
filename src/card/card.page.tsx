import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import { useAuth } from '@/auth/hooks/useAuth'
import { useCardsContext } from '@/cards/hooks/useCards'
import { AddCardItemForm } from './add-card-item-form'
import { CardItemsList } from './card-items-list'
import { SuccessToast } from '@/components/toast/success-toast'
import { ErrorToast } from '@/components/toast/error-toast'

export default function CardPage() {
  const { cardId } = useParams()
  const {
    card,
    getCardById,
    checkUserCanEditCard,
    canEditCard,
    loading,
    errorCardItem,
    successCardItem,
    clearSuccessCardItem,
    clearErrorCardItem,
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

  if (!card) return null

  return (
    <div>
      <Link to={ROUTES.CARDS}>Go to Cards</Link>

      {canEditCard && <AddCardItemForm />}

      <CardItemsList
        editingItemId={editingItemId}
        setEditingItemId={setEditingItemId}
      />

      {successCardItem?.status && (
        <SuccessToast
          open={successCardItem.status}
          message={successCardItem.message}
          onClose={clearSuccessCardItem}
        />
      )}
      {errorCardItem?.status && (
        <ErrorToast
          open={errorCardItem.status}
          message={errorCardItem.message}
          onClose={clearErrorCardItem}
        />
      )}
    </div>
  )
}
