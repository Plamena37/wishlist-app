export interface Card {
  id: string
  ownerId: string
  title: string
  description?: string
  isPublic: boolean
  image: string
  items?: CardItem[]
}

export interface CardItem {
  id: string
  name: string
  link?: string | null
  price?: string | null
  reservedBy: string
}

export type NewCard = Omit<Card, 'id' | 'ownerId'> & {
  items?: NewCardItem[]
}

export type NewCardItem = Omit<CardItem, 'id' | 'reservedBy'>
