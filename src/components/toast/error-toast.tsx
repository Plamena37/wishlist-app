import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleStop,
  faFileExcel,
  // faExclamationCircle,
} from '@fortawesome/free-regular-svg-icons'
import { Text } from '@/components/ui/text'

interface ErrorToastProps {
  open: boolean
  message: string
  onClose: () => void
  className?: string
}

export const ErrorToast = ({
  open,
  message,
  onClose,
  className,
  ...props
}: ErrorToastProps) => {
  if (!open) return null

  return (
    <div
      className={cn(
        'flex items-center gap-2 bg-red-200 px-8 py-[11px] w-full h-10',

        className
      )}
      {...props}
    >
      <FontAwesomeIcon
        icon={faFileExcel}
        className="text-blue-900"
        style={{
          width: '16px',
          height: '16px',
        }}
        data-testid="error-toast-exclamation-icon"
      />

      <Text
        className="text-sm text-blue-900"
        variant={'body'}
        data-testid="error-toast-message"
      >
        {message}
      </Text>

      <FontAwesomeIcon
        icon={faCircleStop}
        className="text-blue-900 ml-auto cursor-pointer"
        onClick={onClose}
        style={{
          width: '16px',
          height: '18px',
        }}
        data-testid="error-toast-close-icon"
      />
    </div>
  )
}
