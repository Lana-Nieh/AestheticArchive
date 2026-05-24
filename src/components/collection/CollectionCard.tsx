import { Link } from 'react-router-dom'
import { Sparkles, ArrowUpRight } from 'lucide-react'
import type { Collection } from '@/lib/types'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { isLight } from '@/lib/utils'
import { useT, useRelativeTime } from '@/lib/i18n'

export function CollectionCard({ collection }: { collection: Collection }) {
  const t = useT()
  const relativeTime = useRelativeTime()
  const cover = collection.coverAssetIds.map((id) => assetAdapter.get(id)).filter(Boolean)
  const colors = cover
    .flatMap((a) => a!.colors)
    .slice(0, 6)

  return (
    <Link
      to={`/collections/${collection.id}`}
      className="group block ring-focus rounded-md outline-none"
    >
      <div className="overflow-hidden rounded-md border border-ink/[0.06] bg-paper hover:border-ink/[0.12] transition-colors">
        <div className="relative grid grid-cols-3 gap-px aspect-[3/2] bg-paper-200">
          {cover.length > 0 ? (
            cover.slice(0, 3).map((a, i) => (
              <div key={a!.id} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
                <img
                  src={a!.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.02]"
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 row-span-2 flex items-center justify-center text-ink-600 text-[12px]">
              {t('collections.no_cover')}
            </div>
          )}
          {collection.isAiSuggested && (
            <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-1.5 py-0.5 bg-paper/95 border border-accent/30 rounded-xs text-[10px] text-accent-600 mono uppercase tracking-widest">
              <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
              {t('collections.suggested_badge')}
            </div>
          )}
          <ArrowUpRight className="absolute top-2.5 right-2.5 h-4 w-4 text-paper opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4 border-t border-ink/[0.06]">
          <div className="flex items-start justify-between gap-3">
            <h3 className="serif text-[19px] tracking-editorial text-ink leading-tight">
              {collection.name}
            </h3>
            <span className="mono text-[10.5px] text-ink-600 uppercase tracking-widest whitespace-nowrap">
              {collection.assetIds.length}
            </span>
          </div>
          {collection.description && (
            <p className="text-[12.5px] text-ink-600 mt-1.5 leading-snug line-clamp-2">
              {collection.description}
            </p>
          )}

          {/* Color row */}
          {colors.length > 0 && (
            <div className="mt-3 flex items-center gap-1">
              {colors.map((c, i) => (
                <span
                  key={i}
                  className="h-2 flex-1 rounded-full"
                  style={{
                    background: c.hex,
                    boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(23,21,19,0.06)' : 'none',
                  }}
                />
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {collection.tags.slice(0, 3).map((t) => (
                <span key={t.id} className="text-[10.5px] text-ink-600 mono uppercase tracking-widest">
                  {t.label}
                </span>
              ))}
            </div>
            <span className="mono text-[10px] uppercase tracking-widest text-ink-600/70">
              {relativeTime(collection.updatedAt)}
            </span>
          </div>

          {collection.isAiSuggested && collection.aiReason && (
            <div className="mt-3 rounded-sm bg-accent/[0.04] border border-accent/15 p-2.5">
              <p className="text-[11.5px] text-accent-600 italic serif leading-snug">
                {collection.aiReason}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
