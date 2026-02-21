import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '@/router/constants/app-routes'
import { useTranslation } from '@/lib/hooks/useTranslation'
import NotFound from '@/assets/not-found.svg'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

const GeneralErrorPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToHomePage = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-4 sm:gap-6 p-4">
      <Icon
        src={NotFound}
        style={{
          width: '65dvw',
          height: 'auto',
          maxWidth: '400px',
        }}
        alt="Not Found Icon"
      />
      <Text
        as="h3"
        variant="h3"
        className="font-semibold text-gray-400 "
      >
        {t('errorPage.title')}
      </Text>
      <Button
        variant="link"
        onClick={navigateToHomePage}
        aria-label="Go back to home page"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        {t('errorPage.subtitle')}
      </Button>
    </div>
  )
}

export default GeneralErrorPage
