import { cn } from '@/lib/utils'

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'mono inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5',
        'text-[10.5px] text-ink-600 border border-ink/[0.14] bg-paper rounded-xs',
        'shadow-[inset_0_-1px_0_rgba(23,21,19,0.06)]',
        className
      )}
    >
      {children}
    </kbd>
  )
}
