import { Filter, Sparkles, X } from 'lucide-react'
import { useFilters } from '@/stores/filterStore'
import { useUi } from '@/stores/uiStore'
import { cn, isLight } from '@/lib/utils'
import { useT, useLang } from '@/lib/i18n'
import { Drawer, DrawerContent } from '@/components/ui/Drawer'

const styleTags = ['warm minimal', 'editorial', 'wabi-sabi', 'brutalist', 'quiet luxury', 'mid-century', '90s', 'y2k']
const moodTags = ['calm', 'tactile', 'natural light', 'cool', 'romantic', 'contemplative', 'craft']
const materialTags = ['oak', 'linen', 'ceramic', 'brass', 'concrete', 'plaster', 'stone', 'wool', 'chrome']
const subjectTags = ['interior', 'architecture', 'still life', 'portrait', 'landscape', 'typography', 'palette']

// Display label translations for tag chips (data values stay in English)
const tagZh: Record<string, string> = {
  'warm minimal': '温暖极简',
  editorial: '编辑感',
  'wabi-sabi': '侘寂',
  brutalist: '粗野主义',
  'quiet luxury': '静奢',
  'mid-century': '世纪中叶',
  '90s': '90 年代',
  y2k: 'Y2K',
  calm: '宁静',
  tactile: '可触',
  'natural light': '自然光',
  cool: '冷调',
  romantic: '浪漫',
  contemplative: '内省',
  craft: '手作',
  oak: '橡木',
  linen: '亚麻',
  ceramic: '陶瓷',
  brass: '黄铜',
  concrete: '混凝土',
  plaster: '石膏',
  stone: '石头',
  wool: '羊毛',
  chrome: '镀铬',
  interior: '室内',
  architecture: '建筑',
  'still life': '静物',
  portrait: '人像',
  landscape: '风景',
  typography: '字体',
  palette: '色板',
}

export const palette = [
  { hex: '#E9DBC3', name: 'Linen', zh: '亚麻', temp: 'warm' as const },
  { hex: '#C7B49A', name: 'Oak', zh: '橡木', temp: 'warm' as const },
  { hex: '#A47E55', name: 'Brass', zh: '黄铜', temp: 'warm' as const },
  { hex: '#5E4533', name: 'Coffee', zh: '咖啡', temp: 'warm' as const },
  { hex: '#9D9A92', name: 'Concrete', zh: '混凝土', temp: 'cool' as const },
  { hex: '#7E8FA0', name: 'Slate', zh: '石板', temp: 'cool' as const },
  { hex: '#7C8576', name: 'Moss', zh: '苔藓', temp: 'cool' as const },
  { hex: '#B5532A', name: 'Clay', zh: '陶土', temp: 'warm' as const },
]

export function tagDisplayLabel(label: string, lang: 'zh' | 'en'): string {
  return lang === 'zh' ? tagZh[label] ?? label : label
}

