import { LayoutGrid, Rows3, Columns3, ArrowUpDown, SlidersHorizontal, Heart } from 'lucide-react'
import { useFilters } from '@/stores/filterStore'
import { cn } from '@/lib/utils'
import { useUi } from '@/stores/uiStore'
import { useT } from '@/lib/i18n'

const sorts = [
  { value: 'recent', labelKey: 'toolbar.sort.recent' },
  { value: 'oldest', labelKey: 'toolbar.sort.oldest' },
  { value: 'name', labelKey: 'toolbar.sort.name' },
  { value: 'rating', labelKey: 'toolbar.sort.rating' },
] as const

export function ArchiveToolbar({ count }: { count: number }) {
  const sort = useFilters((s) => s.sort)
  const setSort = useFilters((s) => s.setSort)
  const layout = useFilters((s) => s.layout)
  const setLayout = useFilters((s) => s.setLayout)
  const isFavorite = useFilters((s) => s.isFavorite)
  const setFavorite = useFilters((s) => s.setFavorite)
  const tagLabels = useFilters((s) => s.tagLabels)
  const toggleFilters = useUi((s) => s.toggleFilters)
  const t = useT()

  return (
    <div className="flex items-center justify-between gap-3 px-7 py-4 border-b border-ink/[0.06] bg-paper-50/60 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleFilters}
          className="inline-flex items-center gap-1.5 text-[12px] text-ink-600 hover:text-ink"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.6} />
          {t('toolbar.filters')}
        </button>
        <span className="text-ink/[0.18]">·</span>
        <span className="mono text-[11px] uppercase tracking-widest text-ink-600">
          {count.toLocaleString()} {count === 1 ? t('toolbar.asset') : t('toolbar.assets')}
          {tagLabels.length > 0 && (
            <span className="ml-1 text-accent">· {tagLabels.length} {t('toolbar.active')}</span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFavorite(!isFavorite)}
          className={cn(
            'inline-flex items-center gap-1.5 h-8 px-2.5 rounded-sm border text-[12px] transition-colors',
            isFavorite
              ? 'bg-accent/[0.1] border-accent/30 text-accent-600'
              : 'border-ink/[0.12] text-ink-600 hover:border-ink/[0.24] hover:text-ink'
          )}
        >
          <Heart className={cn('h-3.5 w-3.5', isFavorite && 'fill-accent text-accent')} strokeWidth={1.7} />
          {t('toolbar.favorites')}
        </button>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="appearance-none h-8 pl-3 pr-8 rounded-sm border border-ink/[0.12] bg-paper text-[12px] text-ink-700 cursor-pointer hover:border-ink/[0.24]"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {t(s.labelKey)}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-ink-600 pointer-events-none" />
        </div>

        <div className="flex items-center gap-px bg-paper border border-ink/[0.12] rounded-sm p-0.5">
          <LayoutBtn active={layout === 'masonry'} onClick={() => setLayout('masonry')} aria-label={t('toolbar.layout.masonry')}>
            <Columns3 className="h-3.5 w-3.5" strokeWidth={1.7} />
          </LayoutBtn>
          <LayoutBtn active={layout === 'bento'} onClick={() => setLayout('bento')} aria-label={t('toolbar.layout.bento')}>
            <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.7} />
          </LayoutBtn>
          <LayoutBtn active={layout === 'grid'} onClick={() => setLayout('grid')} aria-label={t('toolbar.layout.grid')}>
            <Rows3 className="h-3.5 w-3.5" strokeWidth={1.7} />
          </LayoutBtn>
        </div>
      </div>
    </div>
  )
}

function LayoutBtn({
  children,
  active,
  ...rest
}: { active: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'h-7 w-7 inline-flex items-center justify-center rounded-xs',
        active ? 'bg-ink text-paper' : 'text-ink-600 hover:bg-ink/[0.05]'
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
