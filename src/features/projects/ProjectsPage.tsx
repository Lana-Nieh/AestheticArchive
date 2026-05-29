import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, ArrowUpRight, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { projectAdapter, subscribeProjects } from '@/data/adapters/projectAdapter'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { useT, useRelativeTime } from '@/lib/i18n'
import { toast } from '@/components/ui/Toast'

export function ProjectsPage() {
  const [, setTick] = useState(0)
  useEffect(() => subscribeProjects(() => setTick((x) => x + 1)), [])
  const t = useT()
  const relativeTime = useRelativeTime()
  const navigate = useNavigate()

  const projects = projectAdapter.listProjects()

  const newProject = () => {
    const name = window.prompt(t('prompt.project_name'), '')
    const trimmed = name?.trim()
    if (!trimmed) return
    const p = projectAdapter.createProject({ name: trimmed, status: 'exploring' })
    toast.success(
      t('mock.created_project.title'),
      t('mock.created_project.desc')
    )
    navigate(`/projects/${p.id}`)
  }

  const fromFeeling = () => {
    const feeling = window.prompt(t('prompt.feeling'), '')
    const trimmed = feeling?.trim()
    if (!trimmed) {
      toast.curator(t('mock.from_feeling.title'), t('mock.from_feeling.desc'))
      return
    }
    const p = projectAdapter.createProject({
      name: trimmed,
      description: trimmed,
      status: 'exploring',
    })
    toast.curator(t('mock.from_feeling.title'), t('mock.from_feeling.desc'))
    navigate(`/projects/${p.id}`)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-7 py-10">
      <header className="flex items-end justify-between mb-10">
        <div>
          <div className="eyebrow mb-2">{t('projects.eyebrow')}</div>
          <h1 className="serif text-[42px] leading-none tracking-editorial text-ink">
            {t('projects.title_part1')} <em className="italic">{t('projects.title_em')}</em>{t('projects.title_part2')}
          </h1>
          <p className="text-[13.5px] text-ink-600 mt-3 max-w-xl">
            {t('projects.body')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={fromFeeling}>
            <Wand2 className="h-3.5 w-3.5" />
            {t('projects.from_feeling')}
          </Button>
          <Button variant="primary" size="sm" onClick={newProject}>
            <Plus className="h-3.5 w-3.5" />
            {t('projects.new')}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((p) => {
          const cover = p.coverAssetId ? assetAdapter.get(p.coverAssetId) : null
          const previewAssets = p.assetIds
            .map((id) => assetAdapter.get(id))
            .filter(Boolean)
            .slice(0, 6) as ReturnType<typeof assetAdapter.get>[]
          return (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="group block rounded-md overflow-hidden border border-ink/[0.06] bg-paper hover:border-ink/[0.16] transition-colors ring-focus"
            >
              <div className="relative grid grid-cols-3 grid-rows-2 gap-px aspect-[16/9] bg-paper-200">
                {cover && (
                  <div className="col-span-2 row-span-2">
                    <img src={cover.previewUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                {previewAssets.slice(0, 2).map((a) => (
                  <div key={a!.id}>
                    <img src={a!.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <ArrowUpRight className="absolute top-3 right-3 h-4 w-4 text-paper opacity-0 group-hover:opacity-100 transition-opacity" />
                {p.status && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="soft" size="sm">
                      {p.status}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="serif text-[24px] tracking-editorial text-ink leading-tight">
                    {p.name}
                  </h3>
                  <span className="mono text-[10.5px] text-ink-600 uppercase tracking-widest whitespace-nowrap">
                    {t('projects.refs', { n: p.assetIds.length })}
                  </span>
                </div>
                {p.description && (
                  <p className="serif italic text-[14.5px] tracking-editorial text-ink-700 mt-2 leading-snug">
                    {p.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.brief && (
                      <Badge variant="ai" size="xs">
                        {t('projects.brief_ready')}
                      </Badge>
                    )}
                    {p.moodboardId && (
                      <Badge variant="outline" size="xs">
                        {t('projects.moodboard')}
                      </Badge>
                    )}
                  </div>
                  <span className="mono text-[10px] uppercase tracking-widest text-ink-600/70">
                    {relativeTime(p.updatedAt)}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
