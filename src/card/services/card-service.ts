import { db } from '@/firebase.config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
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

export const updateItem = async (
  cardId: string,
  itemId: string,
  updatedFields: Partial<CardItem>
) => {
  const cardRef = doc(db, CARDS_COLLECTION, cardId)
  const cardSnap = await getDoc(cardRef)
  if (!cardSnap.exists()) throw new Error('Card not found')

  const currentItems = cardSnap.data().items || []
  const updatedItems = currentItems.map((item: CardItem) =>
    item.id === itemId ? { ...item, ...updatedFields } : item
  )

  await updateDoc(cardRef, { items: updatedItems })

  return updatedItems.find((i: CardItem) => i.id === itemId)!
}

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
