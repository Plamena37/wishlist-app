import { useNavigate } from 'react-router'
import { Language } from '@/i18n/constants'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useCardsContext } from '@/cards/hooks/useCards'
import { ROUTES } from '@/router/constants/app-routes'
import { TransText } from '@/components/trans-text/trans-text'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import step1ImageEN from '@/assets/en_1.png'
import step2ImageEN from '@/assets/en_2.png'
import step3ImageEN from '@/assets/en_3.png'
import step1ImageBG from '@/assets/bg_1.png'
import step2ImageBG from '@/assets/bg_2.png'
import step3ImageBG from '@/assets/bg_3.png'

const StepsSection = () => {
  const { t, lang } = useTranslation()
  const navigate = useNavigate()
  const { toggleCreateCardDialog } = useCardsContext()

  const navigateToCardsPage = () => {
    navigate(ROUTES.CARDS)
    toggleCreateCardDialog(true)
  }

  const navigateToFAQPage = () => {
    navigate(ROUTES.FAQ)
  }

  const image1 = lang === Language.EN ? step1ImageEN : step1ImageBG
  const image2 = lang === Language.EN ? step2ImageEN : step2ImageBG
  const image3 = lang === Language.EN ? step3ImageEN : step3ImageBG

  return (
    <section className="flex flex-col sm:flex-col-reverse md:flex-row items-center justify-between gap-6 py-8 sm:py-20 px-6 bg-gradient-to-br from-purple-50 to-white">
      <div className="flex flex-col mx-auto gap-4 max-w-xl text-center md:text-left">
        <Text
          variant="h2"
          className="font-bold text-purple-900"
        >
          {t('homePage.threeSteps.title')}
        </Text>
        <Text
          variant="body"
          className="text-gray-700"
        >
          {t('homePage.threeSteps.description')}
        </Text>

        <ul className="flex flex-col gap-2 items-start">
          <li className="text-left">
            <TransText
              tKey={t('homePage.threeSteps.step1')}
              className="text-purple-900 font-semibold"
            />
          </li>
          <li className="text-left">
            <TransText
              tKey={t('homePage.threeSteps.step2')}
              className="text-purple-900 font-semibold"
            />
          </li>
          <li className="text-left">
            <TransText
              tKey={t('homePage.threeSteps.step3')}
              className="text-purple-900 font-semibold"
            />
          </li>
        </ul>
        {/* <Text variant="body">Easy as a piece of 🎂</Text> */}

        <div className="flex gap-2 mt-4 items-center justify-center md:justify-start">
          <Button
            className="w-auto"
            onClick={navigateToCardsPage}
            aria-label="Create your wishlist button"
          >
            {t('homePage.threeSteps.cta')}
          </Button>
          <Button
            variant="outline"
            onClick={navigateToFAQPage}
            aria-label="Learn more about how the app works button"
          >
            {t('homePage.threeSteps.learnMore')}
          </Button>
        </div>
      </div>

      {/* image collage */}
      <div className="mt-6 sm:mt-0 relative w-full flex flex-wrap justify-center gap-2">
        <div className="w-38 sm:w-60 h-52 shadow-lg rotate-[-4deg] flex items-center justify-center">
          <img
            src={image2}
            alt="Step 1"
          />
        </div>
        <div className="w-38 sm:w-60 h-52 shadow-lg rotate-[3deg] flex items-center justify-center">
          <img
            src={image1}
            alt="Step 2"
          />
        </div>
        <div className="w-38 sm:w-60  h-52 shadow-lg rotate-[-2deg] flex items-center justify-center">
          <img
            src={image3}
            alt="Step 3"
          />
        </div>
      </div>
    </section>
  )
}

export default StepsSection

{
  /* <section className="py-20 px-6 bg-purple-50 text-center">
        <Text
          variant="h2"
          className="text-3xl font-bold text-purple-900 mb-8"
        >
          ✨ Three easy steps to peace and presents
        </Text>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: '📝',
              title: 'Create your card',
              desc: 'Pick an occasion and name your Wishlist.',
            },
            {
              icon: '🎁',
              title: 'Add your wishes',
              desc: 'Add gifts, links, and prices (if you care).',
            },
            {
              icon: '🔗',
              title: 'Share the link',
              desc: 'Send it to friends or family — done!',
            },
          ].map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-3"
            >
              <div className="text-4xl">{step.icon}</div>
              <h3 className="font-semibold text-lg text-purple-900">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section> */
}
