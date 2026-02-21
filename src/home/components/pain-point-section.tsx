import { useTranslation } from '@/lib/hooks/useTranslation'
import { Text } from '@/components/ui/text'

const PainPointSection = () => {
  const { t } = useTranslation()

  return (
    <section className="py-8 sm:py-20 px-6 bg-white text-center flex flex-col items-center gap-6">
      <Text
        variant="h2"
        className="font-bold text-purple-900"
      >
        {t('homePage.tired.title')}
      </Text>

      <div className="flex flex-col gap-3 max-w-md w-full">
        <div className="bg-gray-200 text-left p-2 sm:p-3 rounded-2xl w-fit">
          <Text variant="h5">{t('homePage.tired.chat1')}</Text>
        </div>
        <div className="bg-purple-200 text-right p-2 sm:p-3 rounded-2xl w-fit ml-auto text-purple-900">
          <Text variant="h5">{t('homePage.tired.chat2')}</Text>
        </div>
      </div>

      <Text
        variant="body"
        className="text-gray-700 max-w-xl"
      >
        {t('homePage.tired.description')}
      </Text>
    </section>
  )
}

export default PainPointSection
