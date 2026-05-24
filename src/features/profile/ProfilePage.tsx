import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Pin,
  EyeOff,
  RotateCw,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { profileAdapter, subscribeProfile } from '@/data/adapters/profileAdapter'
import { isLight } from '@/lib/utils'
import { mockAssets } from '@/data/mock/assets'
import { cn } from '@/lib/utils'
import { useT, useRelativeTime } from '@/lib/i18n'

export function ProfilePage() {
  const navigate = useNavigate()
  const [, setTick] = useState(0)
  useEffect(() => subscribeProfile(() => setTick((x) => x + 1)), [])
  const t = useT()
  const relativeTime = useRelativeTime()

  const profile = profileAdapter.get()

  // Image clusters: pick a few representative assets for each "cluster"
  const clusters = [
    {
      title: t('profile.cluster.1.title'),
      assetIds: ['a_001', 'a_010', 'a_027', 'a_005'],
      desc: t('profile.cluster.1.desc'),
    },
    {
      title: t('profile.cluster.2.title'),
      assetIds: ['a_006', 'a_020', 'a_025'],
      desc: t('profile.cluster.2.desc'),
    },
    {
      title: t('profile.cluster.3.title'),
      assetIds: ['a_007', 'a_014', 'a_021', 'a_023'],
      desc: t('profile.cluster.3.desc'),
    },
  ]

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Editorial portrait header */}
      <div className="px-7 pt-12 pb-10 border-b border-ink/[0.06]">
        <div className="grid grid-cols-12 gap-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="eyebrow mb-2">{t('profile.eyebrow')}</div>
            <h1 className="serif text-[clamp(44px,6vw,84px)] leading-[0.92] tracking-editorial text-ink">
              {t('profile.title_part1')} <em className="italic">{t('profile.title_em')}</em>{t('profile.title_part2', { n: mockAssets.length })}
            </h1>
            <p className="serif italic text-[20px] tracking-editorial text-ink-700 mt-6 max-w-2xl leading-snug">
              {profile.summary}
            </p>

            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <Button variant="primary" size="sm">
                <RotateCw className="h-3.5 w-3.5" />
                {t('profile.refresh')}
              </Button>
              <Button variant="secondary" size="sm">
                <Sparkles className="h-3.5 w-3.5" />
                {t('profile.apply_lens')}
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-3.5 w-3.5" />
                {t('profile.export')}
              </Button>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="rounded-md border border-ink/[0.08] bg-paper-50 p-5">
              <div className="eyebrow mb-3">{t('profile.updated')}</div>
              <div className="serif italic text-[20px] tracking-editorial text-ink-800">
                {relativeTime(profile.updatedAt)}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label={t('profile.stat.assets')} value={mockAssets.length.toString()} />
                <Stat label={t('profile.stat.colors')} value={profile.colorPreferences.length.toString()} />
                <Stat label={t('profile.stat.style_words')} value={profile.styleKeywords.length.toString()} />
                <Stat label={t('profile.stat.pinned')} value={profile.styleKeywords.filter((k) => k.pinned).length.toString()} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Body */}
      <div className="px-7 py-10 grid grid-cols-12 gap-10">
        {/* Color preferences — big editorial column */}
        <section className="col-span-12 lg:col-span-7">
          <SectionTitle eyebrow={t('profile.color_eyebrow')} title={t('profile.color_title')} />
          <div className="grid grid-cols-2 gap-3.5">
            {profile.colorPreferences.map((c, i) => {
              const max = profile.colorPreferences[0].weight
              const w = Math.round((c.weight / max) * 100)
              return (
                <div
                  key={c.hex}
                  className={cn(
                    'group rounded-md overflow-hidden border border-ink/[0.06] bg-paper hover:border-ink/[0.18] transition-colors',
                    i === 0 && 'col-span-2'
                  )}
                >
                  <div
                    className={cn('w-full', i === 0 ? 'h-32' : 'h-20')}
                    style={{
                      background: c.hex,
                      boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(23,21,19,0.06)' : 'none',
                    }}
                  />
                  <div className="px-3 py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-[13px] text-ink">{c.label}</div>
                      <div className="mono text-[10.5px] text-ink-600 uppercase tracking-widest">
                        {c.hex}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[12px] text-ink-700 mono">{w}%</div>
                      <div className="mono text-[9.5px] text-ink-600 uppercase tracking-widest">
                        {c.temperature}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Right column — keyword groups */}
        <section className="col-span-12 lg:col-span-5 space-y-10">
          <KeywordGroup
            title={t('profile.style_title')}
            eyebrow={t('profile.style_eyebrow')}
            items={profile.styleKeywords}
            onClick={(label) => navigate(`/search?q=${encodeURIComponent(label)}`)}
          />
          <KeywordGroup
            title={t('profile.mood_title')}
            eyebrow={t('profile.mood_eyebrow')}
            items={profile.moodKeywords}
            onClick={(label) => navigate(`/search?q=${encodeURIComponent(label)}`)}
          />
          <KeywordGroup
            title={t('profile.material_title')}
            eyebrow={t('profile.material_eyebrow')}
            items={profile.materialPreferences}
            onClick={(label) => navigate(`/search?q=${encodeURIComponent(label)}`)}
          />
        </section>

        {/* Composition & subject */}
        <section className="col-span-12 lg:col-span-6">
          <SectionTitle eyebrow={t('profile.composition_eyebrow')} title={t('profile.composition_title')} />
          <div className="space-y-3">
            {profile.compositionPreferences.map((k) => (
              <BarRow key={k.label} label={k.label} value={k.weight} />
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-6">
          <SectionTitle eyebrow={t('profile.subject_eyebrow')} title={t('profile.subject_title')} />
          <div className="space-y-3">
            {profile.subjectKeywords.map((k) => (
              <BarRow key={k.label} label={k.label} value={k.weight} />
            ))}
          </div>
        </section>

        {/* Image clusters */}
        <section className="col-span-12">
          <SectionTitle eyebrow={t('profile.clusters_eyebrow')} title={t('profile.clusters_title')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {clusters.map((c) => {
              const assets = c.assetIds.map((id) => mockAssets.find((a) => a.id === id)).filter(Boolean)
              return (
                <div key={c.title} className="rounded-md border border-ink/[0.06] bg-paper overflow-hidden">
                  <div className="grid grid-cols-2 gap-px bg-paper-200 aspect-[5/3]">
                    {assets.slice(0, 4).map((a) => (
                      <img key={a!.id} src={a!.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                    ))}
                  </div>
                  <div className="p-4">
                    <h3 className="serif text-[19px] tracking-editorial text-ink leading-tight">
                      {c.title}
                    </h3>
                    <p className="text-[12.5px] text-ink-600 mt-1.5 leading-snug">{c.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Trends */}
        <section className="col-span-12">
          <div className="rounded-md border border-ink/[0.08] bg-paper-50 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-accent" strokeWidth={2} />
              <span className="eyebrow text-accent-600">{t('profile.trends_eyebrow')}</span>
            </div>
            <p className="serif italic text-[20px] tracking-editorial text-ink-800 leading-snug max-w-3xl">
              {profile.trendSummary}
            </p>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
              {profile.monthChange.map((m) => {
                const up = m.delta >= 0
                return (
                  <div
                    key={m.label}
                    className="rounded-sm border border-ink/[0.08] bg-paper p-3"
                  >
                    <div className="text-[12.5px] text-ink">{m.label}</div>
                    <div
                      className={cn(
                        'mt-1 inline-flex items-center gap-1 mono text-[12px]',
                        up ? 'text-moss' : 'text-rust'
                      )}
                    >
                      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {up ? '+' : ''}
                      {Math.round(m.delta * 100)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm bg-paper border border-ink/[0.06] p-2.5">
      <div className="eyebrow mb-1">{label}</div>
      <div className="serif text-[20px] tracking-editorial text-ink">{value}</div>
    </div>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-5">
      <div className="eyebrow mb-1.5">{eyebrow}</div>
      <h2 className="serif text-[24px] tracking-editorial text-ink leading-tight">{title}</h2>
    </header>
  )
}

function KeywordGroup({
  title,
  eyebrow,
  items,
  onClick,
}: {
  title: string
  eyebrow: string
  items: { label: string; weight: number; pinned?: boolean; hidden?: boolean; delta?: number }[]
  onClick: (label: string) => void
}) {
  const t = useT()
  return (
    <div>
      <SectionTitle eyebrow={eyebrow} title={title} />
      <div className="flex flex-wrap gap-1.5">
        {items
          .filter((k) => !k.hidden)
          .sort((a, b) => b.weight - a.weight)
          .map((k) => {
            const fontSize = 12 + Math.round(k.weight * 12)
            return (
              <div key={k.label} className="group relative inline-flex items-center">
                <button
                  onClick={() => onClick(k.label)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-ink/[0.10] bg-paper hover:border-ink/[0.24] transition-colors"
                  style={{ fontSize }}
                >
                  {k.pinned && <Pin className="h-2.5 w-2.5 text-accent fill-accent" strokeWidth={2} />}
                  <span className="serif tracking-editorial text-ink">{k.label}</span>
                  {k.delta && (
                    <span
                      className={cn(
                        'mono text-[9.5px] uppercase tracking-widest',
                        k.delta > 0 ? 'text-moss' : 'text-rust'
                      )}
                    >
                      {k.delta > 0 ? '+' : ''}
                      {Math.round(k.delta * 100)}%
                    </span>
                  )}
                </button>
              </div>
            )
          })}
      </div>
      <div className="mt-3 text-[11.5px] text-ink-600">
        {t('profile.keyword_hint')}
      </div>
    </div>
  )
}

function BarRow({ label, value }: { label: string; value: number }) {
  const pct = Math.round(value * 100)
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] text-ink">{label}</span>
        <span className="mono text-[10.5px] text-ink-600 uppercase tracking-widest">{pct}%</span>
      </div>
      <div className="h-1 bg-ink/[0.08] rounded-full overflow-hidden">
        <div
          className="h-full bg-ink rounded-full"
          style={{ width: `${pct}%`, transition: 'width 0.6s ease' }}
        />
      </div>
    </div>
  )
}
