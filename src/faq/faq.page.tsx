import FAQ from '@/assets/faq.png'
import Dots from '@/assets/dots.svg'
import { useTranslation } from '@/lib/hooks/useTranslation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { TransText } from '@/components/trans-text/trans-text'

const FAQPage = () => {
  const { t } = useTranslation()

  return (
    <div className="relative py-6 sm:py-12 px-3 sm:px-6 flex flex-col justify-center items-center gap-2 text-center">
      <Text
        variant="h2"
        className="font-bold text-gray-800"
      >
        {t('faqPage.title')}
      </Text>
      <Text
        variant="h4"
        className="font-semibold text-gray-800"
      >
        {t('faqPage.subtitle')}
      </Text>
      <Text
        variant="body"
        className="text-gray-700"
      >
        {t('faqPage.description')}
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
          className="bg-gray-100 px-4 rounded-md shadow-md w-full"
        >
          <AccordionItem value="left-1">
            <AccordionTrigger>{t('faqPage.faq1.title')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <TransText tKey={t('faqPage.faq1.description1')} />
              <TransText tKey={t('faqPage.faq1.description2')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-2">
            <AccordionTrigger>{t('faqPage.faq2.title')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <TransText tKey={t('faqPage.faq2.description1')} />
              <TransText tKey={t('faqPage.faq2.description2')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-3">
            <AccordionTrigger>{t('faqPage.faq3.title')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <TransText tKey={t('faqPage.faq3.description1')} />
              <TransText tKey={t('faqPage.faq3.description2')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-4">
            <AccordionTrigger>{t('faqPage.faq4.title')}</AccordionTrigger>
            <AccordionContent>
              <TransText tKey={t('faqPage.faq4.description')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="left-5">
            <AccordionTrigger>{t('faqPage.faq5.title')}</AccordionTrigger>
            <AccordionContent>
              <TransText tKey={t('faqPage.faq5.description')} />
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
          alt="Dots Icon"
        />

        <Accordion
          type="single"
          collapsible
          className="bg-gray-100 px-4 rounded-md shadow-md w-full"
        >
          <AccordionItem value="right-1">
            <AccordionTrigger>{t('faqPage.faq6.title')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <TransText tKey={t('faqPage.faq6.description1')} />
              <TransText tKey={t('faqPage.faq6.description2')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-2">
            <AccordionTrigger>{t('faqPage.faq7.title')}</AccordionTrigger>
            <AccordionContent>
              <TransText tKey={t('faqPage.faq7.description')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-3">
            <AccordionTrigger>{t('faqPage.faq8.title')}</AccordionTrigger>
            <AccordionContent>
              <TransText tKey={t('faqPage.faq8.description1')} />
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <TransText tKey={t('faqPage.faq8.description2')} />
                </li>
                <li>
                  <TransText tKey={t('faqPage.faq8.description3')} />
                </li>
                <li>
                  <TransText tKey={t('faqPage.faq8.description4')} />
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-4">
            <AccordionTrigger>{t('faqPage.faq9.title')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <TransText tKey={t('faqPage.faq9.description1')} />
              <TransText tKey={t('faqPage.faq9.description2')} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="right-5">
            <AccordionTrigger>{t('faqPage.faq10.title')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <TransText tKey={t('faqPage.faq10.description1')} />
              <TransText tKey={t('faqPage.faq10.description2')} />
              <TransText
                tKey={t('faqPage.faq10.description3')}
                className="font-normal italic"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default FAQPage
