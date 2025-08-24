import { useState, useEffect } from 'react'
import { Card } from '@/lib/types/Cards'
import { getAllPublicCards } from '@/cards/services/cards-service'

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllPublicCards()
        setCards(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  return { cards, loading, error }
}
