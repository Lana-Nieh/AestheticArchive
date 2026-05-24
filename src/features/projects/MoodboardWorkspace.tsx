import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft,
  Wand2,
  Download,
  Share2,
  Sparkles,
  Lock,
  Unlock,
  X,
  Plus,
  GripVertical,
  FileDown,
  Copy,
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { projectAdapter, subscribeProjects } from '@/data/adapters/projectAdapter'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { isLight } from '@/lib/utils'
import type { Asset } from '@/lib/types'
import { useT } from '@/lib/i18n'

export function MoodboardWorkspace() {
  const { projectId } = useParams()
  const [, setTick] = useState(0)
  useEffect(() => subscribeProjects(() => setTick((x) => x + 1)), [])
  const t = useT()

  const project = useMemo(() => projectAdapter.getProject(projectId ?? ''), [projectId])
  const moodboard = useMemo(() => projectAdapter.getMoodboard(project?.moodboardId), [project])

  const [order, setOrder] = useState<string[]>([])
  useEffect(() => {
    if (moodboard) setOrder(moodboard.items.map((i) => i.assetId))
  }, [moodboard?.id])

  if (!project) {
    return (
      <div className="p-10">
        <Link to="/projects" className="text-ink-600 hover:text-ink text-[12.5px]">
          {t('mb.not_found_back')}
        </Link>
        <p className="mt-6 text-ink-600">{t('mb.not_found')}</p>
      </div>
    )
  }

  const items: Asset[] = order
    .map((id) => assetAdapter.get(id))
    .filter(Boolean) as Asset[]

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIndex = order.indexOf(String(active.id))
    const newIndex = order.indexOf(String(over.id))
    setOrder((o) => arrayMove(o, oldIndex, newIndex))
  }

  const brief = project.brief

  return (
    <div className="flex h-full">
      {/* Canvas */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Workspace toolbar */}
        <div className="h-12 px-5 border-b border-ink/[0.06] flex items-center justify-between bg-paper-50/70 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link to="/projects" className="inline-flex items-center gap-1 text-ink-600 hover:text-ink text-[12px]">
              <ChevronLeft className="h-3.5 w-3.5" />
              {t('mb.back')}
            </Link>
            <span className="text-ink/[0.18]">·</span>
            <span className="serif italic text-[15px] tracking-editorial text-ink">{project.name}</span>
            <Badge variant="soft" size="xs">{t('mb.refs', { n: items.length })}</Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm">
              <Wand2 className="h-3.5 w-3.5" />
              {t('mb.ask_curator')}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-3.5 w-3.5" />
              {t('mb.share')}
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="h-3.5 w-3.5" />
              {t('mb.export')}
            </Button>
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-paper-50">
          <div className="px-7 py-7">
            {/* AI suggestions strip */}
            <div className="mb-6 rounded-md border border-accent/15 bg-accent/[0.04] p-3.5 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-accent mt-0.5" strokeWidth={2} />
              <div className="flex-1">
                <div className="eyebrow text-accent-600 mb-1">{t('mb.curator_suggestion')}</div>
                <p className="serif italic text-[14.5px] tracking-editorial text-ink-800">
                  {t('mb.curator_suggestion_text')}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Button variant="secondary" size="xs">{t('mb.preview_split')}</Button>
                <Button variant="ghost" size="xs">{t('mb.dismiss')}</Button>
              </div>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={order} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-4 gap-3.5 auto-rows-[120px]">
                  {items.map((a, i) => (
                    <MoodboardCell key={a.id} asset={a} span={i === 0 ? 'large' : 'normal'} />
                  ))}
                  <button className="border border-dashed border-ink/[0.2] rounded-md flex items-center justify-center text-ink-600 hover:text-ink hover:border-ink/[0.4] transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>

      {/* Right inspector — brief */}
      <aside className="w-[420px] shrink-0 border-l border-ink/[0.06] bg-paper flex flex-col">
        <div className="h-12 px-5 border-b border-ink/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileDown className="h-3.5 w-3.5 text-ink-600" strokeWidth={1.7} />
            <span className="eyebrow">{t('mb.creative_brief')}</span>
            {brief && <Badge variant="ai" size="xs">{t('mb.draft')}</Badge>}
          </div>
          <Button variant="ghost" size="xs">
            <Copy className="h-3 w-3" />
            {t('mb.copy')}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {brief ? (
            <article className="space-y-6">
              <div>
                <div className="eyebrow mb-1.5">{t('mb.project')}</div>
                <h2 className="serif text-[28px] tracking-editorial text-ink leading-tight">
                  {brief.title}
                </h2>
                <p className="serif italic text-[15px] tracking-editorial text-ink-700 mt-3 leading-snug">
                  {brief.mood}
                </p>
              </div>

              <BriefField title={t('mb.visual_keywords')}>
                <div className="flex flex-wrap gap-1.5">
                  {brief.visualKeywords.map((k) => (
                    <Badge key={k} variant="soft" size="sm">
                      {k}
                    </Badge>
                  ))}
                </div>
              </BriefField>

              <BriefField title={t('mb.color_direction')}>
                <p className="text-[13px] text-ink-800 leading-relaxed">{brief.colorDirection}</p>
              </BriefField>

              {brief.typographyDirection && (
                <BriefField title={t('mb.typography_direction')}>
                  <p className="text-[13px] text-ink-800 leading-relaxed">{brief.typographyDirection}</p>
                </BriefField>
              )}

              <BriefField title={t('mb.image_style')}>
                <p className="text-[13px] text-ink-800 leading-relaxed">{brief.imageDirection}</p>
              </BriefField>

              {brief.layoutDirection && (
                <BriefField title={t('mb.layout_direction')}>
                  <p className="text-[13px] text-ink-800 leading-relaxed">{brief.layoutDirection}</p>
                </BriefField>
              )}

              {brief.materials && (
                <BriefField title={t('mb.materials')}>
                  <div className="flex flex-wrap gap-1.5">
                    {brief.materials.map((m) => (
                      <Badge key={m} variant="outline" size="sm">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </BriefField>
              )}

              {brief.composition && (
                <BriefField title={t('mb.composition')}>
                  <p className="text-[13px] text-ink-800 leading-relaxed">{brief.composition}</p>
                </BriefField>
              )}

              {brief.avoid && (
                <BriefField title={t('mb.avoid')}>
                  <ul className="space-y-1">
                    {brief.avoid.map((a) => (
                      <li key={a} className="text-[13px] text-ink-800 flex items-start gap-2">
                        <X className="h-3 w-3 text-rust mt-1 shrink-0" strokeWidth={2} />
                        {a}
                      </li>
                    ))}
                  </ul>
                </BriefField>
              )}

              {brief.prompt && (
                <BriefField title={t('mb.ai_prompt')}>
                  <div className="rounded-sm border border-ink/[0.08] bg-paper-50 p-3 mono text-[12px] text-ink-800 leading-relaxed">
                    {brief.prompt}
                  </div>
                </BriefField>
              )}

              {brief.notes && (
                <BriefField title={t('mb.notes')}>
                  <p className="text-[13px] text-ink-800 leading-relaxed">{brief.notes}</p>
                </BriefField>
              )}

              <div className="border-t border-ink/[0.06] pt-4 flex items-center gap-2">
                <Button variant="primary" size="sm">
                  <Download className="h-3.5 w-3.5" />
                  {t('mb.export_pdf')}
                </Button>
                <Button variant="secondary" size="sm">{t('mb.markdown')}</Button>
                <Button variant="ghost" size="sm">{t('mb.image')}</Button>
              </div>
            </article>
          ) : (
            <div className="text-center py-12">
              <Sparkles className="h-5 w-5 text-accent mx-auto mb-3" strokeWidth={2} />
              <p className="serif italic text-[16px] tracking-editorial text-ink-700">
                {t('mb.empty')}
              </p>
              <Button variant="primary" size="sm" className="mt-4">
                {t('mb.generate_brief')}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

function MoodboardCell({ asset, span }: { asset: Asset; span: 'normal' | 'large' }) {
  const t = useT()
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: asset.id,
  })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    gridColumn: span === 'large' ? 'span 2' : undefined,
    gridRow: span === 'large' ? 'span 2' : undefined,
  }
  const [locked, setLocked] = useState(false)
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-md overflow-hidden bg-paper-200 shadow-soft"
    >
      <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-ink/60 to-transparent" />
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 h-7 w-7 inline-flex items-center justify-center rounded-xs bg-paper/90 border border-ink/[0.06] text-ink-700 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      {/* Action chips */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100">
        <button
          onClick={() => setLocked((l) => !l)}
          className="h-7 w-7 inline-flex items-center justify-center rounded-xs bg-paper/90 border border-ink/[0.06] text-ink-700"
          aria-label={locked ? t('mb.unlock') : t('mb.lock')}
        >
          {locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
        </button>
        <button className="h-7 w-7 inline-flex items-center justify-center rounded-xs bg-paper/90 border border-ink/[0.06] text-ink-700">
          <X className="h-3 w-3" />
        </button>
      </div>
      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          {asset.colors.slice(0, 4).map((c) => (
            <span
              key={c.hex}
              className="h-2 flex-1 rounded-full"
              style={{
                background: c.hex,
                boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function BriefField({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="eyebrow mb-2 pb-1.5 border-b border-ink/[0.06]">{title}</div>
      {children}
    </section>
  )
}
