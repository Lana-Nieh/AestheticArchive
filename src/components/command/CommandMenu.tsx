import { Command } from 'cmdk'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Search,
  UploadCloud,
  Sparkles,
  Archive,
  FolderOpen,
  Compass,
  Layers,
  Settings,
  Palette,
  Tag,
  Filter,
  Moon,
  Globe,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUi } from '@/stores/uiStore'
import { useFilters } from '@/stores/filterStore'
import { useTheme } from '@/stores/themeStore'
import { useLanguage } from '@/stores/languageStore'
import { useT } from '@/lib/i18n'

export function CommandMenu() {
  const open = useUi((s) => s.commandMenuOpen)
  const setOpen = useUi((s) => s.setCommandMenuOpen)
  const setUpload = useUi((s) => s.setUploadDialogOpen)
  const navigate = useNavigate()
  const setQuery = useFilters((s) => s.setQuery)
  const toggleTheme = useTheme((s) => s.toggle)
  const toggleLang = useLanguage((s) => s.toggle)
  const t = useT()

  const go = (fn: () => void) => () => {
    setOpen(false)
    setTimeout(fn, 50)
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content className="fixed left-1/2 top-[14%] z-50 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-xl bg-paper border border-ink/[0.08] rounded-lg shadow-lift overflow-hidden data-[state=open]:animate-fade-up">
          <DialogPrimitive.Title className="sr-only">{t('top.command_menu')}</DialogPrimitive.Title>
          <Command className="bg-paper">
            <div className="flex items-center gap-2.5 px-4 h-12 border-b border-ink/[0.06]">
              <Search className="h-[15px] w-[15px] text-ink-600" />
              <Command.Input
                autoFocus
                placeholder={t('cmd.placeholder')}
                className="flex-1 bg-transparent outline-none text-[14px] text-ink placeholder:text-ink-600/60"
              />
              <span className="mono text-[10px] text-ink-600/60 uppercase tracking-widest">esc</span>
            </div>
            <Command.List className="max-h-[420px] overflow-y-auto p-2">
              <Command.Empty className="px-4 py-6 text-center text-ink-600 text-[13px]">
                {t('cmd.nothing')}
              </Command.Empty>

              <Command.Group heading={t('cmd.suggestions')} className="px-1">
                <Hint>
                  <span className="eyebrow">{t('cmd.suggestions')}</span>
                </Hint>
                <Row
                  icon={<Sparkles className="h-4 w-4" />}
                  onSelect={go(() => navigate(`/search?q=${encodeURIComponent(t('search.example.1'))}`))}
                  label={t('search.example.1')}
                  hint={t('cmd.semantic')}
                />
                <Row
                  icon={<Sparkles className="h-4 w-4" />}
                  onSelect={go(() => navigate(`/search?q=${encodeURIComponent(t('search.example.2'))}`))}
                  label={t('search.example.2')}
                  hint={t('cmd.semantic')}
                />
                <Row
                  icon={<Sparkles className="h-4 w-4" />}
                  onSelect={go(() => navigate(`/search?q=${encodeURIComponent(t('search.example.4'))}`))}
                  label={t('search.example.4')}
                  hint={t('cmd.semantic')}
                />
              </Command.Group>

              <Command.Group heading={t('cmd.actions')}>
                <Hint>
                  <span className="eyebrow">{t('cmd.actions')}</span>
                </Hint>
                <Row icon={<UploadCloud className="h-4 w-4" />} onSelect={go(() => setUpload(true))} label={t('cmd.import')} hint="⌘ U" />
                <Row icon={<Filter className="h-4 w-4" />} onSelect={go(() => setQuery(''))} label={t('cmd.reset_filters')} />
                <Row icon={<Palette className="h-4 w-4" />} onSelect={go(() => navigate('/profile'))} label={t('cmd.open_profile')} />
                <Row icon={<Tag className="h-4 w-4" />} onSelect={go(() => navigate('/agent'))} label={t('cmd.run_agent')} />
                <Row icon={<Moon className="h-4 w-4" />} onSelect={go(() => toggleTheme())} label={t('cmd.toggle_theme')} />
                <Row icon={<Globe className="h-4 w-4" />} onSelect={go(() => toggleLang())} label={t('cmd.toggle_lang')} />
              </Command.Group>

              <Command.Group heading={t('cmd.pages')}>
                <Hint>
                  <span className="eyebrow">{t('cmd.pages')}</span>
                </Hint>
                <Row icon={<Archive className="h-4 w-4" />} onSelect={go(() => navigate('/archive'))} label={t('nav.archive')} />
                <Row icon={<FolderOpen className="h-4 w-4" />} onSelect={go(() => navigate('/collections'))} label={t('nav.collections')} />
                <Row icon={<Compass className="h-4 w-4" />} onSelect={go(() => navigate('/profile'))} label={t('nav.profile')} />
                <Row icon={<Layers className="h-4 w-4" />} onSelect={go(() => navigate('/projects'))} label={t('nav.projects')} />
                <Row icon={<Settings className="h-4 w-4" />} onSelect={go(() => navigate('/settings'))} label={t('nav.settings')} />
              </Command.Group>
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

function Hint({ children }: { children: React.ReactNode }) {
  return <div className="px-3 pt-3 pb-1.5">{children}</div>
}

function Row({
  icon,
  label,
  hint,
  onSelect,
}: {
  icon: React.ReactNode
  label: string
  hint?: string
  onSelect: () => void
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center justify-between gap-3 px-3 py-2 rounded-sm text-[13px] text-ink-800 data-[selected=true]:bg-ink/[0.05] data-[selected=true]:text-ink cursor-pointer"
    >
      <span className="flex items-center gap-2.5">
        <span className="text-ink-600">{icon}</span>
        {label}
      </span>
      {hint && <span className="mono text-[10.5px] text-ink-600/70 uppercase tracking-widest">{hint}</span>}
    </Command.Item>
  )
}
