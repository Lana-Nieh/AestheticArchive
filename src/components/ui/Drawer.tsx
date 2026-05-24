import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Drawer = DialogPrimitive.Root

export function DrawerContent({
  children,
  className,
  side = 'right',
  width = '460px',
  showClose = true,
}: {
  children: React.ReactNode
  className?: string
  side?: 'right' | 'left'
  width?: string
  showClose?: boolean
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[1px] data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content
        style={{ width }}
        className={cn(
          'fixed top-0 bottom-0 z-50 bg-paper border-ink/[0.08]',
          'flex flex-col shadow-lift',
          side === 'right'
            ? 'right-0 border-l data-[state=open]:animate-[fade-in_.3s_ease-editorial]'
            : 'left-0 border-r',
          className
        )}
      >
        {showClose && (
          <DialogPrimitive.Close
            className="absolute right-3 top-3 z-10 h-7 w-7 inline-flex items-center justify-center rounded-sm text-ink-600 hover:text-ink hover:bg-ink/[0.06] ring-focus"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )}
        {/* Hidden accessible title fallback (consumer should provide their own) */}
        <DialogPrimitive.Title className="sr-only">Drawer</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">Detail panel</DialogPrimitive.Description>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
