import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textVariants = cva(
  'font-sans text-blue-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        h1: 'text-[2.5rem] font-semibold leading-[3.404rem]',
        h2: 'text-[2rem] font-semibold leading-[2.5rem]',
        h3: 'text-2xl font-semibold leading-[2.043rem]',
        h4: 'text-xl font-normal leading-[1.703rem]',
        h5: 'text-base font-normal leading-[1.362rem]',
        body: 'text-sm font-normal',
        'body-sm': 'text-xs font-normal',
        subtext: 'text-[0.625] font-normal',
      },
      weight: {
        regular: 'font-normal',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'body',
      weight: 'regular',
    },
  }
)

export interface TextProps
  extends React.HTMLAttributes<
      HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement
    >,
    VariantProps<typeof textVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

const Text = ({
  className,
  variant,
  weight,
  as = 'span',
  ...props
}: TextProps) => {
  const Comp = as ?? Slot
  return (
    <Comp
      className={cn(textVariants({ variant, weight, className }))}
      {...props}
    />
  )
}

Text.displayName = 'Text'

export { Text, textVariants }
