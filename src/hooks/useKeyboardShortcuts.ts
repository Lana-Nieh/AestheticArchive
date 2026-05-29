import { useEffect } from 'react'
import { useUi } from '@/stores/uiStore'
import { useSelection } from '@/stores/selectionStore'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { toast } from '@/components/ui/Toast'
import { translate } from '@/lib/i18n'
import { useLanguage } from '@/stores/languageStore'

const tt = (key: string, vars?: Record<string, string | number>) =>
  translate(key, useLanguage.getState().lang, vars)

export function useKeyboardShortcuts() {
  const setCommandMenuOpen = useUi((s) => s.setCommandMenuOpen)
  const setUploadDialogOpen = useUi((s) => s.setUploadDialogOpen)
  const closeAssetDetail = useUi((s) => s.closeAssetDetail)
  const closeCollectionPicker = useUi((s) => s.closeCollectionPicker)
  const clearSelection = useSelection((s) => s.clear)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const editable =
        !!target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandMenuOpen(true)
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault()
        setUploadDialogOpen(true)
        return
      }
      if (editable) return

      if (e.key === '/') {
        e.preventDefault()
        const el = document.querySelector<HTMLInputElement>('input[placeholder^="Search"]')
        el?.focus()
        return
      }
      if (e.key === 'Escape') {
        closeAssetDetail()
        closeCollectionPicker()
        clearSelection()
        return
      }

      // Asset-drawer scoped shortcuts: F, 1-5, ArrowLeft / ArrowRight.
      const { assetDetailOpen, activeAssetId, openAssetDetail } = useUi.getState()
      if (!assetDetailOpen || !activeAssetId) return
      const asset = assetAdapter.get(activeAssetId)
      if (!asset) return

      if (e.key.toLowerCase() === 'f') {
        e.preventDefault()
        const next = assetAdapter.toggleFavorite(asset.id)
        toast({
          kind: 'success',
          title: tt(next?.isFavorite ? 'mock.fav_on.title' : 'mock.fav_off.title'),
        })
        return
      }
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault()
        const r = parseInt(e.key, 10) as 1 | 2 | 3 | 4 | 5
        assetAdapter.setRating(asset.id, r)
        toast({ kind: 'success', title: tt('mock.rating.title', { n: r }) })
        return
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const all = assetAdapter.list().items
        const idx = all.findIndex((a) => a.id === asset.id)
        const target = e.key === 'ArrowLeft' ? all[idx - 1] : all[idx + 1]
        if (target) {
          e.preventDefault()
          openAssetDetail(target.id)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCommandMenuOpen, setUploadDialogOpen, closeAssetDetail, closeCollectionPicker, clearSelection])
}
