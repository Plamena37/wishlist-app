import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { Text } from '@/components/ui/text'

interface ErrorToastProps {
  open: boolean
  message: string
  duration?: number
  onClose?: () => void
  className?: string
}

export const ErrorToast = ({
  open,
  message,
  duration = 4000,
  onClose,
  className,
  ...props
}: ErrorToastProps) => {
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    setVisible(open)
    if (open) {
      const timer = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, onClose])

  if (!visible) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 rounded-lg bg-red-200 shadow-[0px_4px_8px_rgba(0,0,0,0.25)] px-4 py-2 min-h-10 mx-auto w-[18%]',
        className
      )}
      {...props}
    >
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className="text-blue-900"
        style={{
          width: '16px',
          height: '16px',
        }}
        data-testid="error-toast-exclamation-icon"
      />

      <Text
        className="text-sm text-blue-900"
        variant={'subtext'}
        data-testid="error-toast-message"
      >
        {message}
      </Text>

      {/* <FontAwesomeIcon
        icon={faCircleStop}
        className="text-blue-900 ml-auto cursor-pointer"
        onClick={onClose}
        style={{
          width: '16px',
          height: '18px',
        }}
        data-testid="error-toast-close-icon"
      /> */}
    </div>
  )
}
