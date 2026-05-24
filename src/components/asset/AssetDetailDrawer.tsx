import { useEffect, useMemo, useState } from 'react'
import {
  Heart,
  Star,
  ExternalLink,
  Sparkles,
  Plus,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
  Trash2,
  FileDown,
  Wand2,
  X,
} from 'lucide-react'
import { Drawer, DrawerContent } from '@/components/ui/Drawer'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'
import { useUi } from '@/stores/uiStore'
import { assetAdapter, subscribeAssets } from '@/data/adapters/assetAdapter'
import { collectionAdapter } from '@/data/adapters/collectionAdapter'
import type { Asset } from '@/lib/types'
import { cn, formatBytes, isLight, uid } from '@/lib/utils'
import { useT, useRelativeTime } from '@/lib/i18n'

export function AssetDetailDrawer() {
  const open = useUi((s) => s.assetDetailOpen)
  const id = useUi((s) => s.activeAssetId)
  const close = useUi((s) => s.closeAssetDetail)
  const openCollectionPicker = useUi((s) => s.openCollectionPicker)
  const setOpen = useUi((s) => s.openAssetDetail)
  const t = useT()
  const relativeTime = useRelativeTime()

  const [, setTick] = useState(0)
  useEffect(() => subscribeAssets(() => setTick((x) => x + 1)), [])

  const asset = useMemo(() => (id ? assetAdapter.get(id) : null), [id])
  const similar = useMemo(() => (id ? assetAdapter.findSimilar(id, 6) : []), [id])
  const collections = useMemo(
    () => (asset ? collectionAdapter.list().filter((c) => asset.collections.includes(c.id)) : []),
    [asset]
  )

  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [newTag, setNewTag] = useState('')

  useEffect(() => setEditingTitle(null), [id])

  if (!asset) return null

  const allAssets = assetAdapter.list().items
  const idx = allAssets.findIndex((a) => a.id === asset.id)
  const prev = allAssets[idx - 1]
  const next = allAssets[idx + 1]

  const updateNotes = (value: string) => assetAdapter.update(asset.id, { notes: value })
  const updateTitle = () => {
    if (editingTitle !== null) {
      assetAdapter.update(asset.id, { title: editingTitle || asset.title })
      setEditingTitle(null)
    }
  }
  const setRating = (r: 1 | 2 | 3 | 4 | 5) => assetAdapter.setRating(asset.id, r)
  const addUserTag = () => {
    const label = newTag.trim()
    if (!label) return
    assetAdapter.addTag(asset.id, {
      id: uid('tag'),
      label,
      source: 'user',
    })
    setNewTag('')
  }
  const acceptAiTag = (tagId: string) => assetAdapter.acceptAiTag(asset.id, tagId)
  const removeTag = (tagId: string) => assetAdapter.removeTag(asset.id, tagId)

  return (
    <Drawer open={open} onOpenChange={(o) => !o && close()}>
      <DrawerContent width="var(--drawer-w)" showClose={false}>
        {/* Sticky header — nav arrows + actions + close */}
        <div className="px-5 h-12 border-b border-ink/[0.06] flex items-center justify-between gap-2 bg-paper-50/60 backdrop-blur-md">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={!prev}
              onClick={() => prev && setOpen(prev.id)}
              aria-label={t('ad.previous')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={!next}
              onClick={() => next && setOpen(next.id)}
              aria-label={t('ad.next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="mono text-[10.5px] text-ink-600 ml-1">
              {idx + 1} / {allAssets.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip content={asset.isFavorite ? t('ad.unfavorite') : t('ad.favorite')} shortcut="F">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => assetAdapter.toggleFavorite(asset.id)}
              >
                <Heart
                  className={cn('h-4 w-4', asset.isFavorite && 'fill-accent text-accent')}
                  strokeWidth={1.7}
                />
              </Button>
            </Tooltip>
            <Tooltip content={t('ad.find_similar')}>
              <Button variant="ghost" size="icon-sm">
                <SearchIcon className="h-4 w-4" strokeWidth={1.7} />
              </Button>
            </Tooltip>
            <Tooltip content={t('ad.add_to_collection')}>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => openCollectionPicker([asset.id])}
              >
                <Plus className="h-4 w-4" strokeWidth={1.7} />
              </Button>
            </Tooltip>
            <div className="w-px h-4 bg-ink/[0.1] mx-1" />
            <Button variant="ghost" size="icon-sm" onClick={close} aria-label={t('ad.close')}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Preview */}
          <div className="relative bg-paper-200/60 p-5">
            <div className="relative w-full overflow-hidden rounded-md bg-paper-200 shadow-soft">
              <img
                src={asset.previewUrl}
                alt={asset.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="px-5 pb-8 space-y-7">
            {/* Title + meta */}
            <section className="pt-2">
              {editingTitle !== null ? (
                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={updateTitle}
                  onKeyDown={(e) => e.key === 'Enter' && updateTitle()}
                  className="serif text-[24px] tracking-editorial w-full bg-transparent border-b border-ink/[0.18] focus:border-ink/[0.4] outline-none pb-1"
                />
              ) : (
                <h2
                  onClick={() => setEditingTitle(asset.title)}
                  className="serif text-[24px] leading-tight tracking-editorial text-ink cursor-text hover:text-ink-700"
                >
                  {asset.title}
                </h2>
              )}
              <div className="mt-2 flex items-center gap-3 flex-wrap mono text-[10.5px] uppercase tracking-widest text-ink-600">
                <span>{t(`ad.type.${asset.type}`)}</span>
                <span className="opacity-50">·</span>
                <span>{relativeTime(asset.importedAt)}</span>
                {asset.sourceLabel && (
                  <>
                    <span className="opacity-50">·</span>
                    <a
                      href={asset.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-ink"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {asset.sourceLabel}
                    </a>
                  </>
                )}
                <span className="opacity-50">·</span>
                <span>{formatBytes(asset.fileSize)}</span>
                {asset.width && (
                  <>
                    <span className="opacity-50">·</span>
                    <span>
                      {asset.width}×{asset.height}
                    </span>
                  </>
                )}
              </div>
            </section>

            {/* AI description card */}
            {asset.aiDescription && (
              <section className="rounded-md border border-ink/[0.08] bg-paper-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
                  <span className="eyebrow">{t('ad.curator_notes')}</span>
                </div>
                <p className="serif italic text-[15px] text-ink-800 leading-snug tracking-editorial">
                  {asset.aiDescription}
                </p>
              </section>
            )}

            {/* Color palette */}
            <section>
              <SectionHeader title={t('ad.dominant_palette')} hint={t('ad.colors_n', { n: asset.colors.length })} />
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
                {asset.colors.map((c) => (
                  <div
                    key={c.hex}
                    className="flex items-center gap-2.5 group cursor-pointer"
                    title={`Filter by ${c.hex}`}
                  >
                    <span
                      className="h-7 w-7 rounded-sm shrink-0"
                      style={{
                        background: c.hex,
                        boxShadow: isLight(c.hex)
                          ? 'inset 0 0 0 1px rgba(23, 21, 19, 0.08)'
                          : 'none',
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-[12.5px] text-ink truncate">{c.name}</div>
                      <div className="mono text-[10px] text-ink-600 uppercase tracking-widest">
                        {c.hex} · {c.percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section>
              <SectionHeader title={t('ad.tags')} hint={t('ad.tags_hint', { a: asset.tags.length, b: asset.aiTags.length })} />
              <div className="mt-3 flex flex-wrap gap-1.5">
                {asset.tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => removeTag(tag.id)}
                    className="group inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-ink/[0.14] text-[11.5px] text-ink hover:border-ink/[0.3]"
                  >
                    {tag.label}
                    <X className="h-2.5 w-2.5 text-ink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
                <div className="inline-flex items-center">
                  <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addUserTag()}
                    placeholder={t('ad.add_tag')}
                    className="w-[120px] h-[26px] bg-transparent border border-dashed border-ink/[0.2] rounded-sm px-2 text-[11.5px] text-ink placeholder:text-ink-600/60 focus:outline-none focus:border-ink/[0.4]"
                  />
                </div>
              </div>

              {asset.aiTags.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-3 w-3 text-accent" strokeWidth={2} />
                    <span className="eyebrow text-accent-600">{t('ad.suggested')}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.aiTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => acceptAiTag(tag.id)}
                        className="group inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border border-dashed border-accent/40 bg-accent/[0.05] text-[11.5px] text-accent-600 hover:bg-accent/[0.1]"
                      >
                        {tag.label}
                        <span className="text-[9px] opacity-60 group-hover:opacity-100 mono uppercase tracking-widest">
                          {t('ad.add')}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] text-ink-600 italic">
                    {t('ad.confidence_hint')}
                  </p>
                </div>
              )}
            </section>

            {/* Rating */}
            <section className="flex items-center justify-between">
              <SectionHeader title={t('ad.rating')} inline />
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRating(n as 1 | 2 | 3 | 4 | 5)}
                    className="p-1 ring-focus"
                    aria-label={t('ad.rate_n', { n })}
                  >
                    <Star
                      className={cn(
                        'h-4 w-4',
                        (asset.rating ?? 0) >= n
                          ? 'fill-ink text-ink'
                          : 'text-ink/30 hover:text-ink/60'
                      )}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Notes */}
            <section>
              <SectionHeader title={t('ad.notes')} />
              <textarea
                defaultValue={asset.notes ?? ''}
                onBlur={(e) => updateNotes(e.target.value)}
                placeholder={t('ad.notes_placeholder')}
                className="mt-2 w-full min-h-[80px] bg-transparent border border-ink/[0.10] hover:border-ink/[0.18] focus:border-ink/[0.3] rounded-md p-3 text-[13px] text-ink placeholder:text-ink-600/60 resize-y ring-focus"
              />
            </section>

            {/* Collections */}
            {collections.length > 0 && (
              <section>
                <SectionHeader title={t('ad.in_collections')} hint={`${collections.length}`} />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {collections.map((c) => (
                    <Badge key={c.id} variant="soft" size="md">
                      {c.name}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {/* Similar */}
            {similar.length > 0 && (
              <section>
                <SectionHeader title={t('ad.similar')} hint={`${similar.length}`} />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {similar.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setOpen(a.id)}
                      className="aspect-square rounded-sm overflow-hidden bg-paper-200 group ring-focus"
                    >
                      <img
                        src={a.thumbnailUrl}
                        alt={a.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom actions */}
            <section className="pt-2">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" className="justify-start">
                  <Wand2 className="h-3.5 w-3.5" />
                  {t('ad.generate_prompt')}
                </Button>
                <Button variant="secondary" size="sm" className="justify-start">
                  <FileDown className="h-3.5 w-3.5" />
                  {t('ad.add_to_brief')}
                </Button>
              </div>
              <button className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-ink-600 hover:text-accent transition-colors">
                <Trash2 className="h-3 w-3" />
                {t('ad.delete')}
              </button>
            </section>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function SectionHeader({
  title,
  hint,
  inline,
}: {
  title: string
  hint?: string
  inline?: boolean
}) {
  return (
    <div className={cn('flex items-baseline gap-2', !inline && 'border-b border-ink/[0.06] pb-2')}>
      <h3 className="eyebrow">{title}</h3>
      {hint && <span className="mono text-[10px] text-ink-600 uppercase tracking-widest">{hint}</span>}
    </div>
  )
}
