export enum Language {
  EN = 'en',
  BG = 'bg',
}

export type LanguageType = Language.EN | Language.BG

export const translations = { en: Language.EN, bg: Language.BG } as const

export type Translations = typeof translations
