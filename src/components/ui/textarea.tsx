import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  error?: boolean
  value?: string | number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foregroun sm:placeholder:text-sm placeholder:text-xs aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm sm:text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error
            ? 'border-red-600 hover:border-red-700'
            : 'border-gray-600 hover:border-purple-700',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
