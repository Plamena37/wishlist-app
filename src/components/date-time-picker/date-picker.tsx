import * as React from 'react'
import { format } from 'date-fns'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface DatePickerProps
  extends Omit<React.ComponentProps<'button'>, 'onChange'> {
  error?: boolean
  value?: string | number
  className?: string
  onChange?: (date: string) => void
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    const date = props.value ? new Date(props.value as string) : undefined

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full justify-between font-normal', className)}
            ref={ref}
          >
            {date ? format(date, 'PPP') : 'Select date'}
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            defaultMonth={date}
            disabled={{ before: new Date() }}
            onSelect={(selectedDate) => {
              if (!selectedDate) return
              const year = selectedDate.getFullYear()
              const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
              const day = String(selectedDate.getDate()).padStart(2, '0')

              const localDateStr = `${year}-${month}-${day}`

              props.onChange?.(localDateStr)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = 'DatePicker'

export { DatePicker }
