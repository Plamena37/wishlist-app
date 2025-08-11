import React, { createContext, useState, useEffect } from 'react'
import { Card, CardItem } from '@/lib/types/Cards'
import { getAllPublicCards } from '@/services/cards-service'
import {
  addCardItem,
  deleteCardItem,
  updateCardItem,
} from '@/services/card-items-service'

type CardItemsContextType = {
  cards: Card[]
  loading: boolean
  error: Error | null
  addItem: (cardId: string, newItem: Omit<CardItem, 'id'>) => Promise<void>
  updateItem: (
    cardId: string,
    itemId: string,
    updatedItem: Partial<CardItem>
  ) => Promise<void>
  deleteItem: (cardId: string, itemId: string) => Promise<void>
}

export const CardItemsContext = createContext<CardItemsContextType | undefined>(
  undefined
)

export const CardItemsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const addItem = async (cardId: string, newItem: Omit<CardItem, 'id'>) => {
    const addedItem = await addCardItem(cardId, newItem)
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, items: [...card.items, addedItem] }
          : card
      )
    )
  }

  const updateItem = async (
    cardId: string,
    itemId: string,
    updatedItem: Partial<CardItem>
  ) => {
    const item = await updateCardItem(cardId, itemId, updatedItem)
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              items: card.items.map((i) => (i.id === itemId ? item : i)),
            }
          : card
      )
    )
  }

  const deleteItem = async (cardId: string, itemId: string) => {
    await deleteCardItem(cardId, itemId)
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              items: card.items.filter((item) => item.id !== itemId),
            }
          : card
      )
    )
  }

  return (
    <CardItemsContext.Provider
      value={{ cards, loading, error, addItem, updateItem, deleteItem }}
    >
      {children}
    </CardItemsContext.Provider>
  )
}
