export interface Card {
  id: string
  ownerId: string
  title: string
  description?: string
  isPublic: boolean
  items?: CardItem[]
}

export interface CardItem {
  id: string
  name: string
  link?: string
  price?: string | null
  reservedBy: string
}

export type NewCard = Omit<Card, 'id' | 'ownerId'> & {
  items?: NewCardItem[]
}

export type NewCardItem = Omit<CardItem, 'id' | 'reservedBy'>
