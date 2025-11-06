// import React, { createContext, useState, Dispatch, SetStateAction } from 'react'
// import { User } from 'firebase/auth'
// import { doc, getDoc } from 'firebase/firestore'
// import { auth, db } from '@/firebase.config'
// import { CARDS_COLLECTION } from '@/lib/constants'
// import { Card, CardItem } from '@/lib/types/Cards'
// import {
//   addItem,
//   deleteItem,
//   reserveItem,
//   unreserveItem,
//   updateItem as updateItemTransaction,
// } from '@/card/services/card-service'
// import { getCard } from '@/cards/services/cards-service'
// import { EditCardItemFormData } from '@/card/schemas/card-item.schema'
// import { useAppSnackbar } from '@/lib/hooks/useAppSnackbar'
// import {
//   cardItemMessages,
//   errorMessages,
//   cardMessages,
// } from '@/lib/constants/messages'

// type CardContextType = {
//   card: Card | null
//   setCard: Dispatch<SetStateAction<Card | null>>
//   loading: boolean
//   loadingItem: boolean
//   updatingItemId: string
//   canEditCard: boolean
//   canReserveItem: boolean
//   getCardById: (id: string) => Promise<void>
//   addCardItem: (cardId: string, newItem: Omit<CardItem, 'id'>) => Promise<void>
//   updateCardItem: (
//     card: Card,
//     itemId: string,
//     data: EditCardItemFormData,
//     cancelEdit?: () => void
//   ) => Promise<void>
//   deleteCardItem: (cardId: string, itemId: string) => Promise<void>
//   checkUserCanEditCard: (user: User | null) => void
//   checkUserCanReserveCardItem: (user: User | null, item: CardItem) => void
// }

// export const CardContext = createContext<CardContextType | undefined>(undefined)

// export const CardProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { showSuccess, showError } = useAppSnackbar()
//   const [card, setCard] = useState<Card | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [loadingItem, setLoadingItem] = useState(false)
//   const [updatingItemId, setUpdatingItemId] = useState('')
//   const [canEditCard, setCanEditCard] = useState(false)
//   const [canReserveItem, setCanReserveItem] = useState(false)

//   const getCardById = async (id: string) => {
//     setLoading(true)
//     try {
//       const c = await getCard(id)
//       setCard(c)
//     } catch (e) {
//       showError((e as Error).message || cardMessages.card_not_found)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addCardItem = async (cardId: string, newItem: Omit<CardItem, 'id'>) => {
//     try {
//       const added = await addItem(cardId, newItem)
//       setCard((prev) =>
//         prev ? { ...prev, items: [...(prev.items ?? []), added] } : prev
//       )
//       showSuccess(cardItemMessages.item_added)
//     } catch (e) {
//       showError((e as Error).message || cardItemMessages.item_add_failed)
//     }
//   }

//   const updateCardItem = async (
//     c: Card,
//     itemId: string,
//     data: EditCardItemFormData,
//     cancelEdit?: () => void
//   ) => {
//     setLoadingItem(true)
//     setUpdatingItemId(itemId)
//     try {
//       let updated: CardItem | null = null
//       if ('reservedBy' in data) {
//         const requested = data.reservedBy
//         if (!requested) {
//           const uid = auth.currentUser?.uid
//           if (!uid) throw new Error('Must be signed in to unreserve')
//           updated = await unreserveItem(c.id, itemId, uid)
//         } else {
//           updated = await reserveItem(c.id, itemId, requested)
//         }
//       } else {
//         updated = await updateItemTransaction(c.id, itemId, data)
//       }
//       if (updated) {
//         setCard((prev) =>
//           prev
//             ? {
//                 ...prev,
//                 items: prev.items.map((i) => (i.id === itemId ? updated! : i)),
//               }
//             : prev
//         )
//       }
//       showSuccess(cardItemMessages.item_updated)
//       cancelEdit?.()
//     } catch (e) {
//       const msg = (e as Error).message
//       if (msg.includes('reserved')) {
//         showError(errorMessages.item_already_reserved)
//         const fresh = await getDoc(doc(db, CARDS_COLLECTION, c.id))
//         if (fresh.exists())
//           setCard({ ...(fresh.data() as Omit<Card, 'id'>), id: fresh.id })
//       } else {
//         showError(msg || cardItemMessages.item_update_failed)
//       }
//     } finally {
//       setLoadingItem(false)
//       setUpdatingItemId('')
//     }
//   }

//   const deleteCardItem = async (cardId: string, itemId: string) => {
//     setLoadingItem(true)
//     try {
//       await deleteItem(cardId, itemId)
//       setCard((prev) =>
//         prev
//           ? { ...prev, items: prev.items.filter((i) => i.id !== itemId) }
//           : prev
//       )
//       showSuccess(cardItemMessages.item_removed)
//     } catch (e) {
//       showError((e as Error).message || cardItemMessages.item_remove_failed)
//     } finally {
//       setLoadingItem(false)
//     }
//   }

//   const checkUserCanEditCard = (user: User | null) => {
//     if (user && card) setCanEditCard(user.uid === card.ownerId)
//   }

//   const checkUserCanReserveCardItem = (user: User | null, item: CardItem) => {
//     if (user)
//       setCanReserveItem(item.reservedBy === user.uid || !item.reservedBy)
//   }

//   return (
//     <CardContext.Provider
//       value={{
//         card,
//         setCard,
//         loading,
//         loadingItem,
//         updatingItemId,
//         canEditCard,
//         canReserveItem,
//         getCardById,
//         addCardItem,
//         updateCardItem,
//         deleteCardItem,
//         checkUserCanEditCard,
//         checkUserCanReserveCardItem,
//       }}
//     >
//       {children}
//     </CardContext.Provider>
//   )
// }
