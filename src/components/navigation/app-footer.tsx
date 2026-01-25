import { Link } from 'react-router'
import { useTranslation } from '@/lib/hooks/useTranslation'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { ROUTES } from '@/router/constants/app-routes'
import { Text } from '@/components/ui/text'

export const AppFooter = () => {
  const { isSm } = useBreakpoints()
  const { t } = useTranslation()

  return (
    <footer className="w-full px-2 sm:px-8 py-2.5 sm:py-4 bg-gray-200 h-[120px] sm:h-[94px]">
      <div className="flex flex-col justify-between items-center gap-4 max-w-[550px] mx-auto">
        <ul className="flex flex-row items-center gap-2 sm:gap-4">
          <li>
            <Link to={ROUTES.CARDS}>
              <Text
                as="p"
                variant="body-sm"
                className="text-gray-600"
              >
                {t('navigation.myCards')}
              </Text>
            </Link>
          </li>
          <li className="text-gray-600">•</li>
          <li>
            <Link to={ROUTES.FAQ}>
              <Text
                as="p"
                variant="body-sm"
                className="text-gray-600"
              >
                {t('navigation.faq')}
              </Text>
            </Link>
          </li>
          <li className="text-gray-600">•</li>
          <li>
            <a
              href="mailto:plamivanova37@gmail.com?subject=Whishlist%20Support&body=Hi%20Plamena,"
              className="hover:text-black transition"
            >
              <Text
                as="p"
                variant="body-sm"
                className="text-gray-600"
              >
                {t('footer.contactUs')}
              </Text>
            </a>
          </li>
        </ul>

        {!isSm && <div className="border-t border-gray-300 w-full" />}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 h-full">
          <Text
            as="p"
            variant="body-sm"
            className="text-gray-600"
          >
            &copy; {new Date().getFullYear()} Whishlist.{' '}
            {t('footer.allRightsReserved')}
          </Text>
          {isSm && (
            <Text
              as="p"
              variant="h5"
              className="text-gray-600"
            >
              •
            </Text>
          )}
          <Text
            as="p"
            variant="body-sm"
            className="text-gray-600"
          >
            {t('footer.buildBy')}{' '}
            <Link to="https://github.com/Plamena37">GitHub</Link> |{' '}
            <Link to="https://www.linkedin.com/in/plamena-ivanova-3b6782239/">
              LinkedIn
            </Link>
          </Text>
        </div>
      </div>
    </footer>
  )
}
