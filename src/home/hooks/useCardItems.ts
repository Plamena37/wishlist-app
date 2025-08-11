import { useContext } from 'react'
import { CardItemsContext } from '@/home/context/card-items-context'

export const useCardItemsContext = () => {
  const context = useContext(CardItemsContext)
  if (!context) {
    throw new Error(
      'useCardItemsContext must be used within a CardItemsProvider'
    )
  }
  return context
}
