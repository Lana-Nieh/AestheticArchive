import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  Search,
  Compass,
  Wand2,
  FileDown,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ThemeLanguageSwitcher } from '@/components/ui/Switcher'
import { mockAssets } from '@/data/mock/assets'
import { mockProfile } from '@/data/mock/profile'
import { isLight } from '@/lib/utils'
import { useT, useLang } from '@/lib/i18n'

const heroLeft = ['a_001', 'a_005', 'a_023']
const heroRight = ['a_010', 'a_006', 'a_018']

export function LandingPage() {
  const t = useT()

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />

      {/* HERO */}
      <section className="relative px-7 pt-24 pb-28">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-10 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="eyebrow mb-4 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent rounded-full" />
              {t('landing.hero.eyebrow')}
            </div>
            <h1 className="serif text-display-xl text-ink">
              {t('landing.hero.title_part1')} <em className="italic">{t('landing.hero.title_em')}</em>
              <br /> {t('landing.hero.title_part2')}
            </h1>
            <p className="text-[16px] text-ink-700 mt-7 max-w-xl leading-relaxed">
              {t('landing.hero.body')}
            </p>
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Button variant="primary" size="lg" asChild>
                <Link to="/archive">
                  {t('landing.hero.cta_studio')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/profile">
                  {t('landing.hero.cta_profile')}
                </Link>
              </Button>
            </div>
            <div className="mt-6 mono text-[11px] uppercase tracking-widest text-ink-600">
              {t('landing.hero.quiet')}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <HeroComposition />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="border-t border-ink/[0.06] py-24 px-7">
        <div className="max-w-[1100px] mx-auto grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow mb-3">{t('landing.problem.eyebrow')}</div>
            <h2 className="serif text-display-md leading-[1.05] tracking-editorial text-ink">
              {t('landing.problem.title')}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-5">
            <p className="serif italic text-[20px] tracking-editorial text-ink-700 leading-snug">
              {t('landing.problem.body1')}
            </p>
            <p className="text-[14.5px] text-ink-700 leading-relaxed">
              {t('landing.problem.body2_part1')}
              <span className="italic serif">{t('landing.problem.body2_part2')}</span>
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-ink/[0.06]">
              <Fact n={t('landing.fact.1.n')} l={t('landing.fact.1.l')} />
              <Fact n={t('landing.fact.2.n')} l={t('landing.fact.2.l')} />
              <Fact n={t('landing.fact.3.n')} l={t('landing.fact.3.l')} />
              <Fact n={t('landing.fact.4.n')} l={t('landing.fact.4.l')} />
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="border-t border-ink/[0.06] py-24 px-7 bg-paper-50">
        <div className="max-w-[1300px] mx-auto">
          <div className="eyebrow mb-3">{t('landing.workflow.eyebrow')}</div>
          <h2 className="serif text-display-md tracking-editorial text-ink max-w-3xl">
            {t('landing.workflow.title')}
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-px bg-ink/[0.06] rounded-md overflow-hidden border border-ink/[0.06]">
            <Step n="01" icon={<Sparkles className="h-4 w-4" />} title={t('landing.step.1.title')} desc={t('landing.step.1.desc')} />
            <Step n="02" icon={<Compass className="h-4 w-4" />} title={t('landing.step.2.title')} desc={t('landing.step.2.desc')} />
            <Step n="03" icon={<Search className="h-4 w-4" />} title={t('landing.step.3.title')} desc={t('landing.step.3.desc')} />
            <Step n="04" icon={<Wand2 className="h-4 w-4" />} title={t('landing.step.4.title')} desc={t('landing.step.4.desc')} />
            <Step n="05" icon={<FileDown className="h-4 w-4" />} title={t('landing.step.5.title')} desc={t('landing.step.5.desc')} />
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section className="border-t border-ink/[0.06] py-24 px-7">
        <div className="max-w-[1300px] mx-auto grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow mb-3">{t('landing.profile.eyebrow')}</div>
            <h2 className="serif text-display-md tracking-editorial text-ink leading-[1.02]">
              {t('landing.profile.title')}
            </h2>
            <p className="text-[14.5px] text-ink-700 mt-5 leading-relaxed max-w-md">
              {t('landing.profile.body')}
            </p>
            <Button variant="secondary" size="md" className="mt-6" asChild>
              <Link to="/profile">
                {t('landing.profile.cta')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ProfilePreview />
          </div>
        </div>
      </section>

      {/* AGENT TASKS */}
      <section className="border-t border-ink/[0.06] py-24 px-7 bg-paper-50">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow mb-3 inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-accent" /> {t('landing.agent.eyebrow')}
            </div>
            <h2 className="serif text-display-md tracking-editorial text-ink leading-[1.02]">
              {t('landing.agent.title')}
            </h2>
            <p className="text-[14.5px] text-ink-700 mt-5 leading-relaxed max-w-md">
              {t('landing.agent.body')}
            </p>
            <Button variant="secondary" size="md" className="mt-6" asChild>
              <Link to="/agent">
                {t('landing.agent.cta')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-3">
            <FakeTask
              title={t('landing.agent.task1.title')}
              status={t('landing.agent.task1.status')}
              meta={t('landing.agent.task1.meta')}
              text={t('landing.agent.task1.text')}
            />
            <FakeTask
              title={t('landing.agent.task2.title')}
              status={t('landing.agent.task2.status')}
              meta={t('landing.agent.task2.meta')}
              text={t('landing.agent.task2.text')}
            />
            <FakeTask
              title={t('landing.agent.task3.title')}
              status={t('landing.agent.task3.status')}
              meta={t('landing.agent.task3.meta')}
              text={t('landing.agent.task3.text')}
            />
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-t border-ink/[0.06] py-24 px-7">
        <div className="max-w-[1200px] mx-auto">
          <div className="eyebrow mb-3">{t('landing.principles.eyebrow')}</div>
          <h2 className="serif text-display-md tracking-editorial text-ink max-w-3xl">
            {t('landing.principles.title')}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/[0.06] rounded-md overflow-hidden border border-ink/[0.06]">
            <Principle title={t('landing.principle.1.title')} desc={t('landing.principle.1.desc')} />
            <Principle title={t('landing.principle.2.title')} desc={t('landing.principle.2.desc')} />
            <Principle title={t('landing.principle.3.title')} desc={t('landing.principle.3.desc')} />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-ink/[0.06] py-32 px-7 bg-ink text-paper relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto text-center relative">
          <div className="eyebrow text-paper/60 mb-5">{t('landing.final.eyebrow')}</div>
          <h2 className="serif text-display-xl text-paper">
            {t('landing.final.title_part1')} <em className="italic">{t('landing.final.title_em')}</em>{t('landing.final.title_part2')}
          </h2>
          <p className="text-[15px] text-paper/70 mt-6 max-w-xl mx-auto leading-relaxed">
            {t('landing.final.body')}
          </p>
          <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
            <Button variant="accent" size="xl" asChild>
              <Link to="/archive">
                {t('landing.final.cta_open')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="xl" className="text-paper/80 hover:text-paper hover:bg-paper/10" asChild>
              <Link to="/profile">{t('landing.final.cta_profile')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-paper/10 py-10 px-7 bg-ink text-paper/60">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between text-[12px]">
          <span className="serif italic text-paper">{t('landing.brand')}</span>
          <span className="mono uppercase tracking-widest text-[10px]">{t('landing.footer.meta')}</span>
        </div>
      </footer>
    </div>
  )
}

function Nav() {
  const t = useT()
  return (
    <div className="absolute top-0 inset-x-0 z-10 px-7 py-5 flex items-center justify-between gap-3">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="serif italic text-[19px] tracking-editorial">{t('landing.brand')}</span>
      </Link>
      <div className="flex items-center gap-1">
        <Link to="/profile" className="text-[13px] text-ink-700 hover:text-ink px-3 py-1.5">
          {t('landing.nav.profile')}
        </Link>
        <Link to="/agent" className="text-[13px] text-ink-700 hover:text-ink px-3 py-1.5">
          {t('landing.nav.curator')}
        </Link>
        <Link to="/collections" className="text-[13px] text-ink-700 hover:text-ink px-3 py-1.5 hidden sm:inline-flex">
          {t('landing.nav.collections')}
        </Link>
        <ThemeLanguageSwitcher variant="landing" className="ml-2 hidden md:flex" />
        <Button asChild size="sm" variant="primary" className="ml-2">
          <Link to="/archive">
            {t('landing.nav.open_studio')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function HeroComposition() {
  const t = useT()
  const left = heroLeft.map((id) => mockAssets.find((a) => a.id === id)!).filter(Boolean)
  const right = heroRight.map((id) => mockAssets.find((a) => a.id === id)!).filter(Boolean)

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3 pt-10">
          {left.map((a) => (
            <img
              key={a.id}
              src={a.previewUrl}
              alt={a.title}
              className="w-full rounded-md shadow-soft"
              style={{ aspectRatio: a.aspectRatio }}
            />
          ))}
        </div>
        <div className="space-y-3">
          {right.map((a) => (
            <img
              key={a.id}
              src={a.previewUrl}
              alt={a.title}
              className="w-full rounded-md shadow-soft"
              style={{ aspectRatio: a.aspectRatio }}
            />
          ))}
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 max-w-[280px] rounded-md bg-paper border border-ink/[0.08] shadow-lift p-4 hidden md:block animate-fade-up">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-3 w-3 text-accent" strokeWidth={2} />
          <span className="eyebrow text-accent-600">{t('landing.nav.curator')}</span>
        </div>
        <p className="serif italic text-[15px] tracking-editorial text-ink-800 leading-snug">
          {t('landing.curator_card')}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Button variant="primary" size="xs">{t('landing.curator_save')}</Button>
          <Button variant="ghost" size="xs">{t('common.edit')}</Button>
        </div>
      </div>
    </div>
  )
}

function Step({
  n,
  icon,
  title,
  desc,
}: {
  n: string
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="bg-paper p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="mono text-[10.5px] uppercase tracking-widest text-ink-600">{n}</span>
        <span className="text-accent">{icon}</span>
      </div>
      <h3 className="serif text-[20px] tracking-editorial text-ink leading-tight">{title}</h3>
      <p className="text-[12.5px] text-ink-600 mt-2 leading-snug flex-1">{desc}</p>
      <ChevronRight className="h-3 w-3 text-ink-600/40 mt-4" />
    </div>
  )
}

function Fact({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="serif text-[36px] leading-none tracking-editorial text-ink">{n}</div>
      <div className="text-[12px] text-ink-600 mt-1.5 leading-snug">{l}</div>
    </div>
  )
}

function Principle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-paper p-6">
      <h3 className="serif text-[22px] tracking-editorial text-ink leading-tight">{title}</h3>
      <p className="text-[13px] text-ink-700 mt-2 leading-snug">{desc}</p>
    </div>
  )
}

function FakeTask({
  title,
  status,
  meta,
  text,
}: {
  title: string
  status: string
  meta: string
  text: string
}) {
  return (
    <div className="rounded-md border border-ink/[0.08] bg-paper p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="serif text-[18px] tracking-editorial text-ink leading-tight">{title}</h3>
        <Badge variant="accent" size="xs">{status}</Badge>
      </div>
      <div className="mono text-[10.5px] uppercase tracking-widest text-ink-600 mb-2.5">{meta}</div>
      <p className="serif italic text-[14px] tracking-editorial text-ink-700 leading-snug">{text}</p>
    </div>
  )
}

function ProfilePreview() {
  const t = useT()
  const lang = useLang()
  const colorNameMap: Record<string, string> = {
    Linen: '亚麻',
    Oak: '橡木',
    Brass: '黄铜',
    Coffee: '咖啡',
    Concrete: '混凝土',
    Slate: '石板',
    Moss: '苔藓',
    Clay: '陶土',
    Bone: '骨白',
    Mushroom: '蘑菇',
    Espresso: '浓缩',
  }
  const styleNameMap: Record<string, string> = {
    'warm minimal': '温暖极简',
    editorial: '编辑感',
    'wabi-sabi': '侘寂',
    brutalist: '粗野主义',
    'quiet luxury': '静奢',
    'mid-century': '世纪中叶',
    '90s': '90 年代',
    y2k: 'Y2K',
    calm: '宁静',
    tactile: '可触',
    'natural light': '自然光',
    cool: '冷调',
    romantic: '浪漫',
    contemplative: '内省',
    craft: '手作',
    minimal: '极简',
    organic: '有机',
    serene: '澄澈',
    refined: '精致',
  }
  const translateColor = (label: string) => {
    if (lang !== 'zh') return label.split(' ')[0]
    const first = label.split(' ')[0]
    return colorNameMap[first] ?? first
  }
  const translateStyle = (label: string) => {
    if (lang !== 'zh') return label
    return styleNameMap[label] ?? label
  }
  return (
    <div className="rounded-md border border-ink/[0.08] bg-paper p-6">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="eyebrow mb-2">{t('landing.profile_preview.color_memory')}</div>
          <div className="grid grid-cols-4 gap-1.5">
            {mockProfile.colorPreferences.slice(0, 8).map((c) => (
              <div key={c.hex} className="aspect-square rounded-sm relative" style={{ background: c.hex, boxShadow: isLight(c.hex) ? 'inset 0 0 0 1px rgba(23,21,19,0.08)' : 'none' }}>
                <span className="absolute bottom-1 left-1.5 mono text-[8.5px] uppercase tracking-widest" style={{ color: isLight(c.hex) ? '#1f1b17' : '#fff' }}>
                  {translateColor(c.label)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="eyebrow mb-2">{t('landing.profile_preview.style_memory')}</div>
            <div className="flex flex-wrap gap-1.5">
              {mockProfile.styleKeywords.slice(0, 6).map((k) => (
                <span
                  key={k.label}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-sm border border-ink/[0.1] bg-paper-50 serif tracking-editorial text-ink"
                  style={{ fontSize: 12 + Math.round(k.weight * 6) }}
                >
                  {translateStyle(k.label)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="eyebrow mb-2">{t('landing.profile_preview.recent_shift')}</div>
          <p className="serif italic text-[15px] tracking-editorial text-ink-800 leading-snug">
            {t('landing.profile_preview.shift_text')}
          </p>
          <div className="mt-4 space-y-2">
            {mockProfile.monthChange.slice(0, 4).map((m) => (
              <div key={m.label} className="flex items-center justify-between text-[12.5px]">
                <span className="text-ink-700">{m.label}</span>
                <span className={`mono ${m.delta >= 0 ? 'text-moss' : 'text-rust'}`}>
                  {m.delta >= 0 ? '+' : ''}{Math.round(m.delta * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
