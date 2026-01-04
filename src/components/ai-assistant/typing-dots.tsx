import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SingleDotIcon = () => (
  <FontAwesomeIcon
    icon={faCircle}
    style={{ width: '0.3rem', height: '0.3rem' }}
  />
)

export const TypingDots = () => {
  return (
    <div className="self-start rounded-lg bg-muted px-3 py-2 text-sm">
      <span className="inline-flex gap-1">
        <span className="animate-bounce text-gray-600">
          <SingleDotIcon />
        </span>
        <span className="animate-bounce [animation-delay:150ms] text-gray-600">
          <SingleDotIcon />
        </span>
        <span className="animate-bounce [animation-delay:300ms] text-gray-600">
          <SingleDotIcon />
        </span>
      </span>
    </div>
  )
}
