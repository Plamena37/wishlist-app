import { useContext } from 'react'
import { LanguageContext } from '@/i18n/language.context'

export const useTranslation = () => useContext(LanguageContext)
