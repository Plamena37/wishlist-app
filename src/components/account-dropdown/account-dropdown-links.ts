import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '@/auth/hooks/useAuth'

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
      label: 'Sign Out',
      icon: faArrowRightFromBracket,
      href: '#',
      testid: 'account-dropdown-sign-out',
      disabled: false,
      onClick: signOut,
    },
  ]
}
