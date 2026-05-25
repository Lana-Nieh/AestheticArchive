import { useEffect, useMemo, useState } from 'react'
import { Archive as ArchiveIcon, UploadCloud } from 'lucide-react'
import { ArchiveFilters } from './ArchiveFilters'
import { ArchiveToolbar } from './ArchiveToolbar'
import { AssetMasonry } from '@/components/asset/AssetMasonry'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { useFilters } from '@/stores/filterStore'
import { useSelection } from '@/stores/selectionStore'
import { useUi } from '@/stores/uiStore'
import { assetAdapter, subscribeAssets } from '@/data/adapters/assetAdapter'
import { useT, useLang } from '@/lib/i18n'

export function ArchivePage() {
  const filters = useFilters()
  const ui = useUi()
  const sel = useSelection()
  const t = useT()
  const lang = useLang()
  const [, setTick] = useState(0)
  useEffect(() => subscribeAssets(() => setTick((x) => x + 1)), [])

  const result = useMemo(
    () =>
      assetAdapter.list({
        q: filters.query,
        tagLabels: filters.tagLabels,
        colorTemp: filters.colorTemp,
        colorHex: filters.colorHex,
        rating: filters.rating,
        isFavorite: filters.isFavorite || undefined,
        sort: filters.sort,
      }),
    [
      filters.query,
      filters.tagLabels,
      filters.colorTemp,
      filters.colorHex,
      filters.rating,
      filters.isFavorite,
      filters.sort,
    ]
  )

  const allIds = useMemo(() => result.items.map((a) => a.id), [result.items])

  const onSelect = (id: string, mode: 'single' | 'toggle' | 'range') => {
    if (mode === 'toggle') sel.toggle(id)
    else if (mode === 'range') {
      const last = sel.lastSelectedAssetId
      if (!last) return sel.selectOne(id)
      const a = allIds.indexOf(last)
      const b = allIds.indexOf(id)
      const [s, e] = a < b ? [a, b] : [b, a]
      sel.range(allIds.slice(s, e + 1))
    } else sel.selectOne(id)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Editorial section header — page identity, breathes */}
        <header className="px-7 pt-12 pb-10 max-w-[1400px]">
          <div className="flex items-end justify-between gap-8">
            <div>
              <div className="eyebrow mb-3">{t('archive.eyebrow')}</div>
              <h1 className="serif text-[52px] leading-[1.02] tracking-editorial text-ink">
                {t('archive.title_part1')}
                <em className="italic">{t('archive.title_em')}</em>
                {t('archive.title_part2')}
              </h1>
              <p className="text-[13.5px] text-ink-600 mt-4 max-w-md leading-relaxed">
                {t('archive.body')}
              </p>
            </div>
            <div className="text-right hidden md:block shrink-0">
              <div className="mono text-[10px] uppercase tracking-widest text-ink-600/70">
                {t('common.today')}
              </div>
              <div className="serif text-[16px] italic tracking-editorial text-ink-700 mt-1">
                {new Date().toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Toolbar sticks once the hero scrolls past */}
        <ArchiveToolbar count={result.total} />

        <div className="px-7 pt-5 pb-12">
          {result.items.length === 0 ? (
            <EmptyState
              icon={<ArchiveIcon className="h-5 w-5" strokeWidth={1.6} />}
              title={t('archive.empty_title')}
              description={t('archive.empty_desc')}
              actions={
                <Button variant="primary" size="sm" onClick={() => ui.setUploadDialogOpen(true)}>
                  <UploadCloud className="h-3.5 w-3.5" />
                  {t('archive.empty_action')}
                </Button>
              }
            />
          ) : (
            <AssetMasonry
              assets={result.items}
              selectedIds={sel.selectedAssetIds}
              onOpen={(id) => ui.openAssetDetail(id)}
              onSelect={onSelect}
              onAddToCollection={(id) => ui.openCollectionPicker([id])}
              onToggleFavorite={(id) => assetAdapter.toggleFavorite(id)}
              layout={filters.layout}
              columns={filters.layout === 'bento' ? 6 : 5}
            />
          )}
        </div>
      </div>

      {/* Filters render as a left-side drawer overlay, opt-in */}
      <ArchiveFilters />
    </div>
  )
}
