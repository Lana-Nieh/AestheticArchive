import type { Asset, Tag } from '@/lib/types'
import { mockAssets } from '@/data/mock/assets'

export type AssetListQuery = {
  q?: string
  collectionId?: string
  tagLabels?: string[]
  colorTemp?: 'warm' | 'cool' | 'neutral'
  colorHex?: string
  rating?: number
  isFavorite?: boolean
  types?: Asset['type'][]
  sort?: 'recent' | 'oldest' | 'name' | 'rating'
}

export type AssetListResult = {
  items: Asset[]
  total: number
}

// In-memory store backed by mock seed data. Mutations stay in memory.
let store: Asset[] = [...mockAssets]
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function subscribeAssets(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export const assetAdapter = {
  list(query: AssetListQuery = {}): AssetListResult {
    let items = [...store]

    if (query.collectionId) {
      items = items.filter((a) => a.collections.includes(query.collectionId!))
    }
    if (query.types && query.types.length) {
      items = items.filter((a) => query.types!.includes(a.type))
    }
    if (query.isFavorite) items = items.filter((a) => a.isFavorite)
    if (query.rating) items = items.filter((a) => (a.rating ?? 0) >= query.rating!)
    if (query.tagLabels && query.tagLabels.length) {
      const wanted = query.tagLabels.map((l) => l.toLowerCase())
      items = items.filter((a) => {
        const all = [...a.tags, ...a.aiTags].map((t) => t.label.toLowerCase())
        return wanted.every((w) => all.some((t) => t.includes(w)))
      })
    }
    if (query.colorTemp) {
      items = items.filter((a) => a.colors.some((c) => c.temperature === query.colorTemp))
    }
    if (query.colorHex) {
      items = items.filter((a) =>
        a.colors.some((c) => c.hex.toLowerCase() === query.colorHex!.toLowerCase())
      )
    }
    if (query.q) {
      const q = query.q.toLowerCase()
      items = items.filter((a) => {
        const hay = [
          a.title,
          a.description ?? '',
          a.aiDescription ?? '',
          a.notes ?? '',
          ...a.tags.map((t) => t.label),
          ...a.aiTags.map((t) => t.label),
          ...a.colors.map((c) => c.name ?? ''),
        ]
          .join(' ')
          .toLowerCase()
        return q.split(/\s+/).every((token) => hay.includes(token))
      })
    }

    switch (query.sort) {
      case 'oldest':
        items.sort((a, b) => +new Date(a.importedAt) - +new Date(b.importedAt))
        break
      case 'name':
        items.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'rating':
        items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case 'recent':
      default:
        items.sort((a, b) => +new Date(b.importedAt) - +new Date(a.importedAt))
    }

    return { items, total: items.length }
  },

  get(id: string): Asset | null {
    return store.find((a) => a.id === id) ?? null
  },

  update(id: string, patch: Partial<Asset>) {
    store = store.map((a) =>
      a.id === id
        ? { ...a, ...patch, updatedAt: new Date().toISOString() }
        : a
    )
    emit()
    return assetAdapter.get(id)
  },

  toggleFavorite(id: string) {
    const a = assetAdapter.get(id)
    if (!a) return null
    return assetAdapter.update(id, { isFavorite: !a.isFavorite })
  },

  setRating(id: string, rating: 1 | 2 | 3 | 4 | 5) {
    return assetAdapter.update(id, { rating })
  },

  remove(ids: string[]) {
    store = store.filter((a) => !ids.includes(a.id))
    emit()
  },

  create(asset: Asset) {
    store = [asset, ...store]
    emit()
    return asset
  },

  addTag(id: string, tag: Tag) {
    const a = assetAdapter.get(id)
    if (!a) return null
    const exists = [...a.tags, ...a.aiTags].some(
      (t) => t.label.toLowerCase() === tag.label.toLowerCase()
    )
    if (exists) return a
    return assetAdapter.update(id, { tags: [...a.tags, tag] })
  },

  removeTag(id: string, tagId: string) {
    const a = assetAdapter.get(id)
    if (!a) return null
    return assetAdapter.update(id, {
      tags: a.tags.filter((t) => t.id !== tagId),
      aiTags: a.aiTags.filter((t) => t.id !== tagId),
    })
  },

  acceptAiTag(id: string, tagId: string) {
    const a = assetAdapter.get(id)
    if (!a) return null
    const t = a.aiTags.find((x) => x.id === tagId)
    if (!t) return a
    return assetAdapter.update(id, {
      tags: [...a.tags, { ...t, source: 'user' }],
      aiTags: a.aiTags.filter((x) => x.id !== tagId),
    })
  },

  addToCollections(assetIds: string[], collectionIds: string[]) {
    store = store.map((a) => {
      if (!assetIds.includes(a.id)) return a
      const next = Array.from(new Set([...a.collections, ...collectionIds]))
      return { ...a, collections: next, updatedAt: new Date().toISOString() }
    })
    emit()
  },

  removeFromCollections(assetIds: string[], collectionIds: string[]) {
    store = store.map((a) => {
      if (!assetIds.includes(a.id)) return a
      const next = a.collections.filter((c) => !collectionIds.includes(c))
      return { ...a, collections: next, updatedAt: new Date().toISOString() }
    })
    emit()
  },

  findSimilar(id: string, limit = 8): Asset[] {
    const target = assetAdapter.get(id)
    if (!target) return []
    const score = (a: Asset) => {
      if (a.id === id) return -1
      const aTags = new Set(
        [...a.tags, ...a.aiTags].map((t) => t.label.toLowerCase())
      )
      const tTags = new Set(
        [...target.tags, ...target.aiTags].map((t) => t.label.toLowerCase())
      )
      const tagOverlap = [...aTags].filter((x) => tTags.has(x)).length
      const colorOverlap = a.colors.filter((c) =>
        target.colors.some(
          (tc) => Math.abs(parseInt(tc.hex.slice(1), 16) - parseInt(c.hex.slice(1), 16)) < 200000
        )
      ).length
      return tagOverlap * 2 + colorOverlap
    }
    return [...store]
      .map((a) => ({ a, s: score(a) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, limit)
      .map((x) => x.a)
  },
}
