import { Icon } from '@/components/ui/icon'
import Loading from '@/assets/loading.svg'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LoadingToastProps {
  children?: ReactNode
  className?: string
}

export const LoadingToast = ({
  children,
  className,
  ...props
}: LoadingToastProps) => {
  return (
    <div
      className={cn(
        'flex rounded-lg bg-blue-900 shadow-[0px_4px_8px_rgba(0,0,0,0.25)] px-6 py-2 min-h-10 w-full',
        className
      )}
      {...props}
    >
      <Icon
        src={Loading}
        size={'sm'}
        className="animate-spin-reverse mr-2 h-[19px] leading-[19px]"
      />
      <p className="text-sm text-white">{children}</p>
    </div>
  )
}
