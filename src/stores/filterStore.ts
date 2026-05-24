import { create } from 'zustand'
import type { Asset } from '@/lib/types'

export type SortMode = 'recent' | 'oldest' | 'name' | 'rating'

type State = {
  query: string
  tagLabels: string[]
  colorTemp?: 'warm' | 'cool' | 'neutral'
  colorHex?: string
  rating?: number
  isFavorite: boolean
  types: Asset['type'][]
  sort: SortMode
  layout: 'masonry' | 'grid' | 'bento'

  setQuery: (q: string) => void
  toggleTag: (l: string) => void
  clearTags: () => void
  setColorTemp: (t?: State['colorTemp']) => void
  setColorHex: (hex?: string) => void
  setRating: (r?: number) => void
  setFavorite: (v: boolean) => void
  toggleType: (t: Asset['type']) => void
  setSort: (s: SortMode) => void
  setLayout: (l: State['layout']) => void
  reset: () => void
}

const initial = {
  query: '',
  tagLabels: [],
  colorTemp: undefined,
  colorHex: undefined,
  rating: undefined,
  isFavorite: false,
  types: [],
  sort: 'recent' as SortMode,
  layout: 'masonry' as State['layout'],
}

export const useFilters = create<State>((set, get) => ({
  ...initial,
  setQuery: (q) => set({ query: q }),
  toggleTag: (l) =>
    set((s) => ({
      tagLabels: s.tagLabels.includes(l)
        ? s.tagLabels.filter((x) => x !== l)
        : [...s.tagLabels, l],
    })),
  clearTags: () => set({ tagLabels: [] }),
  setColorTemp: (t) => set({ colorTemp: t === get().colorTemp ? undefined : t }),
  setColorHex: (hex) => set({ colorHex: hex === get().colorHex ? undefined : hex }),
  setRating: (r) => set({ rating: r === get().rating ? undefined : r }),
  setFavorite: (v) => set({ isFavorite: v }),
  toggleType: (t) =>
    set((s) => ({
      types: s.types.includes(t) ? s.types.filter((x) => x !== t) : [...s.types, t],
    })),
  setSort: (s) => set({ sort: s }),
  setLayout: (l) => set({ layout: l }),
  reset: () => set(initial),
}))
