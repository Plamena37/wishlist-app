import { useEffect, useMemo, useState } from 'react'
import { CardItem } from '@/lib/types/Cards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Text } from '@/components/ui/text'

export type SortOption =
  | 'titleAsc'
  | 'titleDesc'
  | 'priceAsc'
  | 'priceDesc'
  | 'statusFree'
  | 'statusReserved'

export const getSortablePrice = (price: string | null | undefined) => {
  const num = parseFloat(price || '')
  return isNaN(num) ? -Infinity : num
}

const isFree = (item: CardItem) => !item.reservedBy

interface CardItemsSortDropdownProps {
  items: CardItem[]
  onSorted: (sorted: CardItem[]) => void
  sortBy?: SortOption | null
  onSortChange?: (s: SortOption | null) => void
}
export const CardItemsSortDropdown = ({
  items,
  onSorted,
  sortBy: externalSortBy = null,
  onSortChange,
}: CardItemsSortDropdownProps) => {
  const { t } = useTranslation()
  const [internalSortBy, setInternalSortBy] = useState<SortOption | null>(null)
  const sortBy = externalSortBy ?? internalSortBy

  const applySort = (option: SortOption | null, sourceItems: CardItem[]) => {
    if (!option) return [...sourceItems]
    return [...sourceItems].sort((a, b) => {
      switch (option) {
        case 'titleAsc':
          return a.name.localeCompare(b.name)
        case 'titleDesc':
          return b.name.localeCompare(a.name)
        case 'priceAsc':
          return getSortablePrice(a.price) - getSortablePrice(b.price)
        case 'priceDesc':
          return getSortablePrice(b.price) - getSortablePrice(a.price)
        case 'statusFree': {
          const aFree = isFree(a)
          const bFree = isFree(b)
          if (aFree === bFree) return 0
          return aFree ? -1 : 1
        }
        case 'statusReserved': {
          const aFree = isFree(a)
          const bFree = isFree(b)
          if (aFree === bFree) return 0
          return aFree ? 1 : -1
        }
        default:
          return 0
      }
    })
  }

  const handleSort = (option: SortOption) => {
    if (onSortChange) onSortChange(option)
    else setInternalSortBy(option)
    const sortedItems = applySort(option, items)
    onSorted(sortedItems)
  }

  // when items change and there's a selected sort, re-apply it
  useEffect(() => {
    if (sortBy) {
      onSorted(applySort(sortBy, items))
    }
  }, [items, sortBy])

  const currentLabel = useMemo(() => {
    switch (sortBy) {
      case 'titleAsc':
        return (
          <>
            <Text>{t('cardPage.sortTitle')}</Text>
            <FontAwesomeIcon
              icon={faArrowUp}
              size="sm"
            />
          </>
        )
      case 'titleDesc':
        return (
          <>
            <Text>{t('cardPage.sortTitle')}</Text>
            <FontAwesomeIcon
              icon={faArrowDown}
              size="sm"
            />
          </>
        )
      case 'priceAsc':
        return (
          <>
            <Text>{t('cardPage.sortPrice')}</Text>
            <FontAwesomeIcon
              icon={faArrowUp}
              size="sm"
            />
          </>
        )
      case 'priceDesc':
        return (
          <>
            <Text>{t('cardPage.sortPrice')}</Text>
            <FontAwesomeIcon
              icon={faArrowDown}
              size="sm"
            />
          </>
        )
      case 'statusFree':
        return (
          <>
            <Text>{t('cardPage.sortFree')}</Text>
            <FontAwesomeIcon
              icon={faLockOpen}
              size="sm"
              className="text-gray-700"
            />
          </>
        )
      case 'statusReserved':
        return (
          <>
            <Text>{t('cardPage.sortReserved')}</Text>
            <FontAwesomeIcon
              icon={faLock}
              size="sm"
              className="text-gray-700"
            />
          </>
        )
      default:
        return t('cardPage.sortWishes')
    }
  }, [sortBy])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="outline-none"
      >
        <Button
          variant="outline"
          className="outline-none"
          aria-label="Sorting button"
        >
          {currentLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSort('titleAsc')}>
          <Text>{t('cardPage.sortTitle')}</Text>
          <FontAwesomeIcon
            icon={faArrowUp}
            size="sm"
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('titleDesc')}>
          <Text>{t('cardPage.sortTitle')}</Text>
          <FontAwesomeIcon
            icon={faArrowDown}
            size="sm"
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('priceAsc')}>
          <Text>{t('cardPage.sortPrice')}</Text>
          <FontAwesomeIcon
            icon={faArrowUp}
            size="sm"
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('priceDesc')}>
          <Text>{t('cardPage.sortPrice')}</Text>
          <FontAwesomeIcon
            icon={faArrowDown}
            size="sm"
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('statusFree')}>
          <Text>{t('cardPage.sortFree')}</Text>
          <FontAwesomeIcon
            icon={faLockOpen}
            size="sm"
            className="text-gray-700"
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSort('statusReserved')}>
          <Text>{t('cardPage.sortReserved')}</Text>
          <FontAwesomeIcon
            icon={faLock}
            size="sm"
            className="text-gray-700"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
