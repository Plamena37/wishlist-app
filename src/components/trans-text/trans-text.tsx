import { Trans } from 'react-i18next'
import { Text, TextAs, TextVariant } from '@/components/ui/text'
import { cn } from '@/lib/utils'

interface TransTextProps {
  tKey: string
  className?: string
  textVariant?: TextVariant
  textAs?: TextAs
  textClassName?: string
}

export const TransText = ({
  tKey,
  className,
  textVariant = 'body',
  textAs = 'p',
  textClassName,
  ...props
}: TransTextProps) => {
  return (
    <Text
      variant={textVariant}
      as={textAs}
      className={textClassName}
      {...props}
    >
      <Trans
        i18nKey={tKey}
        components={{
          highlight: <span className={cn('font-bold', className)} />,
        }}
      />
    </Text>
  )
}