export function ArchiveFilters() {
  const filtersOpen = useUi((s) => s.filtersOpen)
  const setFiltersOpen = useUi((s) => s.setFiltersOpen)
  const tagLabels = useFilters((s) => s.tagLabels)
  const toggleTag = useFilters((s) => s.toggleTag)
  const colorTemp = useFilters((s) => s.colorTemp)
  const setColorTemp = useFilters((s) => s.setColorTemp)
  const colorHex = useFilters((s) => s.colorHex)
  const setColorHex = useFilters((s) => s.setColorHex)
  const rating = useFilters((s) => s.rating)
  const setRating = useFilters((s) => s.setRating)
  const reset = useFilters((s) => s.reset)
  const isFavorite = useFilters((s) => s.isFavorite)
  const setFavorite = useFilters((s) => s.setFavorite)
  const t = useT()
  const lang = useLang()

  const anyFilter =
    tagLabels.length || colorTemp || colorHex || rating || isFavorite

  const displayTag = (l: string) => tagDisplayLabel(l, lang)

  return (
    <Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>
      <DrawerContent side="left" width="320px" showClose={false}>
        <div className="sticky top-0 px-5 py-4 border-b border-ink/[0.06] bg-paper/95 backdrop-blur z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-ink-600" strokeWidth={1.7} />
            <span className="eyebrow">{t('filters.refine')}</span>
          </div>
          <div className="flex items-center gap-3">
            {anyFilter ? (
              <button
                onClick={reset}
                className="text-[11px] text-ink-600 hover:text-ink inline-flex items-center gap-1"
              >
                <X className="h-2.5 w-2.5" />
                {t('filters.reset')}
              </button>
            ) : null}
            <button
              onClick={() => setFiltersOpen(false)}
              className="h-6 w-6 inline-flex items-center justify-center rounded-xs text-ink-600 hover:text-ink hover:bg-ink/[0.06] ring-focus"
              aria-label={t('common.close')}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">
          <FilterGroup title={t('filters.color_temperature')}>
            <div className="flex gap-2">
              {(['warm', 'cool', 'neutral'] as const).map((temp) => (
                <button
                  key={temp}
                  onClick={() => setColorTemp(temp)}
                  className={cn(
                    'flex-1 h-8 rounded-sm text-[11.5px] capitalize border transition-colors',
                    colorTemp === temp
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-paper text-ink-600 border-ink/[0.12] hover:border-ink/[0.24] hover:text-ink'
                  )}
                >
                  {t(`filters.temp.${temp}`)}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title={t('filters.palette')}>
            <div className="grid grid-cols-8 gap-1.5">
              {palette.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColorHex(c.hex)}
                  title={`${lang === 'zh' ? c.zh : c.name} · ${c.hex}`}
                  className={cn(
                    'h-6 w-6 rounded-full transition-transform ring-focus',
                    colorHex === c.hex && 'ring-2 ring-ink ring-offset-2 ring-offset-paper'
                  )}
                  style={{
                    background: c.hex,
                    boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(23,21,19,0.08)' : 'none',
                  }}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title={t('filters.style')}>
            <ChipCloud labels={styleTags} active={tagLabels} onToggle={toggleTag} display={displayTag} />
          </FilterGroup>

          <FilterGroup title={t('filters.mood')}>
            <ChipCloud labels={moodTags} active={tagLabels} onToggle={toggleTag} display={displayTag} />
          </FilterGroup>

          <FilterGroup title={t('filters.material')}>
            <ChipCloud labels={materialTags} active={tagLabels} onToggle={toggleTag} display={displayTag} />
          </FilterGroup>

          <FilterGroup title={t('filters.subject')}>
            <ChipCloud labels={subjectTags} active={tagLabels} onToggle={toggleTag} display={displayTag} />
          </FilterGroup>

          <FilterGroup title={t('filters.rating')}>
            <div className="flex gap-1.5">
              {[3, 4, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setRating(r)}
                  className={cn(
                    'flex-1 h-8 rounded-sm text-[11.5px] border transition-colors',
                    rating === r
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-paper text-ink-600 border-ink/[0.12] hover:border-ink/[0.24]'
                  )}
                >
                  {r}★ +
                </button>
              ))}
            </div>
            <label className="mt-2 flex items-center gap-2 text-[12px] text-ink-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setFavorite(e.target.checked)}
                className="accent-accent"
              />
              {t('filters.favorites_only')}
            </label>
          </FilterGroup>

          <div className="rounded-md border border-ink/[0.08] bg-paper-50/60 p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-3.5 w-3.5 text-accent mt-0.5" strokeWidth={2} />
              <p className="text-[11.5px] text-ink-700 leading-snug">
                {t('filters.profile_lens_card')}
              </p>
            </div>
            <button className="mt-2 text-[11.5px] text-accent-600 hover:text-accent font-medium">
              {t('filters.apply_profile_lens')}
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow mb-2.5">{title}</div>
      {children}
    </div>
  )
}

function ChipCloud({
  labels,
  active,
  onToggle,
  display,
}: {
  labels: string[]
  active: string[]
  onToggle: (l: string) => void
  display: (l: string) => string
}) {
  const set = new Set(active)
  return (
    <div className="flex flex-wrap gap-1.5">
      {labels.map((l) => (
        <button
          key={l}
          onClick={() => onToggle(l)}
          className={cn(
            'text-[11px] px-2 py-1 rounded-sm border transition-colors',
            set.has(l)
              ? 'bg-ink text-paper border-ink'
              : 'bg-paper text-ink-700 border-ink/[0.12] hover:border-ink/[0.24]'
          )}
        >
          {display(l)}
        </button>
      ))}
    </div>
  )
}
