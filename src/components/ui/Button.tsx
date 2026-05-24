import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const button = cva(
  'inline-flex items-center justify-center gap-2 font-medium ring-focus transition-all duration-200 ease-editorial whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-ink text-paper hover:bg-ink-800 shadow-soft border border-ink/0',
        secondary:
          'bg-paper text-ink border border-ink/[0.12] hover:bg-paper-200 hover:border-ink/[0.18]',
        ghost: 'text-ink hover:bg-ink/[0.05]',
        outline:
          'border border-ink/[0.16] text-ink hover:bg-ink/[0.04] hover:border-ink/[0.24]',
        accent: 'bg-accent text-paper hover:bg-accent-500 shadow-soft',
        link: 'text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink/80 px-0 py-0',
        subtle:
          'text-ink-600 hover:text-ink hover:bg-ink/[0.04]',
      },
      size: {
        xs: 'h-7 px-2.5 text-[12px] rounded-sm',
        sm: 'h-8 px-3 text-[13px] rounded-sm',
        md: 'h-9 px-4 text-[13.5px] rounded-md',
        lg: 'h-11 px-5 text-[14px] rounded-md',
        xl: 'h-12 px-6 text-[14.5px] rounded-md tracking-wide',
        icon: 'h-8 w-8 rounded-sm',
        'icon-sm': 'h-7 w-7 rounded-sm',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(button({ variant, size }), className)} {...props} />
    )
  }
)
Button.displayName = 'Button'
