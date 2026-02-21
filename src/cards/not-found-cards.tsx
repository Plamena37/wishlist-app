import Taken from '@/assets/taken.svg'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

export const NotFoundCards = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 flex-col justify-center items-center p-4">
      <Icon
        src={Taken}
        style={{
          width: '150px',
          height: '150px',
        }}
        alt="Taken Icon"
      />
      <Text
        as="h5"
        variant="h5"
        className="font-semibold text-gray-400 mt-6 sm:mt-8"
      >
        {t('noCardsFound.title')}
      </Text>
      <Text
        variant="body"
        className="text-gray-400 mt-1 sm:mt-2 text-center"
      >
        {t('noCardsFound.description')}
      </Text>
    </div>
  )
}
