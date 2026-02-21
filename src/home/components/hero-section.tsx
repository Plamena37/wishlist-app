import { useNavigate } from 'react-router'
import { useCardsContext } from '@/cards/hooks/useCards'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { ROUTES } from '@/router/constants/app-routes'
import { TransText } from '@/components/trans-text/trans-text'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import heroImage from '@/assets/hero-img.png'
import heroVerticalImage from '@/assets/hero-img-vertical.png'

const HeroSection = () => {
  const { t } = useTranslation()
  const { isSm } = useBreakpoints()
  const navigate = useNavigate()
  const { toggleCreateCardDialog } = useCardsContext()

  const navigateToCardsPage = () => {
    navigate(ROUTES.CARDS)
    toggleCreateCardDialog(true)
  }

  return (
    <section className="relative h-[calc(100dvh-56px)] flex flex-col items-center justify-center text-center py-8 sm:py-24 px-6 bg-purple-50 shadow-xs">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${isSm ? heroImage : heroVerticalImage})`,
        }}
      ></div>

      <div className="relative z-10 max-w-2xl flex flex-col gap-4 items-center">
        <TransText
          tKey={t('homePage.hero.title')}
          textVariant="h1"
          textClassName="font-bold text-gray-800 drop-shadow-lg"
          className="text-balloon-red-200"
        />

        <Text
          variant="body"
          className="text-gray-700 max-w-xl leading-relaxed"
        >
          {t('homePage.hero.subTitle')}
        </Text>

        <Text
          variant="body"
          className="text-gray-700"
        >
          {t('homePage.hero.description')}
        </Text>

        <Button
          className="mt-2 w-auto p-2"
          variant="primary"
          onClick={navigateToCardsPage}
        >
          {t('homePage.hero.cta')}
        </Button>
      </div>
    </section>
  )
}

export default HeroSection
