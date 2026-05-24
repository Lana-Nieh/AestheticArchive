import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({
  className,
  children,
  size = 'md',
  showClose = true,
}: {
  className?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px] data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
          'w-[calc(100vw-2rem)] bg-paper border border-ink/[0.08] rounded-lg shadow-lift',
          'data-[state=open]:animate-fade-up',
          size === 'sm' && 'max-w-md',
          size === 'md' && 'max-w-2xl',
          size === 'lg' && 'max-w-4xl',
          size === 'xl' && 'max-w-6xl',
          className
        )}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 h-7 w-7 inline-flex items-center justify-center rounded-sm text-ink-600 hover:text-ink hover:bg-ink/[0.06] ring-focus"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 pt-6 pb-4 border-b border-ink/[0.06]', className)}>{children}</div>
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Title
      className={cn('serif text-[24px] leading-tight tracking-editorial text-ink', className)}
    >
      {children}
    </DialogPrimitive.Title>
  )
}

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <DialogPrimitive.Description className={cn('mt-1.5 text-[13px] text-ink-600', className)}>
      {children}
    </DialogPrimitive.Description>
  )
}
