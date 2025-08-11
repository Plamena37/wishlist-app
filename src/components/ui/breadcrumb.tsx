import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Text } from '@/components/ui/text'
import { Link } from 'react-router'
// import { Referral } from '@/referrals/types/Referrals'
import { faGrinBeamSweat } from '@fortawesome/free-regular-svg-icons'

export interface BreadcrumbItemData {
  label: string
  href?: string
  state?: unknown
}
export interface BreadcrumbRendererProps {
  breadcrumb: BreadcrumbItemData[]
}

const BreadcrumbRenderer = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    {...props}
  />
))

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-[8px] break-words',
      className
    )}
    {...props}
  />
))

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-[8px]', className)}
    {...props}
  />
))

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors', className)}
      {...props}
    />
  )
})

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    data-testid="breadcrumb-separator"
    aria-hidden="true"
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
    {...props}
  >
    {children ?? <FontAwesomeIcon icon={faGrinBeamSweat} />}
  </li>
)

const Breadcrumb = ({ breadcrumb }: BreadcrumbRendererProps) => {
  return (
    <BreadcrumbRenderer data-testid="breadcrumb-indicator">
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {item?.href ? (
                  <Link
                    to={item.href}
                    data-testid="breadcrumb-link"
                    state={{ referral: item.state }} // Temporary placeholder until data is fetched from an API
                  >
                    <Text
                      as="h4"
                      variant="h4"
                      weight="semibold"
                      data-testid="breadcrumb-text"
                    >
                      {item?.label}
                    </Text>
                  </Link>
                ) : (
                  <Text
                    as="h4"
                    variant="h4"
                    weight="semibold"
                    data-testid="breadcrumb-text"
                  >
                    {item?.label}
                  </Text>
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRenderer>
  )
}

Breadcrumb.displayName = 'Breadcrumb'

export { Breadcrumb }
