import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-9 w-full bg-paper border border-ink/[0.12] rounded-md px-3 text-[13.5px] text-ink',
        'placeholder:text-ink-600/60 ring-focus transition-colors',
        'hover:border-ink/[0.22] focus:border-ink/[0.4]',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full bg-paper border border-ink/[0.12] rounded-md px-3 py-2 text-[13.5px] text-ink',
      'placeholder:text-ink-600/60 ring-focus transition-colors resize-none',
      'hover:border-ink/[0.22] focus:border-ink/[0.4]',
      className
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'
