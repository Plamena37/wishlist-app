import React, { createContext, useState } from 'react'
import { User } from 'firebase/auth'
import { Card, CardItem, NewCard } from '@/lib/types/Cards'
import { EditCardItemFormData } from '@/card/schemas/card-item.schema'
import { EditCardFormData } from '@/cards/schemas/card.schema'
import { addItem, deleteItem, updateItem } from '@/card/services/card-service'
import {
  createCard,
  deleteCard,
  fetchAllPublicCards,
  fetchMyCards,
  getCard,
  updateCard,
} from '@/cards/services/cards-service'
import { nanoid } from 'nanoid'
import { useAuth } from '@/auth/hooks/useAuth'

type ResultState = {
  status: boolean
  message: string
}

type CardsContextType = {
  publicCards: Card[]
  myCards: Card[]
  card: Card | null
  loading: boolean
  canEditCard: boolean
  canReserveCardItem: boolean
  checkUserCanEditCard: (user: User | null) => void
  checkUserCanReserveCardItem: (user: User | null, item: CardItem) => void
  getAllPublicCards: () => Promise<void>
  getMyCards: () => Promise<void>
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
  addCard: (newCard: NewCard, userId: string, image: string) => Promise<void>
  editCard: (cardId: string, data: EditCardFormData) => Promise<void>
  removeCard: (cardId: string) => Promise<void>
  successCard: ResultState | null
  successCardItem: ResultState | null
  errorCard: ResultState | null
  errorCardItem: ResultState | null
  clearSuccessCard: () => void
  clearSuccessCardItem: () => void
  clearErrorCard: () => void
  clearErrorCardItem: () => void
}

export const CardsContext = createContext<CardsContextType | undefined>(
  undefined
)

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()

  const [publicCards, setPublicCards] = useState<Card[]>([])
  const [myCards, setMyCards] = useState<Card[]>([])
  const [card, setCard] = useState<Card | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingCardItem, setLoadingCardItem] = useState(false)

  const [canEditCard, setCanEditCard] = useState<boolean>(false)
  const [canReserveCardItem, setCanReserveCardItem] = useState<boolean>(false)

  const [successCard, setSuccessCard] = useState<ResultState | null>(null)
  const [successCardItem, setSuccessCardItem] = useState<ResultState | null>(
    null
  )
  const [errorCard, setErrorCard] = useState<ResultState | null>(null)
  const [errorCardItem, setErrorCardItem] = useState<ResultState | null>(null)

  const clearSuccessCard = () => setSuccessCard(null)
  const clearSuccessCardItem = () => setSuccessCardItem(null)
  const clearErrorCard = () => setErrorCard(null)
  const clearErrorCardItem = () => setErrorCardItem(null)

  const getAllPublicCards = async () => {
    setLoading(true)
    try {
      const data = await fetchAllPublicCards()
      setPublicCards(data)
    } catch (error) {
      setErrorCard({
        status: true,
        message: (error as Error).message || 'Something went wrong',
      })
    } finally {
      setLoading(false)
    }
  }

  const getMyCards = async () => {
    setLoading(true)
    try {
      const data = await fetchMyCards(user?.uid || '')
      setMyCards(data)
    } catch (error) {
      setErrorCard({
        status: true,
        message: (error as Error).message || 'Something went wrong',
      })
    } finally {
      setLoading(false)
    }
  }

  // CARD ITEMS****************************************************
  const addCardItem = async (cardId: string, newItem: Omit<CardItem, 'id'>) => {
    try {
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
      setSuccessCardItem({
        status: true,
        message: 'Item added successfully!',
      })
    } catch (err) {
      setErrorCardItem({
        status: true,
        message: (err as Error).message || 'Something went wrong',
      })
    }
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
      setSuccessCardItem({
        status: true,
        message: 'Item updated successfully!',
      })

      cancelEdit?.()
    } catch (err: Error | unknown) {
      setErrorCardItem({
        status: true,
        message: (err as Error).message || 'Something went wrong',
      })
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
      setSuccessCardItem({
        status: true,
        message: 'Item removed successfully!',
      })
    } catch (err: Error | unknown) {
      setErrorCardItem({
        status: true,
        message: (err as Error).message || 'Something went wrong',
      })
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

  const addCard = async (card: NewCard, userId: string, image: string) => {
    const { items, ...cardData } = card

    const cardItems = items?.map((item) => ({
      ...item,
      id: nanoid(),
      reservedBy: '',
    }))

    try {
      const addedCard = await createCard({
        ...cardData,
        items: cardItems,
        ownerId: userId,
        image,
      })

      if (addedCard.isPublic) {
        setPublicCards((prev) => [...prev, addedCard])
      }
      setSuccessCard({ status: true, message: 'Card created successfully!' })
    } catch (err) {
      setErrorCard({
        status: true,
        message: (err as Error).message || 'Something went wrong',
      })
    }
  }

  const editCard = async (cardId: string, data: EditCardFormData) => {
    const updatedCard: Partial<Card> = {}

    try {
      if (data.title) updatedCard.title = data.title
      if (data.description) updatedCard.description = data.description
      if (data.isPublic) updatedCard.isPublic = data.isPublic
      if (data?.items) {
        updatedCard.items = data.items.map((item) => ({
          ...item,
          id: item?.id ?? nanoid(),
          reservedBy: item?.reservedBy ?? '',
        }))
      }

      const card = await updateCard(cardId, updatedCard)

      setPublicCards((prev) => prev.map((c) => (c.id === card.id ? card : c)))
      setCard(card)
      setSuccessCard({ status: true, message: 'Card updated successfully!' })
    } catch (err) {
      setErrorCard({
        status: true,
        message: (err as Error).message || 'Something went wrong',
      })
    }
  }

  const removeCard = async (cardId: string) => {
    setErrorCardItem(null)
    setLoadingCardItem(true)
    try {
      await deleteCard(cardId)
      setPublicCards((prev) => prev.filter((card) => card.id !== cardId))
      setSuccessCard({ status: true, message: 'Card removed successfully!' })
    } catch (err: Error | unknown) {
      setErrorCard({
        status: true,
        message: (err as Error).message || 'Something went wrong',
      })
    } finally {
      setLoadingCardItem(false)
    }
  }

  return (
    <CardsContext.Provider
      value={{
        publicCards,
        myCards,
        card,
        loading,
        canEditCard,
        canReserveCardItem,
        checkUserCanEditCard,
        checkUserCanReserveCardItem,
        getAllPublicCards,
        getMyCards,
        getCardById,
        addCardItem,
        deleteCardItem,
        updateCardItem,
        loadingCardItem,
        addCard,
        editCard,
        removeCard,
        successCard,
        successCardItem,
        errorCard,
        errorCardItem,
        clearSuccessCard,
        clearSuccessCardItem,
        clearErrorCard,
        clearErrorCardItem,
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}
