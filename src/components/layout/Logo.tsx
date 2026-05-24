import { Link } from 'react-router-dom'
import { useLang } from '@/lib/i18n'

export function Logo({ to = '/archive' }: { to?: string }) {
  const lang = useLang()
  const brand = lang === 'zh' ? '审美档案' : 'Aesthetic Archive'
  const tagline = lang === 'zh' ? '一份私人审美记忆' : 'a personal taste memory'
  return (
    <Link
      to={to}
      className="group flex items-center gap-2.5 -ml-0.5 ring-focus rounded-sm py-1"
      aria-label={brand}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-[6px] bg-ink text-paper">
        <span className="serif italic text-[15px] leading-none translate-y-[0.5px]">Aa</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="serif text-[15px] tracking-editorial text-ink">{brand}</span>
        <span className="mono uppercase tracking-widest text-[8.5px] text-ink-600 mt-0.5">
          {tagline}
        </span>
      </span>
    </Link>
  )
}
