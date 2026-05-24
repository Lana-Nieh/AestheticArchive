import type { Collection } from '@/lib/types'
import { mockCollections } from '@/data/mock/collections'
import { uid } from '@/lib/utils'
import { assetAdapter } from './assetAdapter'

let store: Collection[] = [...mockCollections]
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function subscribeCollections(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export const collectionAdapter = {
  list(): Collection[] {
    return [...store].sort(
      (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
    )
  },

  get(id: string): Collection | null {
    return store.find((c) => c.id === id) ?? null
  },

  create(input: Partial<Collection> & { name: string }): Collection {
    const now = new Date().toISOString()
    const c: Collection = {
      id: uid('col'),
      name: input.name,
      description: input.description ?? '',
      coverAssetIds: input.coverAssetIds ?? [],
      assetIds: input.assetIds ?? [],
      tags: input.tags ?? [],
      viewMode: input.viewMode ?? 'grid',
      isAiSuggested: input.isAiSuggested,
      aiReason: input.aiReason,
      createdAt: now,
      updatedAt: now,
    }
    store = [c, ...store]
    if (c.assetIds.length) {
      assetAdapter.addToCollections(c.assetIds, [c.id])
    }
    emit()
    return c
  },

  update(id: string, patch: Partial<Collection>): Collection | null {
    store = store.map((c) =>
      c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c
    )
    emit()
    return collectionAdapter.get(id)
  },

  remove(id: string) {
    const c = collectionAdapter.get(id)
    if (c) assetAdapter.removeFromCollections(c.assetIds, [id])
    store = store.filter((x) => x.id !== id)
    emit()
  },

  addAssets(id: string, assetIds: string[]) {
    const c = collectionAdapter.get(id)
    if (!c) return null
    const next = Array.from(new Set([...c.assetIds, ...assetIds]))
    assetAdapter.addToCollections(assetIds, [id])
    return collectionAdapter.update(id, {
      assetIds: next,
      coverAssetIds: c.coverAssetIds.length ? c.coverAssetIds : next.slice(0, 3),
    })
  },

  removeAssets(id: string, assetIds: string[]) {
    const c = collectionAdapter.get(id)
    if (!c) return null
    assetAdapter.removeFromCollections(assetIds, [id])
    return collectionAdapter.update(id, {
      assetIds: c.assetIds.filter((a) => !assetIds.includes(a)),
      coverAssetIds: c.coverAssetIds.filter((a) => !assetIds.includes(a)),
    })
  },

  accept(id: string) {
    return collectionAdapter.update(id, { isAiSuggested: false, aiReason: undefined })
  },
}
