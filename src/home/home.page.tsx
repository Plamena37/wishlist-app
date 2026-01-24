import { useNavigate } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { useCardsContext } from '@/cards/hooks/useCards'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Language } from '@/i18n/constants'
import heroImage from '@/assets/hero-img.png'
import heroVerticalImage from '@/assets/hero-img-vertical.png'
import step1ImageEN from '@/assets/en_1.png'
import step2ImageEN from '@/assets/en_2.png'
import step3ImageEN from '@/assets/en_3.png'
import step1ImageBG from '@/assets/bg_1.png'
import step2ImageBG from '@/assets/bg_2.png'
import step3ImageBG from '@/assets/bg_3.png'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const { t, lang } = useTranslation()
  const { isSm } = useBreakpoints()
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
    <div className="flex flex-col">
      {/* 🏠 HERO SECTION */}
      <section className="relative h-[calc(100dvh-56px)] flex flex-col items-center justify-center text-center py-8 sm:py-24 px-6 bg-purple-50 shadow-xs">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${isSm ? heroImage : heroVerticalImage})`,
          }}
        ></div>

        <div className="relative z-10 max-w-2xl flex flex-col gap-4 items-center">
          <Text
            variant="h1"
            className="font-bold text-gray-800 drop-shadow-lg"
          >
            <span className="text-balloon-red-200">
              {t('homePage.hero.titleStop')}
            </span>
            {t('homePage.hero.title')}
            <span className="text-balloon-red-200">
              {t('homePage.hero.titleWhishlist')}
            </span>
          </Text>

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

      {/* 😩 TIRED SECTION */}
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

      {/* ✨ THREE STEPS */}
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
              <Text variant="body">
                <span className="font-semibold">
                  {t('homePage.threeSteps.step1')}
                </span>
                {t('homePage.threeSteps.step1Title')}
              </Text>
            </li>
            <li className="text-left">
              <Text variant="body">
                <span className="font-semibold">
                  {t('homePage.threeSteps.step2')}
                </span>
                {t('homePage.threeSteps.step2Title')}
              </Text>
            </li>
            <li className="text-left">
              <Text variant="body">
                <span className="font-semibold">
                  {t('homePage.threeSteps.step3')}
                </span>
                {t('homePage.threeSteps.step3Title')}
              </Text>
            </li>
          </ul>
          {/* <Text variant="body">Easy as a piece of 🎂</Text> */}

          <div className="flex gap-2 mt-4 items-center justify-center md:justify-start">
            <Button
              className="w-auto"
              onClick={navigateToCardsPage}
            >
              {t('homePage.threeSteps.cta')}
            </Button>
            <Button
              variant="outline"
              onClick={navigateToFAQPage}
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

      {/* ✨ THREE STEPS */}
      {/* <section className="py-20 px-6 bg-purple-50 text-center">
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
      </section> */}

      {/* 🔒 OVERVIEW */}
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
              className="font-semibold text-gray-900 mb-2"
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
    </div>
  )
}

export default HomePage
