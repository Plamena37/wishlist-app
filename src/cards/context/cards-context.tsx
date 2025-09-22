import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { nanoid } from 'nanoid'
import { User } from 'firebase/auth'
import { auth, db } from '@/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { CARDS_COLLECTION } from '@/lib/constants'
import { Card, CardItem, NewCard } from '@/lib/types/Cards'
import {
  cardItemMessages,
  cardMessages,
  errorMessages,
} from '@/lib/constants/messages'
import { EditCardItemFormData } from '@/card/schemas/card-item.schema'
import { EditCardFormData } from '@/cards/schemas/card.schema'
import {
  addItem,
  deleteItem,
  reserveItem,
  unreserveItem,
  updateItem as updateItemTransaction,
} from '@/card/services/card-service'
import { useAppSnackbar } from '@/lib/hooks/useAppSnackbar'
import {
  createCard,
  deleteCard,
  fetchAllPublicCards,
  fetchMyCards,
  getCard,
  updateCard,
} from '@/cards/services/cards-service'

type CardsContextType = {
  publicCards: Card[]
  myCards: Card[]
  card: Card | null
  setCard: Dispatch<SetStateAction<Card | null>>
  loading: boolean
  canEditCard: boolean
  canReserveCardItem: boolean
  updatingCardItemId: string
  checkUserCanEditCard: (user: User | null) => void
  checkUserCanReserveCardItem: (user: User | null, item: CardItem) => void
  getAllPublicCards: () => Promise<void>
  getMyCards: (userId: string) => Promise<void>
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
}

export const CardsContext = createContext<CardsContextType | undefined>(
  undefined
)

export const CardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showSuccess, showError } = useAppSnackbar()

  const [publicCards, setPublicCards] = useState<Card[]>([])
  const [myCards, setMyCards] = useState<Card[]>([])
  const [card, setCard] = useState<Card | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingCardItem, setLoadingCardItem] = useState(false)

  const [canEditCard, setCanEditCard] = useState<boolean>(false)
  const [canReserveCardItem, setCanReserveCardItem] = useState<boolean>(false)

  const [updatingCardItemId, setUpdatingCardItemId] = useState<string>('')

  const getAllPublicCards = async () => {
    setLoading(true)
    try {
      const data = await fetchAllPublicCards()
      setPublicCards(data)
    } catch (error) {
      showError((error as Error).message || errorMessages.general_error_title)
    } finally {
      setLoading(false)
    }
  }

  const getMyCards = async (userId: string) => {
    setLoading(true)
    try {
      const data = await fetchMyCards(userId)
      setMyCards(data)
    } catch (error) {
      showError((error as Error).message || errorMessages.general_error_title)
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
      showSuccess(cardItemMessages.item_added)
    } catch (err) {
      showError((err as Error).message || cardItemMessages.item_add_failed)
    }
  }

  const updateCardItem = async (
    card: Card,
    itemId: string,
    data: EditCardItemFormData,
    cancelEdit?: () => void
  ) => {
    setLoadingCardItem(true)
    setUpdatingCardItemId(itemId)
    try {
      const updatedFields: Partial<CardItem> = {}
      updatedFields.name = data.name
      updatedFields.link = data.link
      updatedFields.price = data.price

      let updatedItem: CardItem | null = null

      // If reservedBy is provided in the payload -> do an atomic reserve/unreserve
      if ('reservedBy' in data) {
        // data.reservedBy will be either '' (unreserve) or userId to reserve
        const requested = data.reservedBy

        if (requested === '' || requested == null) {
          const currentUserId = auth?.currentUser?.uid
          if (!currentUserId)
            throw new Error('You must be signed in to unreserve')
          updatedItem = await unreserveItem(card.id, itemId, currentUserId)
        } else {
          updatedItem = await reserveItem(card.id, itemId, requested)
        }
      } else {
        // Normal non-reservation field updates (atomic transaction)
        updatedItem = await updateItemTransaction(
          card.id,
          itemId,
          updatedFields
        )
      }

      if (updatedItem) {
        setCard((prev) =>
          prev
            ? {
                ...prev,
                items: (prev.items ?? []).map((i) =>
                  i.id === itemId ? updatedItem! : i
                ),
              }
            : prev
        )
      }

      showSuccess(cardItemMessages.item_updated)
      cancelEdit?.()
    } catch (err: Error | unknown) {
      // Show better error text for reserve conflict
      const message =
        (err as Error).message || cardItemMessages.item_update_failed

      if (message.includes('reserved')) {
        showError(errorMessages.item_already_reserved)

        // 🔑 1) Re-fetch the card so UI shows the new reservedBy immediately
        const freshSnap = await getDoc(doc(db, CARDS_COLLECTION, card.id))
        if (freshSnap.exists()) {
          const freshCard: Card = {
            ...(freshSnap.data() as Omit<Card, 'id'>),
            id: freshSnap.id,
          }

          // 🔑 2) Update state with the fresh data
          setCard(() => freshCard)
        }
      } else {
        showError(message)
      }
    } finally {
      setLoadingCardItem(false)
      setUpdatingCardItemId('')
    }
  }

  const deleteCardItem = async (cardId: string, itemId: string) => {
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
      showSuccess(cardItemMessages.item_removed)
    } catch (err: Error | unknown) {
      showError((err as Error).message || cardItemMessages.item_remove_failed)
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
    setLoading(true)
    try {
      const cardData = await getCard(cardId)
      setCard(cardData)
    } catch (err) {
      showError((err as Error).message || cardMessages.card_not_found)
    }
    setLoading(false)
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
        setMyCards((prev) => [...prev, addedCard])
      }
      if (!addedCard.isPublic) {
        setMyCards((prev) => [...prev, addedCard])
      }
      showSuccess(cardMessages.card_added)
    } catch (err) {
      showError((err as Error).message || cardMessages.card_add_failed)
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
      setMyCards((prev) => prev.map((c) => (c.id === card.id ? card : c)))
      setCard(card)
      showSuccess(cardMessages.card_updated)
    } catch (err) {
      showError((err as Error).message || cardMessages.card_update_failed)
    }
  }

  const removeCard = async (cardId: string) => {
    setLoadingCardItem(true)
    try {
      await deleteCard(cardId)
      setPublicCards((prev) => prev.filter((card) => card.id !== cardId))
      setMyCards((prev) => prev.filter((card) => card.id !== cardId))
      showSuccess(cardMessages.card_removed)
    } catch (err: Error | unknown) {
      showError((err as Error).message || cardMessages.card_remove_failed)
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
        setCard,
        loading,
        canEditCard,
        canReserveCardItem,
        checkUserCanEditCard,
        checkUserCanReserveCardItem,
        updatingCardItemId,
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
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}
