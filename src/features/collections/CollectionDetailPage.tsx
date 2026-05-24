import { useEffect, useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Pencil,
  Share2,
  Download,
  Sparkles,
  Wand2,
  Plus,
  FileDown,
  Split,
} from 'lucide-react'
import { AssetMasonry } from '@/components/asset/AssetMasonry'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { collectionAdapter, subscribeCollections } from '@/data/adapters/collectionAdapter'
import { assetAdapter, subscribeAssets } from '@/data/adapters/assetAdapter'
import { useSelection } from '@/stores/selectionStore'
import { useUi } from '@/stores/uiStore'
import { isLight } from '@/lib/utils'
import { useT, useRelativeTime } from '@/lib/i18n'

export function CollectionDetailPage() {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const sel = useSelection()
  const ui = useUi()
  const t = useT()
  const relativeTime = useRelativeTime()

  const [, setTick] = useState(0)
  useEffect(() => {
    const u1 = subscribeCollections(() => setTick((x) => x + 1))
    const u2 = subscribeAssets(() => setTick((x) => x + 1))
    return () => {
      u1?.()
      u2?.()
    }
  }, [])

  const collection = useMemo(
    () => (collectionId ? collectionAdapter.get(collectionId) : null),
    [collectionId]
  )

  if (!collection) {
    return (
      <div className="p-10">
        <button onClick={() => navigate('/collections')} className="text-ink-600 hover:text-ink text-[12.5px]">
          {t('cdetail.not_found_back')}
        </button>
        <p className="mt-6 text-ink-600">{t('cdetail.not_found')}</p>
      </div>
    )
  }

  const items = collection.assetIds
    .map((id) => assetAdapter.get(id))
    .filter(Boolean) as ReturnType<typeof assetAdapter.get>[]
  const assets = items.filter((x): x is NonNullable<typeof x> => !!x)
  const colors = assets.flatMap((a) => a.colors).slice(0, 12)
  const tagFreq = new Map<string, number>()
  for (const a of assets)
    for (const t of [...a.tags, ...a.aiTags]) {
      tagFreq.set(t.label, (tagFreq.get(t.label) ?? 0) + 1)
    }
  const topTags = [...tagFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)

  const onSelect = (id: string, mode: 'single' | 'toggle' | 'range') => {
    if (mode === 'toggle') sel.toggle(id)
    else sel.selectOne(id)
  }

  return (
    <div>
      {/* Editorial cover header */}
      <div className="relative border-b border-ink/[0.06] bg-paper-50">
        <div className="px-7 pt-6 pb-4">
          <Link to="/collections" className="inline-flex items-center gap-1 text-ink-600 hover:text-ink text-[12px]">
            <ChevronLeft className="h-3.5 w-3.5" />
            {t('cdetail.back')}
          </Link>
        </div>

        <div className="px-7 pb-10 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-7">
            {collection.isAiSuggested && (
              <div className="mb-3">
                <Badge variant="ai" size="sm">
                  <Sparkles className="h-3 w-3" strokeWidth={2} /> {t('cdetail.ai_badge')}
                </Badge>
              </div>
            )}
            <div className="eyebrow mb-2">{t('cdetail.eyebrow')}</div>
            <h1 className="serif text-[clamp(40px,5.5vw,72px)] leading-[0.95] tracking-editorial text-ink">
              {collection.name}
            </h1>
            {collection.description && (
              <p className="serif italic text-[18px] tracking-editorial text-ink-700 mt-4 max-w-xl">
                {collection.description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <Button variant="primary" size="sm">
                <Wand2 className="h-3.5 w-3.5" />
                {t('cdetail.generate_moodboard')}
              </Button>
              <Button variant="secondary" size="sm">
                <FileDown className="h-3.5 w-3.5" />
                {t('cdetail.create_brief')}
              </Button>
              <Button variant="ghost" size="sm">
                <Pencil className="h-3.5 w-3.5" />
                {t('cdetail.rename')}
              </Button>
              <Button variant="ghost" size="sm">
                <Split className="h-3.5 w-3.5" />
                {t('cdetail.split')}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-3.5 w-3.5" />
                {t('cdetail.share')}
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-3.5 w-3.5" />
                {t('cdetail.export')}
              </Button>
            </div>

            {collection.isAiSuggested && collection.aiReason && (
              <div className="mt-6 rounded-md border border-accent/15 bg-accent/[0.04] p-3.5">
                <div className="eyebrow text-accent-600 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" strokeWidth={2} /> {t('cdetail.why_belong')}
                </div>
                <p className="serif italic text-[14px] tracking-editorial text-ink-800">
                  {collection.aiReason}
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="xs"
                    onClick={() => collection.id && collectionAdapter.accept(collection.id)}
                  >
                    {t('cdetail.accept_shelf')}
                  </Button>
                  <Button variant="ghost" size="xs">{t('cdetail.edit_name')}</Button>
                  <Button variant="ghost" size="xs">{t('cdetail.ignore')}</Button>
                </div>
              </div>
            )}
          </div>

          {/* Meta column */}
          <aside className="col-span-12 lg:col-span-5 space-y-5">
            <div>
              <div className="eyebrow mb-2">{t('cdetail.palette')}</div>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((c, i) => (
                  <span
                    key={i}
                    className="h-8 w-8 rounded-sm"
                    style={{
                      background: c.hex,
                      boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(23,21,19,0.06)' : 'none',
                    }}
                    title={`${c.name} · ${c.hex}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-2">{t('cdetail.visual_language')}</div>
              <div className="flex flex-wrap gap-1.5">
                {topTags.map(([label, count]) => (
                  <Badge key={label} variant="outline" size="sm">
                    {label}
                    <span className="mono text-ink-600 text-[10px]">{count}</span>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mono text-[10.5px] uppercase tracking-widest text-ink-600 flex items-center gap-3">
              <span>{t('cdetail.assets', { n: collection.assetIds.length })}</span>
              <span className="opacity-50">·</span>
              <span>{t('common.updated')} {relativeTime(collection.updatedAt)}</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Content */}
      <div className="px-7 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="eyebrow">{t('cdetail.assets_in_shelf')}</h2>
          <Button variant="secondary" size="sm">
            <Plus className="h-3.5 w-3.5" />
            {t('cdetail.add_from_archive')}
          </Button>
        </div>
        <AssetMasonry
          assets={assets}
          selectedIds={sel.selectedAssetIds}
          onOpen={(id) => ui.openAssetDetail(id)}
          onSelect={onSelect}
          onAddToCollection={(id) => ui.openCollectionPicker([id])}
          onToggleFavorite={(id) => assetAdapter.toggleFavorite(id)}
          layout="masonry"
          columns={5}
        />
      </div>
    </div>
  )
}
