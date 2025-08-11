export interface Card {
  id: string
  ownerId: string
  title: string
  description?: string
  isPublic: boolean
  items: CardItem[]
}

export interface CardItem {
  id: string
  name: string
  link?: string
  price: number
  reservedBy: null | string
}
