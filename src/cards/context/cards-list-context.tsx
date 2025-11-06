// import React, { createContext, useState } from 'react'
// import { Card, NewCard } from '@/lib/types/Cards'
// import {
//   fetchAllPublicCards,
//   fetchMyCards,
//   createCard,
//   updateCard,
//   deleteCard,
// } from '@/cards/services/cards-service'
// import { useAppSnackbar } from '@/lib/hooks/useAppSnackbar'
// import { cardMessages, errorMessages } from '@/lib/constants/messages'
// import { nanoid } from 'nanoid'
// import { EditCardFormData } from '@/cards/schemas/card.schema'

// type CardsListContextType = {
//   publicCards: Card[]
//   myCards: Card[]
//   loading: boolean
//   getAllPublicCards: () => Promise<void>
//   getMyCards: (userId: string) => Promise<void>
//   addCard: (newCard: NewCard, userId: string, image: string) => Promise<void>
//   editCard: (cardId: string, data: EditCardFormData) => Promise<void>
//   removeCard: (cardId: string) => Promise<void>
// }

// export const CardsListContext = createContext<CardsListContextType | undefined>(
//   undefined
// )

// export const CardsListProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { showSuccess, showError } = useAppSnackbar()
//   const [publicCards, setPublicCards] = useState<Card[]>([])
//   const [myCards, setMyCards] = useState<Card[]>([])
//   const [loading, setLoading] = useState(false)

//   const getAllPublicCards = async () => {
//     setLoading(true)
//     try {
//       const data = await fetchAllPublicCards()
//       setPublicCards(data)
//     } catch (e) {
//       showError((e as Error).message || errorMessages.general_error_title)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getMyCards = async (userId: string) => {
//     setLoading(true)
//     try {
//       const data = await fetchMyCards(userId)
//       setMyCards(data)
//     } catch (e) {
//       showError((e as Error).message || errorMessages.general_error_title)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addCard = async (card: NewCard, userId: string, image: string) => {
//     try {
//       const items = card.items?.map((i) => ({
//         ...i,
//         id: nanoid(),
//         reservedBy: '',
//       }))
//       const added = await createCard({ ...card, items, ownerId: userId, image })
//       if (added.isPublic) setPublicCards((prev) => [...prev, added])
//       setMyCards((prev) => [...prev, added])
//       showSuccess(cardMessages.card_added)
//     } catch (e) {
//       showError((e as Error).message || cardMessages.card_add_failed)
//     }
//   }

//   const editCard = async (cardId: string, data: EditCardFormData) => {
//     try {
//       const updated = await updateCard(cardId, data)
//       setPublicCards((prev) =>
//         prev.map((c) => (c.id === updated.id ? updated : c))
//       )
//       setMyCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
//       showSuccess(cardMessages.card_updated)
//     } catch (e) {
//       showError((e as Error).message || cardMessages.card_update_failed)
//     }
//   }

//   const removeCard = async (cardId: string) => {
//     try {
//       await deleteCard(cardId)
//       setPublicCards((prev) => prev.filter((c) => c.id !== cardId))
//       setMyCards((prev) => prev.filter((c) => c.id !== cardId))
//       showSuccess(cardMessages.card_removed)
//     } catch (e) {
//       showError((e as Error).message || cardMessages.card_remove_failed)
//     }
//   }

//   return (
//     <CardsListContext.Provider
//       value={{
//         publicCards,
//         myCards,
//         loading,
//         getAllPublicCards,
//         getMyCards,
//         addCard,
//         editCard,
//         removeCard,
//       }}
//     >
//       {children}
//     </CardsListContext.Provider>
//   )
// }
