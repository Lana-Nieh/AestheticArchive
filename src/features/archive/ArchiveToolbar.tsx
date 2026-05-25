import { LayoutGrid, Rows3, Columns3, ArrowUpDown, SlidersHorizontal, Heart, X } from 'lucide-react'
import { useFilters } from '@/stores/filterStore'
import { cn, isLight } from '@/lib/utils'
import { useUi } from '@/stores/uiStore'
import { useT, useLang } from '@/lib/i18n'
import { tagDisplayLabel, palette as filterPalette } from './ArchiveFilters'

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
  const toggleTag = useFilters((s) => s.toggleTag)
  const colorTemp = useFilters((s) => s.colorTemp)
  const setColorTemp = useFilters((s) => s.setColorTemp)
  const colorHex = useFilters((s) => s.colorHex)
  const setColorHex = useFilters((s) => s.setColorHex)
  const rating = useFilters((s) => s.rating)
  const setRating = useFilters((s) => s.setRating)
  const reset = useFilters((s) => s.reset)
  const toggleFilters = useUi((s) => s.toggleFilters)
  const t = useT()
  const lang = useLang()

  const activeCount =
    tagLabels.length +
    (colorTemp ? 1 : 0) +
    (colorHex ? 1 : 0) +
    (rating ? 1 : 0) +
    (isFavorite ? 1 : 0)

  const colorHexName = colorHex
    ? filterPalette.find((p) => p.hex === colorHex)
    : undefined

  return (
    <div className="flex items-center justify-between gap-4 px-7 py-3 border-b border-ink/[0.06] bg-paper-50/85 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          onClick={toggleFilters}
          className={cn(
            'inline-flex items-center gap-1.5 h-8 px-2.5 rounded-sm border text-[12px] transition-colors shrink-0',
            activeCount > 0
              ? 'border-ink/[0.18] text-ink bg-paper'
              : 'border-ink/[0.10] text-ink-600 hover:border-ink/[0.24] hover:text-ink bg-paper/60'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.7} />
          {t('toolbar.filters')}
          {activeCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-xs bg-ink text-paper text-[10px] mono">
              {activeCount}
            </span>
          )}
        </button>

        <span className="mono text-[11px] uppercase tracking-widest text-ink-600/80 shrink-0">
          {count.toLocaleString()} {count === 1 ? t('toolbar.asset') : t('toolbar.assets')}
        </span>

        {activeCount > 0 && (
          <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto no-scrollbar">
            <span className="text-ink/[0.18] shrink-0">·</span>

            {colorTemp && (
              <Chip onRemove={() => setColorTemp(colorTemp)}>
                {t(`filters.temp.${colorTemp}`)}
              </Chip>
            )}

            {colorHex && (
              <Chip onRemove={() => setColorHex(colorHex)}>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: colorHex,
                    boxShadow: isLight(colorHex) ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none',
                  }}
                />
                {colorHexName ? (lang === 'zh' ? colorHexName.zh : colorHexName.name) : colorHex}
              </Chip>
            )}

            {tagLabels.map((l) => (
              <Chip key={l} onRemove={() => toggleTag(l)}>
                {tagDisplayLabel(l, lang)}
              </Chip>
            ))}

            {rating && (
              <Chip onRemove={() => setRating(rating)}>{rating}★+</Chip>
            )}

            {isFavorite && (
              <Chip onRemove={() => setFavorite(false)}>{t('filters.favorites_only')}</Chip>
            )}

            <button
              onClick={reset}
              className="ml-1 text-[11px] text-ink-600/80 hover:text-ink shrink-0 underline-offset-2 hover:underline"
            >
              {t('filters.reset')}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setFavorite(!isFavorite)}
          className={cn(
            'inline-flex items-center justify-center h-8 w-8 rounded-sm border transition-colors',
            isFavorite
              ? 'bg-accent/[0.10] border-accent/30 text-accent-600'
              : 'border-ink/[0.10] text-ink-600 hover:border-ink/[0.24] hover:text-ink bg-paper/60'
          )}
          aria-label={t('toolbar.favorites')}
          title={t('toolbar.favorites')}
        >
          <Heart className={cn('h-3.5 w-3.5', isFavorite && 'fill-accent text-accent')} strokeWidth={1.7} />
        </button>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="appearance-none h-8 pl-3 pr-8 rounded-sm border border-ink/[0.10] bg-paper/60 text-[12px] text-ink-700 cursor-pointer hover:border-ink/[0.24]"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {t(s.labelKey)}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-ink-600 pointer-events-none" />
        </div>

        <div className="flex items-center gap-px bg-paper/60 border border-ink/[0.10] rounded-sm p-0.5">
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

function Chip({
  children,
  onRemove,
}: {
  children: React.ReactNode
  onRemove: () => void
}) {
  return (
    <span className="inline-flex items-center gap-1.5 h-6 pl-2 pr-1 rounded-xs bg-ink/[0.05] text-[11px] text-ink-700 shrink-0">
      <span className="inline-flex items-center gap-1.5">{children}</span>
      <button
        onClick={onRemove}
        className="h-4 w-4 inline-flex items-center justify-center rounded-xs text-ink-600 hover:text-ink hover:bg-ink/[0.06]"
        aria-label="Remove filter"
      >
        <X className="h-2.5 w-2.5" strokeWidth={2} />
      </button>
    </span>
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
