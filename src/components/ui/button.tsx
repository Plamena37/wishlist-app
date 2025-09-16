import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors hover:cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-purple-800 text-white hover:bg-purple-800/90 focus-visible:ring-purple-800 disabled:bg-disabled-background disabled:text-disabled-foreground',
        secondary:
          'bg-white text-purple-700 border border-purple-700 disabled:border-disabled-border disabled:text-disabled-foreground',
        dark: 'bg-purple-800 text-white hover:bg-purple-800/90 focus-visible:ring-purple-800',
        'dark-secondary':
          'bg-white text-purple-700 border border-purple-700 hover:text-purple-700/90 hover:border-purple-700/90 focus-visible:ring-purple-700',
        alternate: 'bg-gray-300 text-gray-600',
        userbtn:
          'rounded-none bg-purple-300 hover:bg-purple-400 text-purple-900',
        ghost:
          'bg-transparent text-purple-900 hover:text-purple-900/80 focus-visible:ring-0 focus-visible:ring-transparent hover:bg-gray-200 disabled:text-gray-500 disabled:opacity-50',
        link: 'text-purple-600 underline-offset-4 hover:underline',
        outline:
          'bg-transparent text-text-primary border border-gray-500 rounded-sm hover:bg-purple-800/10 focus-visible:ring-purple-700',
      },
      height: {
        sm: 'h-6',
        md: 'h-8',
        lg: 'h-10',
        xl: 'h-12',
      },
      length: {
        sm: 'w-32',
        md: 'w-50',
        lg: 'w-62',
        xl: 'w-70',
      },
      size: {
        default: 'h-6 px-4',
        sm: 'h-8 px-3',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      height: 'sm',
      length: 'sm',
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
