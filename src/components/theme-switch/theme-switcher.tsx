import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface ThemeSwitcherProps {
  className?: string
  toggleGroupItemBg?: string
  iconBg?: string
}

export const ThemeSwitcher = ({
  className,
  toggleGroupItemBg,
  iconBg,
}: ThemeSwitcherProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value) => value && setTheme(value as 'light' | 'dark')}
      className={cn('rounded-full bg-gray-200 p-1', className)}
    >
      <ToggleGroupItem
        value="light"
        className={cn(
          'h-8 w-8 rounded-full flex items-center justify-center cursor-pointer',
          'bg-gray-200 data-[state=on]:bg-gray-400',
          'hover:bg-transparent',
          toggleGroupItemBg
        )}
      >
        <FontAwesomeIcon
          icon={faSun}
          className={cn(
            theme === 'light' ? (iconBg ?? 'text-gray-700') : 'text-gray-500'
          )}
        />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="dark"
        className={cn(
          'h-8 w-8 flex items-center justify-center cursor-pointer',
          'bg-gray-200 data-[state=on]:bg-gray-400',
          'hover:bg-transparent',
          toggleGroupItemBg
        )}
      >
        <FontAwesomeIcon
          icon={faMoon}
          className={cn(
            theme === 'dark' ? (iconBg ?? 'text-gray-700') : 'text-gray-500'
          )}
        />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
