import { NavLink } from 'react-router-dom'
import {
  Archive,
  FolderOpen,
  Search,
  Sparkles,
  Layers,
  Compass,
  Settings,
} from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ThemeLanguageSwitcher } from '@/components/ui/Switcher'
import { useT, useLang } from '@/lib/i18n'

const navItems = [
  { to: '/archive', labelKey: 'nav.archive', icon: Archive, meta: '1,248' },
  { to: '/collections', labelKey: 'nav.collections', icon: FolderOpen, meta: '12' },
  { to: '/search', labelKey: 'nav.search', icon: Search },
  { to: '/profile', labelKey: 'nav.profile', icon: Compass },
  { to: '/projects', labelKey: 'nav.projects', icon: Layers, meta: '2' },
  { to: '/agent', labelKey: 'nav.agent', icon: Sparkles, badge: 6 },
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
          {navItems.map((n) => {
            const Icon = n.icon
            return (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center justify-between gap-2 h-8.5 py-1.5 px-2.5 rounded-sm',
                      'text-[13px] text-ink-600 hover:text-ink hover:bg-ink/[0.04] transition-colors ring-focus',
                      isActive && 'text-ink bg-ink/[0.06] font-medium'
                    )
                  }
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Icon className="h-[15px] w-[15px] shrink-0" strokeWidth={1.7} />
                    <span className="truncate">{t(n.labelKey)}</span>
                  </span>
                  {'badge' in n && n.badge ? (
                    <Badge size="xs" variant="accent">
                      {n.badge}
                    </Badge>
                  ) : 'meta' in n && n.meta ? (
                    <span className="mono text-[10.5px] text-ink-600/60 group-hover:text-ink-600">
                      {n.meta}
                    </span>
                  ) : null}
                </NavLink>
              </li>
            )
          })}
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
                    'flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-sm',
                    'text-[12.5px] text-ink-600 hover:text-ink hover:bg-ink/[0.04] transition-colors ring-focus',
                    isActive && 'text-ink bg-ink/[0.06]'
                  )
                }
              >
                <span className="truncate flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-ink-600/60" />
                  <ShelfLabel en={s.label} zh={s.zh} />
                </span>
                <span className="mono text-[10.5px] text-ink-600/60">{s.count}</span>
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
              'flex items-center gap-2 py-1.5 px-2.5 rounded-sm',
              'text-[13px] text-ink-600 hover:text-ink hover:bg-ink/[0.04] transition-colors ring-focus',
              isActive && 'text-ink bg-ink/[0.06]'
            )
          }
        >
          <Settings className="h-[15px] w-[15px]" strokeWidth={1.7} />
          {t('nav.settings')}
        </NavLink>

        <ThemeLanguageSwitcher />

        <div className="pl-2.5 mono text-[10px] uppercase tracking-widest text-ink-600/60">
          {t('nav.version')}
        </div>
      </div>
    </aside>
  )
}

function ShelfLabel({ en, zh }: { en: string; zh: string }) {
  const lang = useLang()
  return <>{lang === 'zh' ? zh : en}</>
}
