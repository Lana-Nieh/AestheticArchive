import { memo, useState } from 'react'
import { Heart, Star, Check, Plus, MoreHorizontal, ExternalLink } from 'lucide-react'
import { cn, isLight } from '@/lib/utils'
import type { Asset } from '@/lib/types'
import { useT } from '@/lib/i18n'
import { toast } from '@/components/ui/Toast'

type Props = {
  asset: Asset
  selected: boolean
  onOpen?: (id: string) => void
  onSelect?: (id: string, mode: 'single' | 'toggle' | 'range') => void
  onAddToCollection?: (id: string) => void
  onToggleFavorite?: (id: string) => void
  className?: string
}

function AssetCardBase({
  asset,
  selected,
  onOpen,
  onSelect,
  onAddToCollection,
  onToggleFavorite,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const t = useT()
  const aspectStyle = asset.aspectRatio
    ? { aspectRatio: String(asset.aspectRatio) }
    : { aspectRatio: '1' }

  const handleClick: React.MouseEventHandler = (e) => {
    if (e.metaKey || e.ctrlKey) {
      onSelect?.(asset.id, 'toggle')
    } else if (e.shiftKey) {
      onSelect?.(asset.id, 'range')
    } else if (selected || (onSelect && (e.target as HTMLElement).dataset.action === 'select')) {
      onSelect?.(asset.id, 'toggle')
    } else {
      onOpen?.(asset.id)
    }
  }

  return (
    <div
      onClick={handleClick}
      onDoubleClick={() => onOpen?.(asset.id)}
      className={cn(
        'group relative cursor-pointer overflow-hidden break-inside-avoid',
        'transition-all duration-200 ease-editorial',
        className
      )}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-sm bg-paper-200',
          selected ? 'ring-2 ring-accent ring-offset-2 ring-offset-paper' : 'ring-0'
        )}
        style={aspectStyle}
      >
        {!loaded && (
          <div className="absolute inset-0 shimmer animate-shimmer bg-ink/[0.04]" />
        )}
        <img
          src={asset.thumbnailUrl}
          alt={asset.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-all duration-500 ease-editorial',
            loaded ? 'opacity-100' : 'opacity-0',
            'group-hover:scale-[1.02]'
          )}
        />

        {/* Selection checkbox */}
        <button
          type="button"
          data-action="select"
          onClick={(e) => {
            e.stopPropagation()
            onSelect?.(asset.id, 'toggle')
          }}
          className={cn(
            'absolute top-2.5 left-2.5 h-[20px] w-[20px] rounded-xs',
            'border transition-all',
            selected
              ? 'bg-accent border-accent text-paper opacity-100'
              : 'bg-paper/85 border-ink/20 text-transparent opacity-0 group-hover:opacity-100 hover:border-ink/40'
          )}
          aria-label={selected ? t('common.unfavorite') : t('common.favorite')}
        >
          {selected && <Check className="h-3 w-3 mx-auto" strokeWidth={3} />}
        </button>

        {/* Top right actions */}
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconBtn
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.(asset.id)
            }}
            label={asset.isFavorite ? t('ad.unfavorite') : t('ad.favorite')}
          >
            <Heart
              className={cn('h-3.5 w-3.5', asset.isFavorite && 'fill-accent text-accent')}
              strokeWidth={1.8}
            />
          </IconBtn>
          <IconBtn
            onClick={(e) => {
              e.stopPropagation()
              onAddToCollection?.(asset.id)
            }}
            label={t('ad.add_to_collection')}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
          </IconBtn>
          <IconBtn
            label={t('common.more')}
            onClick={(e) => {
              e.stopPropagation()
              toast({
                kind: 'mock',
                eyebrow: t('common.more'),
                title: asset.title,
                description: t('mock.not_yet'),
              })
            }}
          >
            <MoreHorizontal className="h-3.5 w-3.5" strokeWidth={1.8} />
          </IconBtn>
        </div>

        {/* Persistent corner badge — quiet ink dot, reserved for favorites */}
        {asset.isFavorite && (
          <span
            className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-ink/70 group-hover:opacity-0 transition-opacity"
            aria-hidden
          />
        )}

        {/* Bottom overlay on hover — colors + tags */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-paper">
          <div className="flex items-center gap-1 mb-1.5">
            {asset.colors.slice(0, 5).map((c) => (
              <span
                key={c.hex}
                className="h-3.5 w-3.5 rounded-full"
                style={{ background: c.hex, boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none' }}
                title={`${c.name} · ${c.hex}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] truncate">{asset.title}</span>
            {asset.sourceLabel &&
              (asset.sourceUrl ? (
                <a
                  href={asset.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mono text-[10px] uppercase tracking-widest opacity-80 hover:opacity-100 inline-flex items-center gap-1"
                >
                  <ExternalLink className="h-2.5 w-2.5" />
                  {asset.sourceLabel}
                </a>
              ) : (
                <span className="mono text-[10px] uppercase tracking-widest opacity-80 inline-flex items-center gap-1">
                  <ExternalLink className="h-2.5 w-2.5" />
                  {asset.sourceLabel}
                </span>
              ))}
          </div>
          <div className="mt-1.5 flex items-center gap-1 flex-wrap">
            {[...asset.tags, ...asset.aiTags].slice(0, 4).map((t) => (
              <span
                key={t.id}
                className={cn(
                  'text-[10px] px-1.5 py-[1.5px] rounded-xs',
                  t.source === 'mock_ai'
                    ? 'border border-dashed border-paper/40 text-paper/90'
                    : 'bg-paper/15 text-paper/95'
                )}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Below-card metadata — title only, rating revealed on hover */}
      <div className="px-1 mt-2 flex items-center justify-between gap-2">
        <h3 className="text-[12px] text-ink-600 truncate">{asset.title}</h3>
        {asset.rating ? (
          <span className="mono text-[10px] text-ink-600/0 group-hover:text-ink-600/80 transition-colors inline-flex items-center gap-0.5 shrink-0">
            <Star className="h-2.5 w-2.5 fill-current" />
            {asset.rating}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function IconBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode
  onClick?: React.MouseEventHandler
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="h-[26px] w-[26px] inline-flex items-center justify-center rounded-xs bg-paper/90 border border-ink/[0.06] text-ink hover:bg-paper hover:border-ink/[0.18] transition-colors ring-focus"
    >
      {children}
    </button>
  )
}

export const AssetCard = memo(AssetCardBase)
