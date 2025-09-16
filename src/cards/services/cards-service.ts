import { db } from '@/firebase.config'
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
} from 'firebase/firestore'
import { CARDS_COLLECTION } from '@/lib/constants'
import { Card, NewCard } from '@/lib/types/Cards'

const cardsCollection = collection(db, 'cards')

export const getAllCards = async () => {
  const querySnapshot = await getDocs(cardsCollection)
  const cards = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return cards
}

export const fetchAllPublicCards = async () => {
  const querySnapshot = await getDocs(cardsCollection)
  const cards = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Card[]

  const publicCards = cards.filter((card) => card.isPublic === true)
  return publicCards
}

export const fetchMyCards = async (userId: string) => {
  const querySnapshot = await getDocs(cardsCollection)
  const cards = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Card[]

  const myCards = cards.filter((card) => card.ownerId === userId)
  return myCards
}

export const getCard = async (cardId: string): Promise<Card | null> => {
  const docRef = doc(db, CARDS_COLLECTION, cardId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Card
  }
  return null
}

export const createCard = async (data: NewCard & { ownerId: string }) => {
  const docRef = await addDoc(collection(db, CARDS_COLLECTION), data)
  return { id: docRef.id, ...data }
}

export const updateCard = async (cardId: string, data: Partial<Card>) => {
  const cardRef = doc(db, CARDS_COLLECTION, cardId)
  await updateDoc(cardRef, data)

  const snap = await getDoc(cardRef)
  if (!snap.exists()) throw new Error('Card not found')

  return { id: snap.id, ...snap.data() } as Card
}

export const deleteCard = async (cardId: string) => {
  await deleteDoc(doc(db, CARDS_COLLECTION, cardId))
}
