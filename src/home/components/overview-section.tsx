import { useTranslation } from '@/lib/hooks/useTranslation'
import { Text } from '@/components/ui/text'

const OverviewSection = () => {
  const { t } = useTranslation()

  return (
    <section className="py-8 sm:py-20 px-6 text-center bg-white">
      <Text
        as="h2"
        variant="h2"
        className="font-bold text-purple-900 mb-6"
      >
        {t('homePage.overview.title')}
      </Text>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-10 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="p-8 rounded-2xl bg-purple-100 shadow-md">
          <div className="text-4xl mb-3">📝</div>
          <Text
            as="h2"
            className="font-semibold text-purple-900 mb-2"
          >
            {t('homePage.overview.card1Title')}
          </Text>
          <Text
            variant="subtext"
            className="mt-2 text-gray-700 leading-6"
          >
            {t('homePage.overview.card1Description')}
          </Text>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-2xl bg-white shadow-md">
          <div className="text-4xl mb-3">😌</div>
          <Text
            as="h2"
            className="font-semibold text-black mb-2"
          >
            {t('homePage.overview.card2Title')}
          </Text>
          <Text
            variant="subtext"
            className="mt-2 text-gray-700 leading-6"
          >
            {t('homePage.overview.card2Description')}
          </Text>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-2xl bg-purple-100 shadow-md">
          <div className="text-4xl mb-3">🤖</div>
          <Text
            as="h2"
            className="font-semibold text-purple-900 mb-2"
          >
            {t('homePage.overview.card3Title')}
          </Text>
          <Text
            variant="subtext"
            className="mt-2 text-gray-700 leading-6"
          >
            {t('homePage.overview.card3Description')}
          </Text>
        </div>
      </div>

      <Text
        as="p"
        variant="subtext"
        className="mt-6 text-gray-500"
      >
        {t('homePage.overview.description')}
      </Text>
    </section>
  )
}

export default OverviewSection
