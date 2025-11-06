import { useNavigate } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import heroImage from '@/assets/hero-img.png'
import heroVerticalImage from '@/assets/hero-img-vertical.png'
import step1Image from '@/assets/1.png'
import step2Image from '@/assets/2.png'
import step3Image from '@/assets/3.png'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

const HomePage = () => {
  const { isSm } = useBreakpoints()
  const navigate = useNavigate()

  const navigateToCardsPage = () => {
    navigate(ROUTES.CARDS)
  }

  return (
    <div className="flex flex-col l">
      {/* 🏠 HERO SECTION */}
      <section className="relative min-h-[calc(100dvh-55px)] flex flex-col items-center justify-center text-center py-8 sm:py-24 px-6 bg-purple-50 shadow-xs">
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
            <span className="text-balloon-red-200">Stop</span> Explaining What
            You Want — Just Share Your
            <span className="text-balloon-red-200"> Wishlist.</span>
          </Text>

          <Text
            variant="body"
            className="text-gray-700 max-w-xl leading-relaxed"
          >
            Create a card for your birthday, wedding, or any occasion — list
            what you want, add prices and links, and share it with friends.
          </Text>

          <Text
            variant="body"
            className="text-gray-700"
          >
            Easy as a piece of 🎂
          </Text>

          <Button
            className="mt-2 w-auto"
            variant="primary"
            onClick={navigateToCardsPage}
          >
            Create My Wishlist
          </Button>
        </div>
      </section>

      {/* 😩 TIRED SECTION */}
      <section className="py-8 sm:py-20 px-6 bg-white text-center flex flex-col items-center gap-6">
        <Text
          variant="h2"
          className="font-bold text-purple-900"
        >
          🙄 Tired of answering “What do you want for your birthday?”
        </Text>

        <div className="flex flex-col gap-3 max-w-md w-full">
          <div className="bg-gray-200 text-left p-2 sm:p-3 rounded-2xl w-fit">
            <Text variant="h5">“What do you want for your birthday???”</Text>
          </div>
          <div className="bg-purple-200 text-right p-2 sm:p-3 rounded-2xl w-fit ml-auto text-purple-900">
            <Text variant="h5">“Here’s my Wishlist 😎”</Text>
          </div>
        </div>

        <Text
          variant="body"
          className="text-gray-700 max-w-xl"
        >
          Every year, it’s the same thing — messages, calls, questions. Make a
          Wishlist once, send the link, and never explain again. No more socks.
        </Text>
      </section>

      {/* ✨ THREE STEPS */}
      <section className="flex flex-col sm:flex-col-reverse md:flex-row items-center justify-between gap-6 py-8 sm:py-20 px-6 bg-gradient-to-br from-purple-50 to-white">
        <div className="flex flex-col mx-auto gap-4 max-w-xl text-center md:text-left">
          <Text
            variant="h2"
            className="font-bold text-purple-900"
          >
            ✨ Three easy steps to peace and presents
          </Text>
          <Text
            variant="body"
            className="text-gray-700"
          >
            Create a card for your birthday, or any occasion — list what you
            want, add prices and links, and share it with friends.
          </Text>

          <ul className="flex flex-col gap-2 items-start">
            <li>
              <Text variant="body">
                <span className="font-semibold">Step 1:</span> Create your card
                — from Cards or My Cards page.
              </Text>
            </li>
            <li>
              <Text variant="body">
                <span className="font-semibold">Step 2:</span> Add your wishes —
                as you create or edit your card.
              </Text>
            </li>
            <li>
              <Text variant="body">
                <span className="font-semibold">Step 3:</span> Share the link
              </Text>
            </li>
          </ul>
          <Text variant="body">Easy as a piece of 🎂</Text>
          <Button
            className="mt-4 w-fit self-center md:self-start"
            onClick={navigateToCardsPage}
          >
            Create My Wishlist
          </Button>
        </div>

        {/* image collage */}
        <div className="mt-6 sm:mt-0 relative w-full flex flex-wrap justify-center gap-2">
          <div className="w-40 sm:w-60 h-52 shadow-lg rotate-[-4deg] flex items-center justify-center">
            <img
              src={step1Image}
              alt="Step 1"
            />
          </div>
          <div className="w-40 sm:w-60 h-52 shadow-lg rotate-[3deg] flex items-center justify-center">
            <img
              src={step2Image}
              alt="Step 2"
            />
          </div>
          <div className="w-40 sm:w-60  h-52 shadow-lg rotate-[-2deg] flex items-center justify-center">
            <img
              src={step3Image}
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

      {/* 🔒 PUBLIC OR PRIVATE */}
      <section className="py-8 sm:py-20 px-6 text-center bg-white">
        <Text
          as="h2"
          variant="h2"
          className="font-bold text-purple-900 mb-6"
        >
          🔒 Public or Private — You decide
        </Text>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl bg-purple-100 shadow-md">
            <div className="text-4xl mb-2">🌍</div>
            <h3 className="font-semibold text-lg text-purple-900">Public</h3>
            <Text
              variant="h4"
              className="mt-2 text-gray-700 leading-6"
            >
              Everyone can see your card on the main page.
            </Text>
          </div>
          <div className="p-8 rounded-2xl bg-gray-100 shadow-md">
            <div className="text-4xl mb-2">🔐</div>
            <h3 className="font-semibold text-lg text-gray-900">Private</h3>
            <Text
              variant="h4"
              className="mt-2 text-gray-700 leading-6"
            >
              Only you can see it in — unless you share the link.
            </Text>
          </div>
        </div>
        <Text
          as="p"
          variant="subtext"
          className="mt-6 text-gray-500"
        >
          Keep your surprise gifts private — or brag about them, your call.
        </Text>
      </section>
    </div>
  )
}

export default HomePage
