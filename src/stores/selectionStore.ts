import { create } from 'zustand'

type State = {
  selectedAssetIds: string[]
  lastSelectedAssetId?: string
  selectOne: (id: string) => void
  toggle: (id: string) => void
  setMany: (ids: string[]) => void
  range: (ids: string[]) => void
  clear: () => void
}

export const useSelection = create<State>((set, get) => ({
  selectedAssetIds: [],
  lastSelectedAssetId: undefined,
  selectOne: (id) => set({ selectedAssetIds: [id], lastSelectedAssetId: id }),
  toggle: (id) =>
    set((s) => {
      const has = s.selectedAssetIds.includes(id)
      return {
        selectedAssetIds: has
          ? s.selectedAssetIds.filter((x) => x !== id)
          : [...s.selectedAssetIds, id],
        lastSelectedAssetId: id,
      }
    }),
  setMany: (ids) => set({ selectedAssetIds: ids, lastSelectedAssetId: ids[ids.length - 1] }),
  range: (ids) => {
    const last = get().lastSelectedAssetId
    if (!last) return set({ selectedAssetIds: ids, lastSelectedAssetId: ids[0] })
    set({ selectedAssetIds: ids, lastSelectedAssetId: ids[ids.length - 1] })
  },
  clear: () => set({ selectedAssetIds: [], lastSelectedAssetId: undefined }),
}))
