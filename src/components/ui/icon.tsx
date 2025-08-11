import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const svgVariants = cva('inline-flex items-center justify-center', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-8',
      lg: 'size-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface IconProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof svgVariants> {
  className?: string
  src?: string
}

const Icon = React.forwardRef<HTMLImageElement, IconProps>(
  ({ className, size = 'md', src, ...props }, ref) => {
    const dimentions = {
      sm: 16,
      md: 32,
      lg: 64,
    }

    return (
      <img
        className={cn(svgVariants({ size, className }))}
        ref={ref}
        width={dimentions[size!]}
        height={dimentions[size!]}
        src={src}
        {...props}
      />
    )
  }
)

export { Icon }
