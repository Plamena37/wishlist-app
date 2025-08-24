import React, { createContext, useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { Card, CardItem } from '@/lib/types/Cards'
import { EditCardItemFormData } from '@/card/schemas/card-item.schema'
import { EditCardFormData } from '@/cards/schemas/card.schema'
import { addItem, deleteItem, updateItem } from '@/card/services/card-service'
import {
  createCard,
  deleteCard,
  getAllPublicCards,
  getCard,
  updateCard,
} from '@/cards/services/cards-service'

type CardsContextType = {
  cards: Card[]
  card: Card | null
  loading: boolean
  error: Error | null
  canEditCard: boolean
  canReserveCardItem: boolean
  checkUserCanEditCard: (user: User | null) => void
  checkUserCanReserveCardItem: (user: User | null, item: CardItem) => void
  getCardById: (cardId: string) => Promise<void>
  addCardItem: (cardId: string, newItem: Omit<CardItem, 'id'>) => Promise<void>
  updateCardItem: (
    card: Card,
    itemId: string,
    data: EditCardItemFormData,
    cancelEdit?: () => void
  ) => void
  deleteCardItem: (cardId: string, itemId: string) => Promise<void>
  loadingCardItem: boolean
  errorCardItem: Error | null
  addCard: (
    newCard: Omit<Card, 'id' | 'ownerId'>,
    userId: string
  ) => Promise<void>
  editCard: (cardId: string, data: EditCardFormData) => Promise<void>
  removeCard: (cardId: string) => Promise<void>
}

export const CardsContext = createContext<CardsContextType | undefined>(
  undefined
)

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([])
  const [card, setCard] = useState<Card | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [loadingCardItem, setLoadingCardItem] = useState(false)
  const [errorCardItem, setErrorCardItem] = useState<Error | null>(null)

  const [canEditCard, setCanEditCard] = useState<boolean>(false)
  const [canReserveCardItem, setCanReserveCardItem] = useState<boolean>(false)

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

  // CARD ITEMS****************************************************
  const addCardItem = async (cardId: string, newItem: Omit<CardItem, 'id'>) => {
    const addedItem = await addItem(cardId, newItem)
    setCard((prev) =>
      prev?.id === cardId
        ? {
            ...prev,
            items: [
              ...(prev.items ?? []).filter((i) => i.id !== addedItem.id),
              addedItem,
            ],
          }
        : prev
    )
  }

  const updateCardItem = async (
    card: Card,
    itemId: string,
    data: EditCardItemFormData,
    cancelEdit?: () => void
  ) => {
    setLoadingCardItem(true)
    try {
      const updatedItem: Partial<CardItem> = {}

      if (data.name) updatedItem.name = data.name
      if (data.link) updatedItem.link = data.link
      if (data.price) updatedItem.price = data.price
      if (data.reservedBy || data.reservedBy === '')
        updatedItem.reservedBy = data.reservedBy

      const item = await updateItem(card.id, itemId, updatedItem)
      setCard({
        ...card,
        items: (card.items ?? []).map((i) => (i.id === itemId ? item : i)),
      })

      cancelEdit?.()
    } catch (err: Error | unknown) {
      setErrorCardItem(err as Error)
    } finally {
      setLoadingCardItem(false)
    }
  }

  const deleteCardItem = async (cardId: string, itemId: string) => {
    setErrorCardItem(null)
    setLoadingCardItem(true)
    try {
      await deleteItem(cardId, itemId)
      setCard((prev) =>
        prev?.id === cardId
          ? {
              ...prev,
              items: (prev.items ?? []).filter((item) => item.id !== itemId),
            }
          : prev
      )
    } catch (err: Error | unknown) {
      setErrorCardItem(err as Error)
    } finally {
      setLoadingCardItem(false)
    }
  }

  const checkUserCanEditCard = (user: User | null) => {
    if (!user) return
    setCanEditCard(user?.uid === card?.ownerId)
  }

  const checkUserCanReserveCardItem = (user: User | null, item: CardItem) => {
    if (!user) return
    setCanReserveCardItem(item.reservedBy === user?.uid || !item.reservedBy)
  }

  // CARDS****************************************************
  const getCardById = async (cardId: string) => {
    const cardData = await getCard(cardId)
    setCard(cardData)
  }

  const addCard = async (
    card: Omit<Card, 'id' | 'ownerId'>,
    userId: string
  ) => {
    const addedCard = await createCard({ ...card, ownerId: userId })
    setCards((prev) => [...prev, addedCard])
  }

  const editCard = async (cardId: string, data: EditCardFormData) => {
    const updatedCard: Partial<Card> = {}

    if (data.title) updatedCard.title = data.title
    if (data.description) updatedCard.description = data.description
    if (data.isPublic) updatedCard.isPublic = data.isPublic
    // if (data?.items) updatedCard.items = data.items

    const card = await updateCard(cardId, updatedCard)

    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)))
    setCard(card)
  }

  const removeCard = async (cardId: string) => {
    setErrorCardItem(null)
    setLoadingCardItem(true)
    try {
      await deleteCard(cardId)
      setCards((prev) => prev.filter((card) => card.id !== cardId))
    } catch (err: Error | unknown) {
      setErrorCardItem(err as Error)
    } finally {
      setLoadingCardItem(false)
    }
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
        card,
        loading,
        error,
        canEditCard,
        canReserveCardItem,
        checkUserCanEditCard,
        checkUserCanReserveCardItem,
        getCardById,
        addCardItem,
        deleteCardItem,
        updateCardItem,
        loadingCardItem,
        errorCardItem,
        addCard,
        editCard,
        removeCard,
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}
