import { cn } from '@/lib/utils'

type Props = {
  icon?: React.ReactNode
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  variant?: 'page' | 'inline'
}

export function EmptyState({ icon, title, description, actions, className, variant = 'page' }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        variant === 'page' ? 'py-24' : 'py-12',
        className
      )}
    >
      {icon && (
        <div className="mb-6 h-14 w-14 rounded-full bg-paper-200 border border-ink/[0.06] flex items-center justify-center text-ink-600">
          {icon}
        </div>
      )}
      <h3 className="serif text-[26px] tracking-editorial text-ink mb-1.5">{title}</h3>
      {description && (
        <p className="text-[13px] text-ink-600 max-w-md mx-auto">{description}</p>
      )}
      {actions && <div className="mt-6 flex items-center gap-2">{actions}</div>}
    </div>
  )
}
