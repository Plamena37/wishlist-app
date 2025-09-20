import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ROUTES } from '@/router/constants/app-routes'
import { errorMessages } from '@/lib/constants/messages'
import NotFound from '@/assets/not-found.svg'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

const GeneralErrorPage = () => {
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
      />
      <Text
        as="h3"
        variant="h3"
        className="font-semibold text-gray-400 "
      >
        {errorMessages.page_not_found}
      </Text>
      <Button
        variant="link"
        onClick={navigateToHomePage}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        {errorMessages.go_to_home_page}
      </Button>
    </div>
  )
}

export default GeneralErrorPage
