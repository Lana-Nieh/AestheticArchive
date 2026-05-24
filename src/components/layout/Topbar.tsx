import { useNavigate } from 'react-router-dom'
import { Search, UploadCloud, Sparkles, Command } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Kbd } from '@/components/ui/Kbd'
import { useUi } from '@/stores/uiStore'
import { useState } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import { useT } from '@/lib/i18n'

export function Topbar() {
  const navigate = useNavigate()
  const setCommandMenuOpen = useUi((s) => s.setCommandMenuOpen)
  const setUploadDialogOpen = useUi((s) => s.setUploadDialogOpen)
  const [q, setQ] = useState('')
  const t = useT()

  return (
    <header className="h-[var(--topbar-h)] w-full border-b border-ink/[0.06] bg-paper-50/80 backdrop-blur-md sticky top-0 z-30">
      <div className="h-full px-5 flex items-center gap-3">
        <form
          className="flex-1 max-w-2xl mx-auto relative"
          onSubmit={(e) => {
            e.preventDefault()
            if (!q.trim()) return
            navigate(`/search?q=${encodeURIComponent(q.trim())}`)
          }}
        >
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-ink-600/70 group-focus-within:text-ink" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('top.search_placeholder')}
              className="w-full h-9 pl-9 pr-24 bg-paper border border-ink/[0.10] rounded-md text-[13px] text-ink placeholder:text-ink-600/55 ring-focus hover:border-ink/[0.18] focus:border-ink/[0.3] transition-colors"
            />
            <button
              type="button"
              onClick={() => setCommandMenuOpen(true)}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-2 h-6 rounded-xs text-ink-600 hover:bg-ink/[0.05]"
            >
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </button>
          </div>
        </form>

        <div className="flex items-center gap-1.5">
          <Tooltip content={t('top.open_command_menu')} shortcut="⌘K">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCommandMenuOpen(true)}
              aria-label={t('top.command_menu')}
            >
              <Command className="h-[15px] w-[15px]" strokeWidth={1.6} />
            </Button>
          </Tooltip>
          <Tooltip content={t('top.ask_agent')}>
            <Button variant="ghost" size="icon" aria-label={t('top.agent')}>
              <Sparkles className="h-[15px] w-[15px]" strokeWidth={1.6} />
            </Button>
          </Tooltip>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setUploadDialogOpen(true)}
            className="gap-2"
          >
            <UploadCloud className="h-[14px] w-[14px]" strokeWidth={1.8} />
            {t('top.import')}
            <Kbd className="bg-ink-800 border-paper/20 text-paper/80 ml-0.5">⌘U</Kbd>
          </Button>
        </div>
      </div>
    </header>
  )
}
