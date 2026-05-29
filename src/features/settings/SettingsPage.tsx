import { Sparkles, Keyboard, Moon, Database, Shield, Languages, ChevronRight } from 'lucide-react'
import { Kbd } from '@/components/ui/Kbd'
import { useT } from '@/lib/i18n'
import { useTheme, type ThemeMode } from '@/stores/themeStore'
import { useLanguage, type Language } from '@/stores/languageStore'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/Toast'

export function SettingsPage() {
  const t = useT()
  const themeMode = useTheme((s) => s.mode)
  const setThemeMode = useTheme((s) => s.setMode)
  const lang = useLanguage((s) => s.lang)
  const setLang = useLanguage((s) => s.setLang)

  const sections = [
    {
      icon: <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.7} />,
      title: t('settings.section.curator.title'),
      desc: t('settings.section.curator.desc'),
    },
    {
      icon: <Database className="h-4 w-4 text-ink-600" strokeWidth={1.7} />,
      title: t('settings.section.storage.title'),
      desc: t('settings.section.storage.desc'),
    },
    {
      icon: <Shield className="h-4 w-4 text-ink-600" strokeWidth={1.7} />,
      title: t('settings.section.privacy.title'),
      desc: t('settings.section.privacy.desc'),
    },
  ]

  const shortcuts: [string[], string][] = [
    [['⌘', 'K'], t('settings.sc.open_command')],
    [['⌘', 'U'], t('settings.sc.import')],
    [['/'], t('settings.sc.focus_search')],
    [['Esc'], t('settings.sc.close')],
    [['Shift', 'Click'], t('settings.sc.range_select')],
    [['⌘', 'Click'], t('settings.sc.toggle_select')],
    [['F'], t('settings.sc.favorite')],
    [['1', '–', '5'], t('settings.sc.rate')],
    [['←', '→'], t('settings.sc.prev_next')],
  ]

  const themeOptions: { value: ThemeMode; labelKey: string }[] = [
    { value: 'light', labelKey: 'common.theme_light' },
    { value: 'dark', labelKey: 'common.theme_dark' },
    { value: 'system', labelKey: 'common.theme_system' },
  ]

  const langOptions: { value: Language; labelKey: string }[] = [
    { value: 'en', labelKey: 'common.lang_en' },
    { value: 'zh', labelKey: 'common.lang_zh' },
  ]

  return (
    <div className="max-w-[1000px] mx-auto px-7 py-10">
      <header className="mb-10">
        <div className="eyebrow mb-2">{t('settings.eyebrow')}</div>
        <h1 className="serif text-[42px] leading-none tracking-editorial text-ink">
          {t('settings.title')}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {sections.map((s) => (
          <button
            type="button"
            key={s.title}
            onClick={() =>
              toast.mock(
                t('mock.settings_section.title', { section: s.title }),
                t('mock.settings_section.desc')
              )
            }
            className="group text-left rounded-md border border-ink/[0.06] bg-paper p-5 hover:border-ink/[0.16] transition-colors ring-focus"
          >
            <div className="flex items-center gap-2 mb-2">
              {s.icon}
              <h3 className="serif text-[20px] tracking-editorial text-ink leading-tight">{s.title}</h3>
              <ChevronRight className="ml-auto h-3.5 w-3.5 text-ink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[13px] text-ink-600 leading-snug">{s.desc}</p>
          </button>
        ))}
      </div>

      {/* Interactive: Theme + Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <SettingCard
          icon={<Moon className="h-4 w-4 text-ink-600" strokeWidth={1.7} />}
          title={t('settings.section.theme.title')}
          desc={t('settings.section.theme.desc')}
        >
          <div className="inline-flex items-center gap-1 p-0.5 rounded-sm border border-ink/[0.08] bg-paper-50">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setThemeMode(opt.value)}
                className={cn(
                  'min-w-[80px] h-8 px-3 rounded-xs text-[12.5px] transition-colors ring-focus',
                  themeMode === opt.value
                    ? 'bg-ink text-paper'
                    : 'text-ink-600 hover:text-ink hover:bg-ink/[0.05]'
                )}
              >
                {t(opt.labelKey)}
              </button>
            ))}
          </div>
        </SettingCard>

        <SettingCard
          icon={<Languages className="h-4 w-4 text-ink-600" strokeWidth={1.7} />}
          title={t('settings.section.language.title')}
          desc={t('settings.section.language.desc')}
        >
          <div className="inline-flex items-center gap-1 p-0.5 rounded-sm border border-ink/[0.08] bg-paper-50">
            {langOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={cn(
                  'min-w-[110px] h-8 px-3 rounded-xs text-[12.5px] transition-colors ring-focus',
                  lang === opt.value
                    ? 'bg-ink text-paper'
                    : 'text-ink-600 hover:text-ink hover:bg-ink/[0.05]'
                )}
              >
                {t(opt.labelKey)}
              </button>
            ))}
          </div>
        </SettingCard>
      </div>

      <div className="rounded-md border border-ink/[0.06] bg-paper">
        <div className="px-5 py-4 border-b border-ink/[0.06] flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-ink-600" strokeWidth={1.7} />
          <h2 className="eyebrow">{t('settings.keyboard')}</h2>
        </div>
        <ul className="divide-y divide-ink/[0.06]">
          {shortcuts.map(([keys, label], i) => (
            <li key={i} className="px-5 py-3 flex items-center justify-between">
              <span className="text-[13px] text-ink">{label}</span>
              <span className="flex items-center gap-1">
                {keys.map((k, j) => (
                  <Kbd key={j}>{k}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SettingCard({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-md border border-ink/[0.06] bg-paper p-5 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="serif text-[20px] tracking-editorial text-ink leading-tight">{title}</h3>
      </div>
      <p className="text-[13px] text-ink-600 leading-snug mb-4">{desc}</p>
      <div className="mt-auto">{children}</div>
    </div>
  )
}
