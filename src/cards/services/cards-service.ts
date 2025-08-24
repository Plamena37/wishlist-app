import { db } from '@/firebase.config'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
} from 'firebase/firestore'
import { CARDS_COLLECTION } from '@/lib/constants'
import { Card } from '@/lib/types/Cards'

const cardsCollection = collection(db, 'cards')

export const getAllCards = async () => {
  const querySnapshot = await getDocs(cardsCollection)
  const cards = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return cards
}

export const getAllPublicCards = async () => {
  const querySnapshot = await getDocs(cardsCollection)
  const cards = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Card[]

  const publicCards = cards.filter((card) => card.isPublic === true)
  return publicCards
}

export const getCard = async (cardId: string): Promise<Card | null> => {
  const docRef = doc(db, CARDS_COLLECTION, cardId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Card
  }
  return null
}

export const createCard = async (data: Omit<Card, 'id' | 'items'>) => {
  const docRef = await addDoc(collection(db, CARDS_COLLECTION), {
    ...data,
    items: [],
  })
  return { id: docRef.id, ...data, items: [] }
}

export const updateCard = async (cardId: string, data: Partial<Card>) => {
  await updateDoc(doc(db, CARDS_COLLECTION, cardId), data)
}

export const deleteCard = async (cardId: string) => {
  await deleteDoc(doc(db, CARDS_COLLECTION, cardId))
}
