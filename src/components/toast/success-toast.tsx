import { ReactNode, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { cn } from '@/lib/utils'

interface SuccessToastProps {
  children?: ReactNode
  className?: string
  message?: string
  duration?: number
  open?: boolean
  onClose?: () => void
}

export function SuccessToast({
  className,
  message,
  duration = 4000,
  open = true,
  onClose,
  ...props
}: SuccessToastProps) {
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
        'flex items-center justify-center gap-2 rounded-lg bg-green-600 shadow-[0px_4px_8px_rgba(0,0,0,0.25)] px-4 py-2 min-h-10 mx-auto w-[18%]',
        className
      )}
      {...props}
    >
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="h-3.5 w-3.5 text-white"
      />
      <p className="text-sm text-white">{message}</p>
    </div>
  )
}
