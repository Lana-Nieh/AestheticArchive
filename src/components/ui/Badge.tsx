import { cn } from '@/lib/utils'

type Props = {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'ai' | 'system' | 'accent' | 'outline' | 'soft'
  size?: 'xs' | 'sm' | 'md'
}

export function Badge({ className, children, variant = 'default', size = 'sm' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
        size === 'xs' && 'text-[10px] px-1.5 py-0.5 rounded-xs',
        size === 'sm' && 'text-[11px] px-2 py-[3px] rounded-sm',
        size === 'md' && 'text-[12.5px] px-2.5 py-1 rounded-sm',
        variant === 'default' && 'bg-ink/[0.06] text-ink-800',
        variant === 'soft' && 'bg-paper-200 text-ink-800 border border-ink/[0.06]',
        variant === 'outline' && 'border border-ink/[0.18] text-ink',
        variant === 'accent' && 'bg-accent/[0.12] text-accent-600',
        variant === 'system' && 'border border-ink/[0.12] text-ink-600 bg-paper',
        variant === 'ai' && 'border border-dashed border-accent/40 bg-accent/[0.06] text-accent-600',
        className
      )}
    >
      {children}
    </span>
  )
}
