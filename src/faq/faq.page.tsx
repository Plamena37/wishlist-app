import FAQ from '@/assets/faq.png'
import Dots from '@/assets/dots.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

const FAQPage = () => {
  return (
    <div className="relative py-6 sm:py-12 px-3 sm:px-6 flex flex-col justify-center items-center gap-2 text-center">
      <Text
        variant="h2"
        className="font-bold text-gray-800"
      >
        Do You Have Questions?
      </Text>
      <Text
        variant="h4"
        className="font-semibold text-gray-800"
      >
        We have answers (well, most of the times!)
      </Text>
      <Text
        variant="body"
        className="text-gray-700"
      >
        Below you will find answers to the most common questions you may have on
        Whishlist.
      </Text>

      <img
        src={FAQ}
        className="w-[60dvw] max-w-[400px] h-auto"
        alt="FAQ illustration"
      />

      <div className="flex flex-col sm:flex-row lg:items-start gap-1 sm:gap-12 w-full max-w-[1200px] mt-4 text-left">
        <Accordion
          type="single"
          collapsible
          className="bg-white px-4 rounded-md shadow-md w-full"
        >
          <AccordionItem value="left-1">
            <AccordionTrigger>What is the app about?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Text
                variant="body"
                as="p"
              >
                This app lets you create a <strong>wishlist</strong>, add your
                wishes, and share a link with friends so they can get you
                exactly what you want — no extra effort!
              </Text>
              <Text variant="body">
                You can reserve wishes, sort them, chat with our AI assistant
                for gift ideas, and much more. 🎁
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-2">
            <AccordionTrigger>How do I create a wishlist?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Text
                variant="body"
                as="p"
              >
                First, make sure you’re logged in 🔐.
              </Text>
              <Text variant="body">
                From the "Home" page: Click
                <strong> “Create my wishlist”</strong> or go to "My Cards" page
                → click <strong>“Create wishlist”</strong> (top right). Fill in
                your occasion, add a description, and start adding wishes ✨
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-3">
            <AccordionTrigger>
              How do I add gifts to my wishlist?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Text
                variant="body"
                as="p"
              >
                You can add wishes anytime: While creating your wishlist ✨{' '}
              </Text>
              <Text variant="body">
                Or later: Open your wishlist → click the three dots → choose
                <strong> Edit Wishes</strong>
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-4">
            <AccordionTrigger>
              How do I edit a wishlist or a wish?
            </AccordionTrigger>
            <AccordionContent>
              <Text variant="body">
                Easy! 👍 Use <strong>Edit Wishes</strong> to update your gifts
                or use <strong>Edit Wishlist</strong> to change the title or
                description
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-5">
            <AccordionTrigger>
              Can I delete a wishlist or a gift?
            </AccordionTrigger>
            <AccordionContent>
              <Text variant="body">
                Yes! Just open your wishlist → click the three dots → select
                <strong> Delete Wishlist</strong>
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Icon
          src={Dots}
          style={{
            width: '42px',
            height: '42px',
          }}
          className="mx-auto sm:hidden opacity-55"
        />

        <Accordion
          type="single"
          collapsible
          className="bg-white px-4 rounded-md shadow-md w-full"
        >
          <AccordionItem value="right-1">
            <AccordionTrigger>
              I have no idea what gifts to add
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Text
                variant="body"
                as="p"
              >
                Don’t worry! 😄
              </Text>
              <Text variant="body">
                Open our <strong>Wishlist AI Chatbot</strong> (bottom right),
                tell it what you like or your hobbies, and it will suggest gift
                ideas tailored just for you.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-2">
            <AccordionTrigger>
              How do I share my wishlist with friends?
            </AccordionTrigger>
            <AccordionContent>
              <Text
                variant="body"
                as="p"
              >
                Super simple 😊 Open your wishlist → click the three dots →
                choose <strong> Copy Link</strong> → send it to anyone you like!
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-3">
            <AccordionTrigger>How do I reserve a gift?</AccordionTrigger>
            <AccordionContent>
              <Text variant="body">First, make sure you’re logged in 🔐</Text>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <Text
                    variant="body"
                    as="p"
                  >
                    Look for gifts marked <strong>“Free 💝”</strong> and click
                    to reserve
                  </Text>
                </li>
                <li>
                  <Text
                    variant="body"
                    as="p"
                  >
                    If it says <strong>“Reserved 🙄”</strong>, someone else
                    already took it
                  </Text>
                </li>
                <li>
                  <Text
                    variant="body"
                    as="p"
                  >
                    Gifts you reserve yourself will show as{' '}
                    <strong>“Reserved by you 💪”</strong>
                  </Text>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-4">
            <AccordionTrigger>
              Can more than one person reserve the same gift by accident?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Text
                variant="body"
                as="p"
              >
                <strong>Nope! ❌</strong>
              </Text>
              <Text
                variant="body"
                as="p"
              >
                Reservations update in real time, so once someone reserves a
                gift, it’s immediately marked and no one else can reserve it.
              </Text>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-5">
            <AccordionTrigger>Why do I need to sign in?</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <Text
                variant="body"
                as="p"
              >
                Signing in mostly helps with reserving gifts safely. 🎁
              </Text>
              <Text
                variant="body"
                as="p"
              >
                Without logging in, the app can’t tell if you’re the same user
                across different browsers, which could create conflicts.
              </Text>
              <Text
                variant="body"
                as="p"
              >
                <i>Don’t worry — we’re not collecting your personal data.</i> We
                just want everything to work smoothly! ✅
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default FAQPage
