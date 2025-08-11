import { ExternalToast, toast as sonnerToast } from 'sonner'
import { ReactElement, ReactNode } from 'react'

interface ToastProps {
  children?: ReactNode
}

const toast = (toast: ReactElement, options: ExternalToast) => {
  return sonnerToast.custom(() => <Toast>{toast}</Toast>, {
    duration: 2000,
    ...options,
  })
}

const Toast = ({ children }: ToastProps) => {
  return (
    <div className="flex rounded-lg bg-blue-900 shadow-[0px_4px_8px_rgba(0,0,0,0.25)] px-[24px] py-[8px] min-h-[40px] w-full">
      <div className="flex flex-1 items-center">
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  )
}

export { Toast, toast }
