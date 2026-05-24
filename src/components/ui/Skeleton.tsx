import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-ink/[0.04] shimmer animate-shimmer rounded-sm',
        className
      )}
      {...props}
    />
  )
}
