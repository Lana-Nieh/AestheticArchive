import { useMemo } from 'react'
import { AssetCard } from './AssetCard'
import type { Asset } from '@/lib/types'
import { cn } from '@/lib/utils'

type Props = {
  assets: Asset[]
  selectedIds: string[]
  onOpen: (id: string) => void
  onSelect: (id: string, mode: 'single' | 'toggle' | 'range') => void
  onAddToCollection: (id: string) => void
  onToggleFavorite: (id: string) => void
  columns?: 3 | 4 | 5 | 6
  layout?: 'masonry' | 'grid' | 'bento'
  className?: string
}

export function AssetMasonry({
  assets,
  selectedIds,
  onOpen,
  onSelect,
  onAddToCollection,
  onToggleFavorite,
  columns = 5,
  layout = 'masonry',
  className,
}: Props) {
  const sel = useMemo(() => new Set(selectedIds), [selectedIds])

  if (layout === 'bento') {
    // Editorial bento — first item large, then varied
    return (
      <div className={cn('grid gap-3.5', className)} style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {assets.map((a, i) => {
          const pattern = bentoSize(i)
          return (
            <div
              key={a.id}
              style={{ gridColumn: `span ${pattern.col}`, gridRow: `span ${pattern.row}` }}
            >
              <AssetCard
                asset={a}
                selected={sel.has(a.id)}
                onOpen={onOpen}
                onSelect={onSelect}
                onAddToCollection={onAddToCollection}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          )
        })}
      </div>
    )
  }

  if (layout === 'grid') {
    return (
      <div
        className={cn('grid gap-3.5', className)}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {assets.map((a) => (
          <AssetCard
            key={a.id}
            asset={a}
            selected={sel.has(a.id)}
            onOpen={onOpen}
            onSelect={onSelect}
            onAddToCollection={onAddToCollection}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('masonry', className)} style={{ columnCount: columns }}>
      {assets.map((a) => (
        <AssetCard
          key={a.id}
          asset={a}
          selected={sel.has(a.id)}
          onOpen={onOpen}
          onSelect={onSelect}
          onAddToCollection={onAddToCollection}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

function bentoSize(i: number): { col: number; row: number } {
  const patterns: { col: number; row: number }[] = [
    { col: 3, row: 2 },
    { col: 3, row: 1 },
    { col: 2, row: 1 },
    { col: 1, row: 1 },
    { col: 2, row: 2 },
    { col: 2, row: 1 },
    { col: 2, row: 1 },
    { col: 3, row: 1 },
    { col: 3, row: 2 },
    { col: 2, row: 1 },
    { col: 1, row: 1 },
    { col: 3, row: 1 },
  ]
  return patterns[i % patterns.length]
}
