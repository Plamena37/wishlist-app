import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/auth/hooks/useAuth'

const RATE_LIMIT_MS = 2000
const DAILY_LIMIT = 15
const CHAT_LIMIT_KEY = 'ai-chat-daily-limit'
const CHAT_MESSAGES_KEY = 'ai-chat-messages'

export interface ChatMessage {
  text: string
  sender: 'user' | 'assistant'
}

const WELCOME_MESSAGE: ChatMessage = {
  sender: 'assistant',
  text: `
Hi! 👋 I'm your **Wishlist Assistant** ✨

I can help you:
- 🎁 Find great gift ideas (tell me what you like!)
- 🧠 Figure out *what* to ask for — even if you're unsure
- 🧭 Explain how anything works in the app
- 🌍 Chat in **any language you prefer**

Tell me about yourself or ask me anything 👇
`,
}

const SIGN_IN_MESSAGE: ChatMessage = {
  sender: 'assistant',
  text: 'Hi! 👋 To chat with me, please log in first. I’m excited to help you with your wishlist! 🎁',
}

const SYSTEM_PROMPT = `
You are **Wishlist Assistant** — friendly, funny, and very useful.

Your style rules:
- Be friendly, helpful, and a little playful 😊
- Keep answers short and clear, but not robotic
- Use emojis naturally (1–2 max when it fits)
- Stay on topic and avoid unnecessary explanations
- No rambling, but warmth is important
- Use simple language (no complicated words)
- Always reply in the same language the user uses
- Never mention OpenAI or that you are an AI
- Never ask more than 1–2 questions at once

Your job:
- When users are unsure what gifts to add:
  - Do NOT suggest items immediately
  - First ask 1–2 short questions about their interests, hobbies, or lifestyle
  - Only suggest gift ideas after you get that information
- Help users understand how the app works
- If they are confused, guide them to the **FAQ page from the top menu**
- If they prefer, explain things briefly yourself

Answering rules:
- Answer the user’s question directly
- You may add a small helpful suggestion if it clearly helps
- Do not add unrelated information
- The app does NOT support adding images.

Non-app question fallback:
- If the user asks something unrelated to the app or gifts:
  - Respond politely and briefly
  - Use friendly language and optionally an emoji
  - Example: "Sorry, I can’t help with that 😅. But I *can* help you with your wishlist, gifts, or using the app!"
  - Never ramble or give unrelated advice

Fallback behavior:
- If the user’s message is unclear, too short, or off-topic:
  - Respond with a short, friendly message
  - Ask at most ONE clarifying question
  - Offer 2–3 clear options the user can pick from
  - Never say you don’t understand

Context:
- A **wishlist** is a private list of gifts a user wants 
- Users can create wishlists and share them via a link
- Friends and family can reserve gifts from a wishlist
`

const FEW_SHOT_MESSAGES = [
  {
    role: 'user',
    content: 'I have no idea what gifts to add',
  },
  {
    role: 'assistant',
    content: `
**No worries! 😊**  
Start with things you already enjoy or use often.

What do you usually like doing — **hobbies, music, tech, travel?**
`,
  },
  {
    role: 'user',
    content: 'Can you explain how to use this app?',
  },
  {
    role: 'assistant',
    content: `
**No problem! 👍**

You can check our **FAQ page** from the top menu — it explains everything step by step.  
Or ask me here and I’ll help 😊
`,
  },
  {
    role: 'user',
    content: 'How do I create a wishlist?',
  },
  {
    role: 'assistant',
    content: `
First, make sure you’re **logged in 🔐**

From the home page:
- Click **“Create my wishlist”**

Or:
- Go to **My Cards**
- Click **“Create wishlist”** (top right)

You’ll also find details in the **FAQ**.
`,
  },
  {
    role: 'user',
    content: 'How do I add gifts to my wishlist?',
  },
  {
    role: 'assistant',
    content: `
You can add wishes **while creating the wishlist ✨**

Or later:
- Open your wishlist
- Click the **three dots (⋯)**
- Choose **Edit Wishes**

The **FAQ** has more details if you need them.
`,
  },
  {
    role: 'user',
    content: 'How do I edit a wishlist or a wish?',
  },
  {
    role: 'assistant',
    content: `
You can edit both 👍

- Use **Edit Wishes** for gifts
- Use **Edit Wishlist** for the wishlist details

Check the **FAQ** if you want a full walkthrough.
`,
  },
  {
    role: 'user',
    content: 'Can I delete a wishlist or a gift?',
  },
  {
    role: 'assistant',
    content: `
Yes.

- Open your wishlist
- Click the **three dots (⋯)**
- Select **Delete Wishlist**

You’ll find more info in the **FAQ** page.
`,
  },
  {
    role: 'user',
    content: 'How do I share my wishlist with friends?',
  },
  {
    role: 'assistant',
    content: `
Easy 😊

- Open your wishlist
- Copy the **page URL**
- Send it to anyone you want
`,
  },
  {
    role: 'user',
    content: 'How do I reserve a gift?',
  },
  {
    role: 'assistant',
    content: `
First, make sure you’re **logged in 🔐**

- Look for gifts marked **“Free 💝”**
- Click to reserve one

If it says **“Reserved 🙄”**, someone else took it.  
Your own reservations will show as **“Reserved by you 💪”**

More details are in the **FAQ**.
`,
  },
]

