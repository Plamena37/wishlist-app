export interface Card {
  id: string
  ownerId: string
  title: string
  description?: string
  date: string | Date
  time?: string
  location?: string
  isPublic: boolean
  image: string
  items: CardItem[]
  createdAt?: Date | string
  lastUpdatedAt?: Date | string
}

export interface CardItem {
  id: string
  name: string
  link?: string | null
  price?: string | null
  reservedBy: string
  createdAt?: Date | string
  lastUpdatedAt?: Date | string
}

export type NewCard = Omit<Card, 'id' | 'ownerId'> & {
  items?: NewCardItem[]
}

export type NewCardItem = Omit<CardItem, 'id' | 'reservedBy'>
