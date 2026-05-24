import {
  Plus,
  Heart,
  Tag as TagIcon,
  Sparkles,
  Trash2,
  FileDown,
  Wand2,
  X,
} from 'lucide-react'
import { useSelection } from '@/stores/selectionStore'
import { useUi } from '@/stores/uiStore'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'

export function BulkActionBar() {
  const ids = useSelection((s) => s.selectedAssetIds)
  const clear = useSelection((s) => s.clear)
  const openPicker = useUi((s) => s.openCollectionPicker)
  const t = useT()

  if (ids.length === 0) return null

  const favoriteAll = () => ids.forEach((id) => assetAdapter.toggleFavorite(id))
  const removeAll = () => assetAdapter.remove(ids)

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 -translate-x-1/2 z-30 animate-fade-up">
      <div className="pointer-events-auto rounded-md bg-ink text-paper shadow-lift overflow-hidden">
        <div className="flex items-stretch">
          <div className="flex items-center gap-2 px-3.5 border-r border-paper/10">
            <span className="serif italic text-[18px] tracking-editorial">{ids.length}</span>
            <span className="mono uppercase tracking-widest text-[10px] text-paper/70">{t('bulk.selected')}</span>
          </div>

          <div className="flex items-center px-1">
            <ToolbarBtn onClick={() => openPicker(ids)} icon={<Plus className="h-3.5 w-3.5" />}>
              {t('bulk.add_to_collection')}
            </ToolbarBtn>
            <ToolbarBtn onClick={favoriteAll} icon={<Heart className="h-3.5 w-3.5" />}>
              {t('bulk.favorite')}
            </ToolbarBtn>
            <ToolbarBtn icon={<TagIcon className="h-3.5 w-3.5" />}>{t('bulk.tag')}</ToolbarBtn>
            <ToolbarBtn icon={<Wand2 className="h-3.5 w-3.5" />}>{t('bulk.find_similar')}</ToolbarBtn>
            <ToolbarBtn icon={<Sparkles className="h-3.5 w-3.5" />}>{t('bulk.generate_moodboard')}</ToolbarBtn>
            <ToolbarBtn icon={<FileDown className="h-3.5 w-3.5" />}>{t('bulk.create_brief')}</ToolbarBtn>
            <ToolbarBtn onClick={removeAll} icon={<Trash2 className="h-3.5 w-3.5" />} danger>
              {t('bulk.delete')}
            </ToolbarBtn>
          </div>

          <div className="border-l border-paper/10 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={clear}
              className="text-paper/70 hover:text-paper hover:bg-paper/10"
              aria-label={t('bulk.clear')}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ToolbarBtn({
  icon,
  children,
  onClick,
  danger,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 h-9 px-2.5 rounded-sm text-[12.5px] transition-colors ${
        danger
          ? 'text-paper/60 hover:text-accent hover:bg-paper/10'
          : 'text-paper/80 hover:text-paper hover:bg-paper/10'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{children}</span>
    </button>
  )
}
