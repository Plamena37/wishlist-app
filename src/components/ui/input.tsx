import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.ComponentProps<'input'> {
  error?: boolean
  value?: string | number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-8 w-full px-2 py-1.5 rounded-sm text-sm text-blue-900 border-1 outline-0 focus:border-purple-700 bg-transparent placeholder:text-gray-600 transition-colors disabled:bg-gray-300 disabled:border-0 disabled:cursor-not-allowed sm:placeholder:text-sm placeholder:text-xs',
          error
            ? 'border-red-600 hover:border-red-700'
            : 'border-gray-600 hover:border-purple-800',
          className
        )}
        ref={ref}
        autoFocus={false}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
