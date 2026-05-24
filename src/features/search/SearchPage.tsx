import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search as SearchIcon, Sparkles, ArrowRight, Filter, Plus, Compass } from 'lucide-react'
import { AssetMasonry } from '@/components/asset/AssetMasonry'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { searchAdapter } from '@/data/adapters/searchAdapter'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { useSelection } from '@/stores/selectionStore'
import { useUi } from '@/stores/uiStore'
import { useT } from '@/lib/i18n'

const exampleKeys = [
  'search.example.1',
  'search.example.2',
  'search.example.3',
  'search.example.4',
  'search.example.5',
] as const

export function SearchPage() {
  const [sp, setSp] = useSearchParams()
  const navigate = useNavigate()
  const q = sp.get('q') ?? ''
  const [input, setInput] = useState(q)
  const sel = useSelection()
  const ui = useUi()
  const [profileLens, setProfileLens] = useState(false)
  const t = useT()

  useEffect(() => setInput(q), [q])

  const result = useMemo(() => searchAdapter.search({ q }), [q])

  const submit = (value: string) => {
    if (!value.trim()) return
    setSp({ q: value })
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="px-7 pt-10">
        <div className="eyebrow mb-2">{t('search.eyebrow')}</div>
        <h1 className="serif text-[42px] leading-none tracking-editorial text-ink">
          {t('search.title_part1')} <em className="italic">{t('search.title_em')}</em>{t('search.title_part2')}
        </h1>
        <p className="text-[13.5px] text-ink-600 mt-3 max-w-2xl">
          {t('search.body')}
        </p>

        <form
          className="relative mt-7"
          onSubmit={(e) => {
            e.preventDefault()
            submit(input)
          }}
        >
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-600" strokeWidth={1.5} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full h-14 pl-14 pr-32 bg-paper border border-ink/[0.12] rounded-lg text-[15px] text-ink placeholder:text-ink-600/55 ring-focus hover:border-ink/[0.22] focus:border-ink/[0.4]"
            autoFocus
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setProfileLens((v) => !v)}
              className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-md border text-[12px] transition-colors ${
                profileLens
                  ? 'bg-accent/[0.1] border-accent/30 text-accent-600'
                  : 'border-ink/[0.12] text-ink-600 hover:border-ink/[0.24] hover:text-ink'
              }`}
            >
              <Compass className="h-3.5 w-3.5" strokeWidth={1.7} />
              <span className="hidden md:inline">{t('search.profile_lens')}</span>
            </button>
            <Button type="submit" variant="primary" size="md">
              {t('search.btn')}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </form>

        {!q && (
          <div className="mt-6">
            <span className="eyebrow mr-3">{t('search.try')}</span>
            <div className="inline-flex flex-wrap gap-1.5">
              {exampleKeys.map((key) => {
                const label = t(key)
                return (
                  <button
                    key={key}
                    onClick={() => navigate(`/search?q=${encodeURIComponent(label)}`)}
                    className="text-[12px] px-2.5 py-1 rounded-sm border border-ink/[0.12] text-ink-700 hover:border-ink/[0.3] hover:text-ink transition-colors"
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {q && (
        <div className="px-7 mt-10">
          <div className="rounded-md border border-ink/[0.08] bg-paper-50 p-5 mb-7">
            <div className="flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-accent mt-1" strokeWidth={2} />
              <div className="flex-1">
                <div className="eyebrow text-accent-600 mb-1">{t('search.curator_response')}</div>
                <p className="serif italic text-[18px] leading-snug tracking-editorial text-ink-800">
                  {result.explanation.summary}
                </p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ExplainGroup title={t('search.matched_moods')} items={result.explanation.matchedMoods} />
                  <ExplainGroup title={t('search.matched_tags')} items={result.explanation.matchedTags} />
                  <ExplainGroup title={t('search.matched_colors')} items={result.explanation.matchedColors} />
                </div>

                {result.suggestedRefinements.length > 0 && (
                  <div className="mt-5 flex items-center gap-2 flex-wrap">
                    <span className="eyebrow">{t('search.refine')}</span>
                    {result.suggestedRefinements.map((r) => (
                      <button
                        key={r.label}
                        onClick={() => navigate(`/search?q=${encodeURIComponent(r.query)}`)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-sm border border-ink/[0.12] text-[11.5px] text-ink-700 hover:border-ink/[0.3] transition-colors"
                      >
                        <Filter className="h-2.5 w-2.5" />
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results meta */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="eyebrow">{t('search.results')}</span>
              <span className="mono text-[10.5px] uppercase tracking-widest text-ink-600">
                {t('search.matches_n', { n: result.items.length })}
              </span>
              {profileLens && (
                <Badge variant="ai" size="sm">
                  <Compass className="h-3 w-3" /> {t('search.filtered_by_profile')}
                </Badge>
              )}
            </div>
            {sel.selectedAssetIds.length > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => ui.openCollectionPicker(sel.selectedAssetIds)}
              >
                <Plus className="h-3.5 w-3.5" />
                {t('search.save_n', { n: sel.selectedAssetIds.length })}
              </Button>
            )}
          </div>

          {result.items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="serif italic text-[20px] text-ink-700 tracking-editorial">
                {t('search.no_matches')}
              </p>
            </div>
          ) : (
            <AssetMasonry
              assets={result.items}
              selectedIds={sel.selectedAssetIds}
              onOpen={(id) => ui.openAssetDetail(id)}
              onSelect={(id, mode) => (mode === 'toggle' ? sel.toggle(id) : sel.selectOne(id))}
              onAddToCollection={(id) => ui.openCollectionPicker([id])}
              onToggleFavorite={(id) => assetAdapter.toggleFavorite(id)}
              layout="masonry"
              columns={5}
            />
          )}
        </div>
      )}
    </div>
  )
}

function ExplainGroup({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return (
    <div>
      <div className="eyebrow mb-1.5">{title}</div>
      <div className="text-[12px] text-ink-600">—</div>
    </div>
  )
  return (
    <div>
      <div className="eyebrow mb-1.5">{title}</div>
      <div className="flex flex-wrap gap-1">
        {items.map((s) => (
          <Badge key={s} variant="soft" size="sm">
            {s}
          </Badge>
        ))}
      </div>
    </div>
  )
}
