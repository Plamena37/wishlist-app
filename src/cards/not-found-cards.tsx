import Taken from '@/assets/taken.svg'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

interface NotFoundCardsProps {
  subtitle: string
}

export const NotFoundCards = ({ subtitle }: NotFoundCardsProps) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Icon
        src={Taken}
        style={{
          width: '150px',
          height: '150px',
        }}
      />
      <Text
        as="h5"
        variant="h5"
        className="font-semibold text-gray-400 mt-8"
      >
        No cards available.
      </Text>
      <Text
        variant="body"
        className="text-gray-400 mt-2"
      >
        {subtitle}
      </Text>
    </div>
  )
}
