import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={250} skipDelayDuration={120}>
      {children}
    </TooltipPrimitive.Provider>
  )
}

export function Tooltip({
  children,
  content,
  side = 'top',
  shortcut,
}: {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  shortcut?: string
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            'z-50 px-2.5 py-1.5 rounded-sm bg-ink text-paper text-[11.5px] tracking-tight',
            'shadow-lift data-[state=delayed-open]:animate-fade-in',
            'flex items-center gap-2'
          )}
        >
          {content}
          {shortcut && (
            <span className="mono text-[10px] opacity-60 border border-paper/20 px-1 rounded-xs">
              {shortcut}
            </span>
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
