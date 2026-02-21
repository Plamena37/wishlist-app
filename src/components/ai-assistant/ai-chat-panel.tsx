import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons'
import Markdown from 'react-markdown'
import { cn } from '@/lib/utils'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useChatbot } from './hooks/useChatbot'
import { TypingDots } from './typing-dots'

interface AIChatPanelProps {
  onClose: () => void
}

export const AIChatPanel = ({ onClose }: AIChatPanelProps) => {
  const { isXs } = useBreakpoints()
  const { t } = useTranslation()
  const { messages, sendMessage, isTyping, disableChat } = useChatbot()

  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    sendMessage(input)

    setInput('')
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={cn(
        'fixed bottom-20 z-50 rounded-xl border border-gray-300 bg-white shadow-xl flex flex-col',
        isXs ? 'w-auto right-2.5 left-2.5' : 'sm:w-86 md:w-92 right-5'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-b-gray-300">
        <Text
          variant="h5"
          className="font-semibold"
        >
          Wishlist {t('aiAssistant.title')} ✨
        </Text>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          aria-label="Close AI assistant chat panel"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="h-4 w-4"
          />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-64 p-3">
        <div className="flex flex-col gap-2">
          {messages.map((msg, i) => (
            <Text
              key={`${msg.sender}-${i}`}
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                msg.sender === 'user'
                  ? 'self-end bg-purple-800 text-white'
                  : 'self-start bg-muted'
              }`}
              variant="subtext"
            >
              <Markdown>{msg.text}</Markdown>
            </Text>
          ))}

          {isTyping && <TypingDots />}

          {/* auto-scroll anchor */}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-t-gray-300 p-3 flex gap-2">
        <Input
          placeholder={t('aiAssistant.placeholder')}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          disabled={disableChat}
        />
        <Button
          onClick={handleSend}
          className="w-auto h-8"
          disabled={disableChat}
          aria-label="Send message to AI assistant"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </div>
    </div>
  )
}
