import { useMemo, useState } from 'react'
import { CardItem } from '@/lib/types/Cards'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Text } from '@/components/ui/text'

type SortOption = 'titleAsc' | 'titleDesc' | 'priceAsc' | 'priceDesc'

const getSortablePrice = (price: string | null | undefined) => {
  const num = parseFloat(price || '')
  return isNaN(num) ? -Infinity : num
}

interface CardItemsSortDropdownProps {
  items: CardItem[]
  onSorted: (sorted: CardItem[]) => void
}
export const CardItemsSortDropdown = ({
  items,
  onSorted,
}: CardItemsSortDropdownProps) => {
  const [sortBy, setSortBy] = useState<SortOption | null>(null)

  const handleSort = (option: SortOption) => {
    setSortBy(option)

    const sortedItems = [...items].sort((a, b) => {
      switch (option) {
        case 'titleAsc':
          return a.name.localeCompare(b.name)
        case 'titleDesc':
          return b.name.localeCompare(a.name)
        case 'priceAsc': // low → high
          return getSortablePrice(a.price) - getSortablePrice(b.price)
        case 'priceDesc': // high → low
          return getSortablePrice(b.price) - getSortablePrice(a.price)
      }
    })

    onSorted(sortedItems)
  }

  const currentLabel = useMemo(() => {
    switch (sortBy) {
      case 'titleAsc':
        return (
          <>
            <Text>Title</Text>
            <FontAwesomeIcon
              icon={faArrowUp}
              size="sm"
            />
          </>
        )
      case 'titleDesc':
        return (
          <>
            <Text>Title</Text>
            <FontAwesomeIcon
              icon={faArrowDown}
              size="sm"
            />
          </>
        )
      case 'priceAsc':
        return (
          <>
            <Text>Price</Text>
            <FontAwesomeIcon
              icon={faArrowUp}
              size="sm"
            />
          </>
        )
      case 'priceDesc':
        return (
          <>
            <Text>Price</Text>
            <FontAwesomeIcon
              icon={faArrowDown}
              size="sm"
            />
          </>
        )
      default:
        return 'Sort Items'
    }
  }, [sortBy])

  return (
    <div className="flex justify-center sm:justify-end w-[90%] sm:w-[80%] mx-auto mt-2 sm:mt-0">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="outline-none"
        >
          <Button
            variant="outline"
            className="outline-none"
          >
            {currentLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSort('titleAsc')}>
            <Text>Title</Text>
            <FontAwesomeIcon
              icon={faArrowUp}
              size="sm"
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort('titleDesc')}>
            <Text>Title</Text>
            <FontAwesomeIcon
              icon={faArrowDown}
              size="sm"
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort('priceAsc')}>
            <Text>Price</Text>
            <FontAwesomeIcon
              icon={faArrowUp}
              size="sm"
            />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort('priceDesc')}>
            <Text>Price</Text>
            <FontAwesomeIcon
              icon={faArrowDown}
              size="sm"
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
