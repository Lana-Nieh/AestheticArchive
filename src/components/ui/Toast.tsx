import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Editorial toast system. Mock prototype actions surface here so every click
// produces visible feedback. Toasts auto-dismiss; stack from bottom-right.
// ─────────────────────────────────────────────────────────────────────────────

export type ToastKind = 'mock' | 'success' | 'curator' | 'info'

export type ToastInput = {
  title: string
  description?: string
  eyebrow?: string
  kind?: ToastKind
  duration?: number
}

type ToastItem = ToastInput & { id: string; createdAt: number }

const listeners = new Set<(items: ToastItem[]) => void>()
let items: ToastItem[] = []
let nextId = 1

const emit = () => listeners.forEach((l) => l(items))

function push(input: ToastInput) {
  const id = `t_${nextId++}`
  const item: ToastItem = {
    id,
    createdAt: Date.now(),
    duration: 3500,
    kind: 'mock',
    ...input,
  }
  items = [...items, item]
  emit()
  if (item.duration && item.duration > 0) {
    window.setTimeout(() => dismiss(id), item.duration)
  }
  return id
}

function dismiss(id: string) {
  items = items.filter((t) => t.id !== id)
  emit()
}

export const toast = Object.assign(
  (input: ToastInput) => push(input),
  {
    mock: (title: string, description?: string) =>
      push({ kind: 'mock', title, description }),
    success: (title: string, description?: string) =>
      push({ kind: 'success', title, description }),
    curator: (title: string, description?: string) =>
      push({ kind: 'curator', title, description }),
    info: (title: string, description?: string) =>
      push({ kind: 'info', title, description }),
    dismiss,
  }
)

export function Toaster() {
  const [list, setList] = useState<ToastItem[]>(items)
  useEffect(() => {
    listeners.add(setList)
    return () => {
      listeners.delete(setList)
    }
  }, [])

  if (list.length === 0) return null

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 max-w-[360px]"
    >
      {list.map((t) => (
        <ToastCard key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  )
}

function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const isMock = item.kind === 'mock' || item.kind === 'curator'
  const eyebrow =
    item.eyebrow ??
    (item.kind === 'curator'
      ? 'Curator'
      : item.kind === 'success'
      ? '·'
      : item.kind === 'mock'
      ? 'Mock'
      : '')

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto w-full rounded-md border bg-paper shadow-lift overflow-hidden',
        'animate-fade-up',
        isMock
          ? 'border-accent/25'
          : item.kind === 'success'
          ? 'border-ink/10'
          : 'border-ink/[0.08]'
      )}
    >
      <div className="px-3.5 py-3 flex items-start gap-2.5">
        {isMock && (
          <Sparkles
            className="h-3.5 w-3.5 mt-[3px] shrink-0 text-accent"
            strokeWidth={2}
          />
        )}
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <div
              className={cn(
                'mono uppercase tracking-widest text-[9.5px]',
                isMock ? 'text-accent-600' : 'text-ink-600/80'
              )}
            >
              {eyebrow}
            </div>
          ) : null}
          <div className="serif italic text-[14px] tracking-editorial text-ink leading-snug mt-0.5">
            {item.title}
          </div>
          {item.description && (
            <div className="text-[12px] text-ink-600 mt-1 leading-snug">
              {item.description}
            </div>
          )}
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 h-5 w-5 inline-flex items-center justify-center rounded-xs text-ink-600/60 hover:text-ink hover:bg-ink/[0.06] transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