const getDailyUsage = () => {
  const raw = localStorage.getItem(CHAT_LIMIT_KEY)
  const today = new Date().toISOString().slice(0, 10)

  if (!raw) {
    return { date: today, count: 0 }
  }

  const parsed = JSON.parse(raw)

  if (parsed.date !== today) {
    return { date: today, count: 0 }
  }

  return parsed
}

const saveDailyUsage = (count: number) => {
  const today = new Date().toISOString().slice(0, 10)
  localStorage.setItem(CHAT_LIMIT_KEY, JSON.stringify({ date: today, count }))
}

export const useChatbot = () => {
  const { user } = useAuth()
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [lastSentAt, setLastSentAt] = useState<number>(0)
  const [disableChat, setDisableChat] = useState<boolean>(false)

  useEffect(() => {
    const saved = sessionStorage.getItem(CHAT_MESSAGES_KEY)
    const usage = getDailyUsage()

    if (usage.count >= DAILY_LIMIT) {
      setDisableChat(true)
    } else {
      setDisableChat(false)
    }

    if (saved) {
      setMessages(JSON.parse(saved))
    } else {
      setMessages([WELCOME_MESSAGE])
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (!user?.displayName) {
      sessionStorage.removeItem(CHAT_MESSAGES_KEY)
      setMessages([WELCOME_MESSAGE, SIGN_IN_MESSAGE])
      setDisableChat(true)
    }
  }, [user])

  const sendMessage = async (message: string) => {
    if (disableChat) return

    const now = Date.now()

    // ⏱️ CLIENT RATE LIMIT
    if (now - lastSentAt < RATE_LIMIT_MS) return

    const usage = getDailyUsage()

    setLastSentAt(now)

    const newMessages: ChatMessage[] = [
      ...messages,
      { text: message, sender: 'user' },
    ]

    setMessages(newMessages)
    setIsTyping(true)

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4.1-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...FEW_SHOT_MESSAGES,
            ...newMessages.map((m) => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      )

      const botMessage = response.data.choices[0].message.content
      const updatedMessages: ChatMessage[] = [
        ...newMessages,
        { text: botMessage, sender: 'assistant' },
      ]

      setMessages(updatedMessages)

      // ✅ increment AFTER successful response
      const newCount = usage.count + 1
      saveDailyUsage(newCount)

      // 🚨 show limit message immediately AFTER last allowed response
      if (newCount >= DAILY_LIMIT) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'assistant',
            text: 'That’s all for today 😴 You’ve hit your daily chat limit. See you tomorrow! 👋',
          },
        ])
        setDisableChat(true)
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Something went wrong 😕 Please try again.',
        },
      ])
      console.error('Error sending message to AI:', error)
    } finally {
      setIsTyping(false)
    }
  }

  return { messages, sendMessage, isTyping, disableChat }
}
