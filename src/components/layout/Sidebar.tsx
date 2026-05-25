import { NavLink } from 'react-router-dom'
import {
  Archive,
  FolderOpen,
  Sparkles,
  Layers,
  Compass,
  Settings,
} from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'
import { ThemeLanguageSwitcher } from '@/components/ui/Switcher'
import { useT, useLang } from '@/lib/i18n'

// Two visual groups: "browse" (where my stuff lives) and "do" (tools that act on it).
// Search is intentionally NOT here — the topbar search input is the canonical entry.
const browseNav = [
  { to: '/archive', labelKey: 'nav.archive', icon: Archive, meta: '1,248' },
  { to: '/collections', labelKey: 'nav.collections', icon: FolderOpen, meta: '12' },
  { to: '/projects', labelKey: 'nav.projects', icon: Layers, meta: '2' },
] as const

const toolsNav = [
  { to: '/profile', labelKey: 'nav.profile', icon: Compass },
  { to: '/agent', labelKey: 'nav.agent', icon: Sparkles, dot: 6 },
] as const

const shelves = [
  { label: 'Quiet Luxury Interiors', zh: '静奢室内', to: '/collections/col_001', count: 6 },
  { label: 'Warm Editorial Layouts', zh: '温暖编辑版式', to: '/collections/col_002', count: 3 },
  { label: 'Japanese Cafe References', zh: '日式咖啡馆参考', to: '/collections/col_004', count: 4 },
  { label: 'Material Studies', zh: '材质研究', to: '/collections/col_005', count: 4 },
]

export function Sidebar() {
  const t = useT()

  return (
    <aside className="flex flex-col h-full w-[var(--sidebar-w)] shrink-0 border-r border-ink/[0.06] bg-paper-50">
      <div className="h-[var(--topbar-h)] px-5 flex items-center border-b border-ink/[0.06]">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-0.5">
          {browseNav.map((n) => (
            <NavItem key={n.to} {...n} />
          ))}
        </ul>

        <div className="h-px bg-ink/[0.05] my-4 mx-2.5" />

        <ul className="space-y-0.5">
          {toolsNav.map((n) => (
            <NavItem key={n.to} {...n} />
          ))}
        </ul>

        <div className="mt-8 mb-3 flex items-center justify-between px-2.5">
          <span className="eyebrow">{t('nav.shelves')}</span>
          <button className="text-ink-600 hover:text-ink text-[10.5px] mono">+</button>
        </div>
        <ul className="space-y-0.5">
          {shelves.map((s) => (
            <li key={s.to}>
              <NavLink
                to={s.to}
                className={({ isActive }) =>
                  cn(
                    'relative flex items-center justify-between gap-2 py-1.5 pl-3 pr-2.5 rounded-sm',
                    'text-[12.5px] text-ink-600 hover:text-ink hover:bg-ink/[0.04] transition-colors ring-focus',
                    isActive && 'text-ink bg-ink/[0.06]'
                  )
                }
              >
                <span className="truncate">
                  <ShelfLabel en={s.label} zh={s.zh} />
                </span>
                <span className="mono text-[10.5px] text-ink-600/55">{s.count}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-ink/[0.06] space-y-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2.5 py-1.5 px-2.5 rounded-sm',
              'text-[12.5px] text-ink-600 hover:text-ink hover:bg-ink/[0.04] transition-colors ring-focus',
              isActive && 'text-ink bg-ink/[0.06]'
            )
          }
        >
          <Settings className="h-[14px] w-[14px]" strokeWidth={1.7} />
          {t('nav.settings')}
        </NavLink>

        <ThemeLanguageSwitcher />

        <div className="pl-2.5 mono text-[10px] uppercase tracking-widest text-ink-600/55">
          {t('nav.version')}
        </div>
      </div>
    </aside>
  )
}

function NavItem({
  to,
  labelKey,
  icon: Icon,
  meta,
  dot,
}: {
  to: string
  labelKey: string
  icon: React.ElementType
  meta?: string
  dot?: number
}) {
  const t = useT()
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            'group relative flex items-center justify-between gap-2 py-1.5 pl-2.5 pr-2.5 rounded-sm',
            'text-[13px] text-ink-600 hover:text-ink hover:bg-ink/[0.04] transition-colors ring-focus',
            isActive && 'text-ink bg-ink/[0.06] font-medium'
          )
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2px] rounded-full bg-ink"
                aria-hidden
              />
            )}
            <span className="flex items-center gap-2.5 min-w-0">
              <Icon className="h-[15px] w-[15px] shrink-0" strokeWidth={1.7} />
              <span className="truncate">{t(labelKey)}</span>
            </span>
            {dot ? (
              <span className="inline-flex items-center gap-1 mono text-[10.5px] text-ink-600/70">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {dot}
              </span>
            ) : meta ? (
              <span className="mono text-[10.5px] text-ink-600/55 group-hover:text-ink-600">
                {meta}
              </span>
            ) : null}
          </>
        )}
      </NavLink>
    </li>
  )
}

function ShelfLabel({ en, zh }: { en: string; zh: string }) {
  const lang = useLang()
  return <>{lang === 'zh' ? zh : en}</>
}
