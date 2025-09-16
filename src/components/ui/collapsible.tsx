import { useState } from 'react'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { Text } from './text'

export interface CollapseProps {
  children: React.ReactNode | React.ReactNode[]
  collapsedText?: string
  expandedText?: string
  headerCollapsedChild?: React.ReactNode
  className?: string
  defaultCollapsed?: boolean
  onCollapsedChange: (isOpen: boolean) => void
}

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

const Collapse = ({
  children,
  collapsedText = 'Collapsed State',
  expandedText = 'Expanded State',
  headerCollapsedChild,
  className,
  defaultCollapsed = true,
  onCollapsedChange,
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(!defaultCollapsed)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onCollapsedChange(open)
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={cn(
        'w-full space-y-2 flex items-start flex-col relative',
        isOpen ? 'flex-row-reverse' : null,
        className
      )}
    >
      {!isOpen ? headerCollapsedChild : null}
      <div className="py-4 px-6 absolute right-0">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full hover:bg-transparent px-0"
            data-testid="collapsible-trigger-button"
          >
            <Text
              className="text-sm font-semibold text-purple-800"
              as="p"
              variant="body"
              data-testid="collapsible-trigger-button-text"
            >
              {isOpen ? expandedText : collapsedText}
              <FontAwesomeIcon
                icon={isOpen ? faChevronUp : faChevronDown}
                className="text-purple-800 ml-2"
              />
            </Text>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="w-full space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

Collapse.displayName = 'Collapse'

export { Collapse }
