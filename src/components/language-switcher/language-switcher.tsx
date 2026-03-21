import { useTranslation } from '@/lib/hooks/useTranslation'
import { Language } from '@/i18n/constants'
import BGFlag from '@/assets/bg.webp'
import USAFlag from '@/assets/usa.png'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'

// interface MobileLanguageSwitcherProps {
//   onClose?: () => void
// }

export const MobileLanguageSwitcher = () =>
  // {
  // onClose,
  // }: MobileLanguageSwitcherProps
  {
    const { lang, setLang } = useTranslation()

    const handleSwitchToEn = () => {
      setLang(Language.EN)
      // onClose?.()
    }

    const handleSwitchToBg = () => {
      setLang(Language.BG)
      // onClose?.()
    }

    return (
      <div className="flex items-center gap-1">
        <Button
          variant={lang === Language.EN ? 'alternate' : 'ghost'}
          className="w-auto"
          onClick={handleSwitchToEn}
          aria-label="Switch to English language"
        >
          <Icon
            src={USAFlag}
            style={{
              width: '24px',
              height: '16px',
            }}
            alt="USA Flag Icon"
          />
        </Button>
        |
        <Button
          variant={lang === Language.BG ? 'alternate' : 'ghost'}
          className="w-auto"
          onClick={handleSwitchToBg}
          aria-label="Switch to Bulgarian language"
        >
          <Icon
            src={BGFlag}
            style={{
              width: '24px',
              height: '16px',
            }}
            alt="BG Flag Icon"
          />
        </Button>
      </div>
    )
  }

export const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslation()

  const handleSwitchToEn = () => {
    setLang(Language.EN)
  }

  const handleSwitchToBg = () => {
    setLang(Language.BG)
  }

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="primary"
            className="w-auto sm:p-0"
            aria-label="Switch Language button"
          >
            <Text
              variant="h5"
              className="text-white"
            >
              {lang === Language.EN ? 'EN' : 'BG'}
            </Text>
            {/* <Icon
              src={lang === Language.EN ? USAFlag : BGFlag}
              style={{
                width: '24px',
                height: '16px',
              }}
              alt="Current Language Flag Icon"
            /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleSwitchToEn}>
              EN
              <DropdownMenuShortcut>
                <Icon
                  src={USAFlag}
                  style={{
                    width: '24px',
                    height: '16px',
                  }}
                  alt="USA Flag Icon"
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleSwitchToBg}>
              BG
              <DropdownMenuShortcut>
                <Icon
                  src={BGFlag}
                  style={{
                    width: '24px',
                    height: '16px',
                  }}
                  alt="BG Flag Icon"
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
