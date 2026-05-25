import { create } from 'zustand'

type UiState = {
  sidebarCollapsed: boolean
  assetDetailOpen: boolean
  activeAssetId?: string
  commandMenuOpen: boolean
  uploadDialogOpen: boolean
  collectionPickerOpen: boolean
  pendingPickAssetIds: string[]
  filtersOpen: boolean

  setSidebarCollapsed: (v: boolean) => void
  openAssetDetail: (assetId: string) => void
  closeAssetDetail: () => void
  setCommandMenuOpen: (v: boolean) => void
  setUploadDialogOpen: (v: boolean) => void
  openCollectionPicker: (assetIds: string[]) => void
  closeCollectionPicker: () => void
  setFiltersOpen: (v: boolean) => void
  toggleFilters: () => void
}

export const useUi = create<UiState>((set) => ({
  sidebarCollapsed: false,
  assetDetailOpen: false,
  activeAssetId: undefined,
  commandMenuOpen: false,
  uploadDialogOpen: false,
  collectionPickerOpen: false,
  pendingPickAssetIds: [],
  filtersOpen: false,

  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  openAssetDetail: (assetId) => set({ assetDetailOpen: true, activeAssetId: assetId }),
  closeAssetDetail: () => set({ assetDetailOpen: false }),
  setCommandMenuOpen: (v) => set({ commandMenuOpen: v }),
  setUploadDialogOpen: (v) => set({ uploadDialogOpen: v }),
  openCollectionPicker: (assetIds) =>
    set({ collectionPickerOpen: true, pendingPickAssetIds: assetIds }),
  closeCollectionPicker: () => set({ collectionPickerOpen: false, pendingPickAssetIds: [] }),
  setFiltersOpen: (v) => set({ filtersOpen: v }),
  toggleFilters: () => set((s) => ({ filtersOpen: !s.filtersOpen })),
}))
