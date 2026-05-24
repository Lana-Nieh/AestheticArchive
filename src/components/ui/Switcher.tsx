import { Sun, Moon, Monitor, Globe } from 'lucide-react'
import { useTheme, type ThemeMode } from '@/stores/themeStore'
import { useLanguage, type Language } from '@/stores/languageStore'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const themeOptions: { value: ThemeMode; icon: typeof Sun; labelKey: string }[] = [
  { value: 'light', icon: Sun, labelKey: 'common.theme_light' },
  { value: 'dark', icon: Moon, labelKey: 'common.theme_dark' },
  { value: 'system', icon: Monitor, labelKey: 'common.theme_system' },
]

const langOptions: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '中' },
]

type Props = {
  className?: string
  variant?: 'sidebar' | 'inline' | 'landing'
}

export function ThemeLanguageSwitcher({ className, variant = 'sidebar' }: Props) {
  const mode = useTheme((s) => s.mode)
  const setMode = useTheme((s) => s.setMode)
  const lang = useLanguage((s) => s.lang)
  const setLang = useLanguage((s) => s.setLang)
  const t = useT()

  const isLanding = variant === 'landing'
  const stack = variant === 'sidebar' ? 'flex-col items-stretch gap-2' : 'flex-row items-center gap-2'

  return (
    <div className={cn('flex', stack, className)}>
      <div
        role="group"
        aria-label={t('switch.theme.aria')}
        className={cn(
          'inline-flex items-center p-0.5 rounded-sm border bg-paper',
          isLanding ? 'border-ink/[0.1]' : 'border-ink/[0.08]'
        )}
      >
        {themeOptions.map((opt) => {
          const Icon = opt.icon
          const active = mode === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              aria-label={t(opt.labelKey)}
              title={t(opt.labelKey)}
              className={cn(
                'inline-flex items-center justify-center h-6 w-7 rounded-xs transition-colors ring-focus',
                active
                  ? 'bg-ink text-paper'
                  : 'text-ink-600 hover:text-ink hover:bg-ink/[0.05]'
              )}
            >
              <Icon className="h-3 w-3" strokeWidth={1.8} />
            </button>
          )
        })}
      </div>

      <div
        role="group"
        aria-label={t('switch.lang.aria')}
        className={cn(
          'inline-flex items-center p-0.5 rounded-sm border bg-paper',
          isLanding ? 'border-ink/[0.1]' : 'border-ink/[0.08]'
        )}
      >
        <Globe className="h-3 w-3 text-ink-600 mx-1.5 shrink-0" strokeWidth={1.8} />
        {langOptions.map((opt) => {
          const active = lang === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => setLang(opt.value)}
              className={cn(
                'min-w-[26px] h-6 px-1.5 rounded-xs mono text-[10.5px] tracking-widest transition-colors ring-focus',
                active
                  ? 'bg-ink text-paper'
                  : 'text-ink-600 hover:text-ink hover:bg-ink/[0.05]'
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
