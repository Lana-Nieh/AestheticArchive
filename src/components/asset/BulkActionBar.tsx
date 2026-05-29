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
import { useNavigate } from 'react-router-dom'
import { useSelection } from '@/stores/selectionStore'
import { useUi } from '@/stores/uiStore'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { projectAdapter } from '@/data/adapters/projectAdapter'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'
import { toast } from '@/components/ui/Toast'
import { uid } from '@/lib/utils'

export function BulkActionBar() {
  const ids = useSelection((s) => s.selectedAssetIds)
  const clear = useSelection((s) => s.clear)
  const openPicker = useUi((s) => s.openCollectionPicker)
  const navigate = useNavigate()
  const t = useT()

  if (ids.length === 0) return null

  const favoriteAll = () => ids.forEach((id) => assetAdapter.toggleFavorite(id))
  const removeAll = () => {
    assetAdapter.remove(ids)
    clear()
    toast.mock(
      t('mock.delete_asset.title'),
      `${ids.length} · ${t('mock.delete_asset.desc')}`
    )
  }

  const bulkTag = () => {
    const label = window.prompt(t('prompt.tag_label', { n: ids.length }), '')
    const trimmed = label?.trim()
    if (!trimmed) return
    ids.forEach((id) =>
      assetAdapter.addTag(id, { id: uid('tag'), label: trimmed, source: 'user' })
    )
    toast.success(
      t('mock.bulk_tag.title', { n: ids.length }),
      t('mock.bulk_tag.desc')
    )
  }

  const findSimilar = () => {
    // Build a search query from common tags across the selection.
    const tagCounts = new Map<string, number>()
    for (const id of ids) {
      const a = assetAdapter.get(id)
      if (!a) continue
      for (const tag of [...a.tags, ...a.aiTags]) {
        const k = tag.label.toLowerCase()
        tagCounts.set(k, (tagCounts.get(k) ?? 0) + 1)
      }
    }
    const top = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([k]) => k)
      .join(' ')
    const q = top || (assetAdapter.get(ids[0])?.title ?? '')
    clear()
    navigate(`/search?q=${encodeURIComponent(q)}`)
    toast.curator(t('mock.find_similar.title'), t('mock.find_similar.desc'))
  }

  const generateMoodboard = () => {
    const project = projectAdapter.createProject({
      name: `Moodboard · ${new Date().toLocaleDateString()}`,
      description: t('mock.generate_moodboard.title'),
      status: 'exploring',
      assetIds: ids,
      coverAssetId: ids[0],
    })
    clear()
    navigate(`/projects/${project.id}`)
    toast.curator(
      t('mock.generate_moodboard.title'),
      t('mock.generate_moodboard.desc', { n: ids.length })
    )
  }

  const createBrief = () => {
    toast.curator(t('mock.create_brief.title'), t('mock.create_brief.desc'))
  }

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
            <ToolbarBtn onClick={bulkTag} icon={<TagIcon className="h-3.5 w-3.5" />}>{t('bulk.tag')}</ToolbarBtn>
            <ToolbarBtn onClick={findSimilar} icon={<Wand2 className="h-3.5 w-3.5" />}>{t('bulk.find_similar')}</ToolbarBtn>
            <ToolbarBtn onClick={generateMoodboard} icon={<Sparkles className="h-3.5 w-3.5" />}>{t('bulk.generate_moodboard')}</ToolbarBtn>
            <ToolbarBtn onClick={createBrief} icon={<FileDown className="h-3.5 w-3.5" />}>{t('bulk.create_brief')}</ToolbarBtn>
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
