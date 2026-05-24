import { useEffect, useMemo, useState } from 'react'
import { FolderOpen, Plus, Search, Sparkles } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { useUi } from '@/stores/uiStore'
import { collectionAdapter, subscribeCollections } from '@/data/adapters/collectionAdapter'
import type { Collection } from '@/lib/types'
import { useT } from '@/lib/i18n'

export function CollectionPicker() {
  const open = useUi((s) => s.collectionPickerOpen)
  const close = useUi((s) => s.closeCollectionPicker)
  const assetIds = useUi((s) => s.pendingPickAssetIds)
  const t = useT()

  const [, setTick] = useState(0)
  useEffect(() => subscribeCollections(() => setTick((x) => x + 1)), [])

  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    if (open) {
      setSelected([])
      setQ('')
      setNewName('')
    }
  }, [open])

  const collections = useMemo(() => {
    const all = collectionAdapter.list()
    return q
      ? all.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
      : all
  }, [q, open])

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const confirm = () => {
    let targets = [...selected]
    if (newName.trim()) {
      const c = collectionAdapter.create({ name: newName.trim() })
      targets.push(c.id)
    }
    targets.forEach((cid) => collectionAdapter.addAssets(cid, assetIds))
    close()
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>{t('cp.title')}</DialogTitle>
          <DialogDescription>
            {assetIds.length === 1 ? t('cp.desc_one') : t('cp.desc_many', { n: assetIds.length })}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-600" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoFocus
              placeholder={t('cp.find')}
              className="w-full h-9 pl-9 pr-3 bg-paper border border-ink/[0.12] rounded-md text-[13px] placeholder:text-ink-600/60 focus:border-ink/[0.3] outline-none"
            />
          </div>

          <div className="max-h-[280px] overflow-y-auto -mx-1 px-1">
            <ul className="space-y-0.5">
              {collections.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => toggle(c.id)}
                    className={`w-full flex items-center justify-between gap-3 px-2 py-2 rounded-sm text-left transition-colors ${
                      selected.includes(c.id)
                        ? 'bg-accent/[0.08]'
                        : 'hover:bg-ink/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <CollectionMini c={c} />
                      <span className="min-w-0">
                        <span className="block text-[13px] text-ink truncate">{c.name}</span>
                        <span className="mono text-[10px] text-ink-600 uppercase tracking-widest">
                          {t('cp.assets_n', { n: c.assetIds.length })}
                        </span>
                      </span>
                    </span>
                    {c.isAiSuggested && (
                      <Sparkles className="h-3 w-3 text-accent" strokeWidth={2} />
                    )}
                    <span
                      className={`h-4 w-4 rounded-xs border flex items-center justify-center text-[10px] ${
                        selected.includes(c.id)
                          ? 'bg-accent border-accent text-paper'
                          : 'border-ink/[0.2]'
                      }`}
                    >
                      {selected.includes(c.id) ? '✓' : ''}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-ink/[0.06] pt-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-sm border border-dashed border-ink/[0.18] flex items-center justify-center">
                <Plus className="h-3.5 w-3.5 text-ink-600" />
              </div>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t('cp.start_new')}
                className="flex-1 h-9 px-3 bg-transparent border border-ink/[0.12] rounded-md text-[13px] placeholder:text-ink-600/60 focus:border-ink/[0.3] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-ink/[0.06] flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={close}>
            {t('cp.cancel')}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={confirm}
            disabled={!selected.length && !newName.trim()}
          >
            {t('cp.add')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CollectionMini({ c }: { c: Collection }) {
  return (
    <span className="grid grid-cols-2 gap-px h-8 w-8 rounded-sm overflow-hidden bg-paper-200 shrink-0">
      {c.coverAssetIds.slice(0, 4).map((id) => (
        <span key={id} className="bg-paper-300" />
      ))}
      {c.coverAssetIds.length === 0 && (
        <span className="col-span-2 row-span-2 flex items-center justify-center">
          <FolderOpen className="h-3 w-3 text-ink-600" />
        </span>
      )}
    </span>
  )
}
