import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/auth/hooks/useAuth'
import { useTranslation } from '@/lib/hooks/useTranslation'

export interface AccountDropdownLink {
  label: string
  icon: IconDefinition
  href: string
  testid: string
  disabled?: boolean
  onClick?: () => void
}

export const AccountDropdownLinks = (): AccountDropdownLink[] => {
  const { signOut } = useAuth()
  const { t } = useTranslation()

  return [
    // {
    //   label: 'Settings',
    //   icon: faGear,
    //   href: '#',
    //   testid: 'account-dropdown-settings',
    //   disabled: true,
    // },
    // {
    // {
    //   label: 'FAQ',
    //   icon: faCircleInfo,
    //   href: '#',
    //   testid: 'account-dropdown-faq',
    //   disabled: true,
    // },
    {
      label: t('navigation.signOut'),
      icon: faArrowRightFromBracket,
      href: '#',
      testid: 'account-dropdown-sign-out',
      disabled: false,
      onClick: signOut,
    },
  ]
}
