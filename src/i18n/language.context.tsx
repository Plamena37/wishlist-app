import { createContext, ReactNode, useEffect, useState } from 'react'
import { Language, LanguageType } from './constants'
import { en } from './en'
import { bg } from './bg'

const translations = { en, bg }

export type LanguageContextType = {
  lang: LanguageType
  setLang: (l: LanguageType) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: Language.EN,
  setLang: () => {},
  t: (key: string) => key,
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('lang')
    if (saved === Language.EN || saved === Language.BG)
      return saved as LanguageType
    return Language.BG
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const t = (key: string): string => {
    const keys = key.split('.')
    let result: unknown = translations[lang]

    for (const k of keys) {
      if (typeof result !== 'object' || result === null || !(k in result))
        return key
      result = (result as Record<string, unknown>)[k]
    }

    return typeof result === 'string' ? result : key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
