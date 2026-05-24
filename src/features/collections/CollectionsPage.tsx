import { useEffect, useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { CollectionCard } from '@/components/collection/CollectionCard'
import { Button } from '@/components/ui/Button'
import { collectionAdapter, subscribeCollections } from '@/data/adapters/collectionAdapter'
import { Badge } from '@/components/ui/Badge'
import { useT } from '@/lib/i18n'

export function CollectionsPage() {
  const [, setTick] = useState(0)
  useEffect(() => subscribeCollections(() => setTick((x) => x + 1)), [])
  const t = useT()

  const all = collectionAdapter.list()
  const suggested = all.filter((c) => c.isAiSuggested)
  const mine = all.filter((c) => !c.isAiSuggested)

  return (
    <div className="px-7 py-8 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between mb-10">
        <div>
          <div className="eyebrow mb-2">{t('collections.eyebrow')}</div>
          <h1 className="serif text-[42px] leading-none tracking-editorial text-ink">
            {t('collections.title_part1')} <em className="italic">{t('collections.title_em')}</em>{t('collections.title_part2')}
          </h1>
          <p className="text-[13.5px] text-ink-600 mt-2 max-w-xl">
            {t('collections.body')}
          </p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5" />
          {t('collections.new')}
        </Button>
      </header>

      {suggested.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
              <h2 className="eyebrow text-accent-600">{t('collections.suggested')}</h2>
              <Badge variant="ai" size="xs">{suggested.length}</Badge>
            </div>
            <a href="#" className="text-[12px] text-ink-600 hover:text-ink">{t('collections.manage')}</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {suggested.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="eyebrow">{t('collections.your_shelves')}</h2>
          <span className="mono text-[10.5px] text-ink-600 uppercase tracking-widest">
            {mine.length} {mine.length === 1 ? t('collections.shelf') : t('collections.shelves')}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mine.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      </section>
    </div>
  )
}
