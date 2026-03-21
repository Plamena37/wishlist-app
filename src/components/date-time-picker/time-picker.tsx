import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface TimePickerProps extends React.ComponentProps<'input'> {
  error?: boolean
  value?: string | number
}

const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <Input
        className={cn(
          error ? 'bg-background pl-2 border-red-500' : 'bg-background pl-2',
          className
        )}
        id="time-input"
        type="time"
        ref={ref}
        {...props}
      />
    )
  }
)
TimePicker.displayName = 'TimePicker'

export { TimePicker }
