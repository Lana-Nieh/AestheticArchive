import { useState } from 'react'
import {
  Sparkles,
  Check,
  Pencil,
  X,
  Undo2,
  ChevronDown,
  ChevronUp,
  Filter,
  Tag as TagIcon,
  FolderPlus,
  Copy,
  Split,
  Wand2,
  FileDown,
  Compass,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { mockAgentTasks } from '@/data/mock/tasks'
import type { AgentTask, AgentTaskStatus, AgentTaskType } from '@/lib/types'
import { cn, uid } from '@/lib/utils'
import { useT } from '@/lib/i18n'
import { toast } from '@/components/ui/Toast'

const typeIcon: Record<AgentTaskType, React.ReactNode> = {
  auto_tag: <TagIcon className="h-3.5 w-3.5" strokeWidth={1.8} />,
  find_similar: <Filter className="h-3.5 w-3.5" strokeWidth={1.8} />,
  suggest_collections: <FolderPlus className="h-3.5 w-3.5" strokeWidth={1.8} />,
  clean_duplicates: <Copy className="h-3.5 w-3.5" strokeWidth={1.8} />,
  split_collection: <Split className="h-3.5 w-3.5" strokeWidth={1.8} />,
  generate_moodboard: <Wand2 className="h-3.5 w-3.5" strokeWidth={1.8} />,
  generate_brief: <FileDown className="h-3.5 w-3.5" strokeWidth={1.8} />,
  update_profile: <Compass className="h-3.5 w-3.5" strokeWidth={1.8} />,
}

const statusKey: Record<AgentTaskStatus, string> = {
  pending: 'agent.status.pending',
  previewing: 'agent.status.previewing',
  accepted: 'agent.status.accepted',
  ignored: 'agent.status.ignored',
  running: 'agent.status.running',
}

export function AgentPage() {
  const [tasks, setTasks] = useState<AgentTask[]>(mockAgentTasks)
  const [expanded, setExpanded] = useState<string | null>(tasks[0]?.id ?? null)
  const [selectedLauncher, setSelectedLauncher] = useState<AgentTaskType>('suggest_collections')
  const t = useT()

  const update = (id: string, patch: Partial<AgentTask>) =>
    setTasks((ts) => ts.map((tk) => (tk.id === id ? { ...tk, ...patch } : tk)))

  const active = tasks.filter((tk) => tk.status !== 'accepted' && tk.status !== 'ignored')
  const done = tasks.filter((tk) => tk.status === 'accepted' || tk.status === 'ignored')

  const countByType = (type: AgentTaskType) => active.filter((tk) => tk.type === type).length

  const launcherDesc = (type: AgentTaskType, descKey: string) => {
    const n = countByType(type)
    if (n === 0) return t('agent.launcher.none_desc')
    return t(descKey, { n })
  }

  const queueLauncher = (type: AgentTaskType, labelKey: string, descKey: string) => {
    setSelectedLauncher(type)
    const id = uid('task')
    const nextCount = countByType(type) + 1
    const scope = t(descKey, { n: nextCount })
    const task: AgentTask = {
      id,
      type,
      title: t(labelKey),
      scope,
      plan: [
        'Curator scans the relevant assets',
        'Surfaces a plan with low-risk defaults',
        'Waits for your accept or edit before applying',
      ],
      preview: scope,
      explanation:
        'Mock — in a real build this would be computed by the curator. The plan is editable until you accept.',
      confidence: 0.78,
      status: 'previewing',
      createdAt: new Date().toISOString(),
    }
    setTasks((ts) => [task, ...ts])
    setExpanded(id)
    toast.curator(
      t('mock.agent_launcher.queued.title'),
      t('mock.agent_launcher.queued.desc')
    )
  }

  const undoDone = (id: string) => {
    update(id, { status: 'previewing' })
    setExpanded(id)
    toast({ kind: 'success', title: t('mock.agent_undo.title') })
  }

  const editPlan = () => {
    toast.curator(t('mock.agent_edit_plan.title'), t('mock.agent_edit_plan.desc'))
  }

  return (
    <div className="max-w-[1100px] mx-auto px-7 py-10">
      <header className="mb-10">
        <div className="eyebrow mb-2 flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-accent" strokeWidth={2} />
          <span className="text-accent-600">{t('agent.eyebrow')}</span>
        </div>
        <h1 className="serif text-[42px] leading-none tracking-editorial text-ink">
          {t('agent.title_part1')} <em className="italic">{t('agent.title_em')}</em>{t('agent.title_part2')}
        </h1>
        <p className="text-[13.5px] text-ink-600 mt-3 max-w-2xl">
          {t('agent.body')}
        </p>
      </header>

      {/* Quick task launchers */}
      <section className="mb-10">
        <div className="eyebrow mb-3">{t('agent.quick')}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Launcher
            icon={<TagIcon className="h-4 w-4" />}
            label={t('agent.launcher.auto_tag')}
            desc={launcherDesc('auto_tag', 'agent.launcher.auto_tag_desc')}
            accent={selectedLauncher === 'auto_tag'}
            onClick={() =>
              queueLauncher('auto_tag', 'agent.launcher.auto_tag', 'agent.launcher.auto_tag_desc')
            }
          />
          <Launcher
            icon={<FolderPlus className="h-4 w-4" />}
            label={t('agent.launcher.suggest')}
            desc={launcherDesc('suggest_collections', 'agent.launcher.suggest_desc')}
            accent={selectedLauncher === 'suggest_collections'}
            onClick={() =>
              queueLauncher(
                'suggest_collections',
                'agent.launcher.suggest',
                'agent.launcher.suggest_desc'
              )
            }
          />
          <Launcher
            icon={<Copy className="h-4 w-4" />}
            label={t('agent.launcher.duplicates')}
            desc={launcherDesc('clean_duplicates', 'agent.launcher.duplicates_desc')}
            accent={selectedLauncher === 'clean_duplicates'}
            onClick={() =>
              queueLauncher(
                'clean_duplicates',
                'agent.launcher.duplicates',
                'agent.launcher.duplicates_desc'
              )
            }
          />
          <Launcher
            icon={<Compass className="h-4 w-4" />}
            label={t('agent.launcher.refresh')}
            desc={t('agent.launcher.refresh_desc')}
            accent={selectedLauncher === 'update_profile'}
            onClick={() =>
              queueLauncher(
                'update_profile',
                'agent.launcher.refresh',
                'agent.launcher.refresh_desc'
              )
            }
          />
        </div>
      </section>

      {/* Active queue */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="eyebrow">{t('agent.in_queue')}</span>
            <Badge variant="soft" size="xs">{active.length}</Badge>
          </div>
        </div>
        <div className="space-y-3">
          {active.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              expanded={expanded === task.id}
              onToggle={() => setExpanded(expanded === task.id ? null : task.id)}
              onAccept={() => {
                update(task.id, { status: 'accepted' })
                toast.success(task.title, t('agent.status.accepted'))
              }}
              onIgnore={() => update(task.id, { status: 'ignored' })}
              onEditPlan={editPlan}
            />
          ))}
        </div>
      </section>

      {/* Done */}
      {done.length > 0 && (
        <section>
          <div className="eyebrow mb-3">{t('agent.recent')}</div>
          <div className="rounded-md border border-ink/[0.06] bg-paper divide-y divide-ink/[0.06]">
            {done.map((task) => (
              <div key={task.id} className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="h-6 w-6 rounded-xs bg-paper-200 inline-flex items-center justify-center text-ink-600">
                    {typeIcon[task.type]}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] text-ink truncate">{task.title}</div>
                    <div className="mono text-[10.5px] text-ink-600 uppercase tracking-widest">
                      {t(statusKey[task.status])}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="xs" onClick={() => undoDone(task.id)}>
                  <Undo2 className="h-3 w-3" />
                  {t('agent.undo')}
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function TaskCard({
  task,
  expanded,
  onToggle,
  onAccept,
  onIgnore,
  onEditPlan,
}: {
  task: AgentTask
  expanded: boolean
  onToggle: () => void
  onAccept: () => void
  onIgnore: () => void
  onEditPlan: () => void
}) {
  const t = useT()
  return (
    <article
      className={cn(
        'rounded-md border bg-paper transition-colors',
        expanded ? 'border-ink/[0.18]' : 'border-ink/[0.06] hover:border-ink/[0.14]'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start gap-4"
      >
        <div className="mt-0.5 h-8 w-8 rounded-sm bg-accent/[0.08] text-accent-600 inline-flex items-center justify-center shrink-0">
          {typeIcon[task.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="serif text-[20px] tracking-editorial text-ink leading-tight">
                {task.title}
              </h3>
              <div className="mt-1 flex items-center gap-2 mono text-[10.5px] uppercase tracking-widest text-ink-600">
                <span>{task.scope}</span>
                <span className="opacity-50">·</span>
                <span>{t('agent.confidence', { n: Math.round(task.confidence * 100) })}</span>
                <Layers className="h-3 w-3 opacity-50" />
              </div>
            </div>
            <Badge
              variant={
                task.status === 'previewing' ? 'accent' : task.status === 'running' ? 'ai' : 'soft'
              }
              size="sm"
            >
              {t(statusKey[task.status])}
            </Badge>
          </div>
          <p className="serif italic text-[14.5px] tracking-editorial text-ink-700 mt-2.5 leading-snug">
            {task.preview}
          </p>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-ink-600 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-ink-600 mt-1" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-ink/[0.06] pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="eyebrow mb-2">{t('agent.plan')}</div>
            <ol className="space-y-1.5 list-decimal pl-4 text-[13px] text-ink-700">
              {task.plan.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ol>
            <div className="mt-5">
              <div className="eyebrow mb-2">{t('agent.confidence_label')}</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-ink/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{ width: `${Math.round(task.confidence * 100)}%` }}
                  />
                </div>
                <span className="mono text-[11px] text-ink-700">{Math.round(task.confidence * 100)}%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-2">{t('agent.why')}</div>
            <p className="text-[13px] text-ink-700 leading-relaxed">{task.explanation}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button variant="primary" size="sm" onClick={onAccept}>
                <Check className="h-3.5 w-3.5" />
                {t('agent.accept_run')}
              </Button>
              <Button variant="secondary" size="sm" onClick={onEditPlan}>
                <Pencil className="h-3.5 w-3.5" />
                {t('agent.edit_plan')}
              </Button>
              <Button variant="ghost" size="sm" onClick={onIgnore}>
                <X className="h-3.5 w-3.5" />
                {t('agent.ignore')}
              </Button>
            </div>
            <p className="mt-3 text-[11.5px] text-ink-600 italic">
              {t('agent.bulk_hint')}
            </p>
          </div>
        </div>
      )}
    </article>
  )
}

function Launcher({
  icon,
  label,
  desc,
  accent,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  desc: string
  accent?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group text-left rounded-md border bg-paper p-4 transition-colors ring-focus',
        accent
          ? 'border-accent/30 hover:border-accent/60'
          : 'border-ink/[0.08] hover:border-ink/[0.2]'
      )}
    >
      <div
        className={cn(
          'h-8 w-8 rounded-sm inline-flex items-center justify-center mb-3',
          accent ? 'bg-accent/[0.1] text-accent-600' : 'bg-paper-200 text-ink-600'
        )}
      >
        {icon}
      </div>
      <div className="text-[13px] text-ink font-medium">{label}</div>
      <div className="mono text-[10.5px] text-ink-600 uppercase tracking-widest mt-1">{desc}</div>
    </button>
  )
}
