import { db } from '@/firebase.config'
import { doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { CardItem } from '@/lib/types/Cards'
import { CARDS_COLLECTION } from '@/lib/constants'

export const addItem = async (
  cardId: string,
  newItemData: Omit<CardItem, 'id' | 'reservedBy'>
) => {
  const cardRef = doc(db, CARDS_COLLECTION, cardId)
  const cardSnap = await getDoc(cardRef)
  if (!cardSnap.exists()) throw new Error('Card not found')

  const currentItems = cardSnap.data().items || []

  const newItem = {
    id: nanoid(),
    reservedBy: '',
    ...newItemData,
  }

  const updatedItems = [...currentItems, newItem]
  await updateDoc(cardRef, { items: updatedItems })

  return newItem
}

// export const updateItem = async (
//   cardId: string,
//   itemId: string,
//   updatedFields: Partial<CardItem>
// ) => {
//   const cardRef = doc(db, CARDS_COLLECTION, cardId)
//   const cardSnap = await getDoc(cardRef)
//   if (!cardSnap.exists()) throw new Error('Card not found')

//   const currentItems = cardSnap.data().items || []
//   const updatedItems = currentItems.map((item: CardItem) =>
//     item.id === itemId ? { ...item, ...updatedFields } : item
//   )

//   await updateDoc(cardRef, { items: updatedItems })

//   return updatedItems.find((i: CardItem) => i.id === itemId)!
// }

export const deleteItem = async (cardId: string, itemId: string) => {
  const cardRef = doc(db, CARDS_COLLECTION, cardId)
  const cardSnap = await getDoc(cardRef)
  if (!cardSnap.exists()) throw new Error('Card not found')

  const currentItems = cardSnap.data().items || []
  const updatedItems = currentItems.filter(
    (item: CardItem) => item.id !== itemId
  )

  await updateDoc(cardRef, { items: updatedItems })
}

// Generic transactional update for non-reservation fields
export const updateItem = async (
  cardId: string,
  itemId: string,
  updatedFields: Partial<CardItem>
): Promise<CardItem> => {
  if ('reservedBy' in updatedFields) {
    throw new Error(
      'Do not update reservedBy via updateItem. Use reserveItem/unreserveItem.'
    )
  }

  const cardRef = doc(db, CARDS_COLLECTION, cardId)

  return await runTransaction(db, async (tx) => {
    const snap = await tx.get(cardRef)
    if (!snap.exists()) throw new Error('Card not found')

    const items: CardItem[] = snap.data().items || []
    const idx = items.findIndex((i) => i.id === itemId)
    if (idx === -1) throw new Error('Item not found')

    const updatedItem = { ...items[idx], ...updatedFields }
    const newItems = [...items]
    newItems[idx] = updatedItem

    tx.update(cardRef, { items: newItems })
    return updatedItem
  })
}

// Atomic reserve: only succeed if current reservedBy is empty
export const reserveItem = async (
  cardId: string,
  itemId: string,
  userId: string
): Promise<CardItem> => {
  if (!userId) throw new Error('User id is required to reserve item')

  const cardRef = doc(db, CARDS_COLLECTION, cardId)

  return await runTransaction(db, async (tx) => {
    const snap = await tx.get(cardRef)
    if (!snap.exists()) throw new Error('Card not found')

    const items: CardItem[] = snap.data().items || []
    const idx = items.findIndex((i) => i.id === itemId)
    if (idx === -1) throw new Error('Item not found')

    const current = items[idx]
    if (current.reservedBy && current.reservedBy !== '') {
      throw new Error('Item already reserved')
    }

    const updated = { ...current, reservedBy: userId }
    const newItems = [...items]
    newItems[idx] = updated

    tx.update(cardRef, { items: newItems })
    return updated
  })
}

// Atomic unreserve: only succeed if current reservedBy === userId
export const unreserveItem = async (
  cardId: string,
  itemId: string,
  userId: string
): Promise<CardItem> => {
  if (!userId) throw new Error('User id is required to unreserve item')

  const cardRef = doc(db, CARDS_COLLECTION, cardId)

  return await runTransaction(db, async (tx) => {
    const snap = await tx.get(cardRef)
    if (!snap.exists()) throw new Error('Card not found')

    const items: CardItem[] = snap.data().items || []
    const idx = items.findIndex((i) => i.id === itemId)
    if (idx === -1) throw new Error('Item not found')

    const current = items[idx]
    if (!current.reservedBy || current.reservedBy === '') {
      throw new Error('Item is not reserved')
    }
    if (current.reservedBy !== userId) {
      throw new Error('You cannot unreserve an item reserved by another user')
    }

    const updated = { ...current, reservedBy: '' }
    const newItems = [...items]
    newItems[idx] = updated

    tx.update(cardRef, { items: newItems })
    return updated
  })
}
