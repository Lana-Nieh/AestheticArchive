import { useEffect } from 'react'
import { useUi } from '@/stores/uiStore'
import { useSelection } from '@/stores/selectionStore'

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
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCommandMenuOpen, setUploadDialogOpen, closeAssetDetail, closeCollectionPicker, clearSelection])
}
