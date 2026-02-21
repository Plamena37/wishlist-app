import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AIChatPanel } from './ai-chat-panel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // faComments,
  faCommentDots,
  // faMessage,
} from '@fortawesome/free-solid-svg-icons'

export const AIAssistant = () => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((prev) => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full shadow-lg"
        aria-label="Chatbot button"
      >
        <FontAwesomeIcon
          // icon={faMessage}
          // icon={faComments}
          icon={faCommentDots}
          className="h-6 w-6"
        />
      </Button>

      {open && <AIChatPanel onClose={handleClose} />}
    </>
  )
}
