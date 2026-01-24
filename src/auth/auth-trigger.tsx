import { useState } from 'react'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useAuth } from '@/auth/hooks/useAuth'
import { AuthModal } from '@/auth/auth-modal'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// IMPORTANT: NOT USED

interface AuthTriggerProps {
  children?: React.ReactNode
  isReserved?: boolean
  title?: string
  onClose?: () => void
  onCloseSheet?: () => void
}

export const AuthTrigger = ({
  children,
  isReserved,
  title,
  onClose,
  onCloseSheet,
}: AuthTriggerProps) => {
  const { t } = useTranslation()
  const { user, clearAuthError } = useAuth()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      clearAuthError()
      onClose?.()
    }
  }

  if ((user && user?.displayName) || isReserved) return <>{children}</>

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        className="sm:max-w-96"
      >
        <DialogHeader>
          <DialogTitle className="px-5 sm:px-0 leading-4">
            {title ?? t('auth.signInToContinue')}
          </DialogTitle>
        </DialogHeader>
        <AuthModal onCloseSheet={onCloseSheet} />
      </DialogContent>
    </Dialog>
  )
}
