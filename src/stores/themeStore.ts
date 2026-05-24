import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark' | 'system'

type ThemeState = {
  mode: ThemeMode
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const STORAGE_KEY = 'aa.theme'

function readStored(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  } catch {
    /* ignore */
  }
  return 'light'
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolve(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') return systemPrefersDark() ? 'dark' : 'light'
  return mode
}

function apply(resolved: 'light' | 'dark') {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.dataset.theme = resolved
}

const initialMode = readStored()
const initialResolved = resolve(initialMode)
apply(initialResolved)

export const useTheme = create<ThemeState>((set, get) => ({
  mode: initialMode,
  resolved: initialResolved,
  setMode: (mode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
    const resolved = resolve(mode)
    apply(resolved)
    set({ mode, resolved })
  },
  toggle: () => {
    const next: ThemeMode = get().resolved === 'dark' ? 'light' : 'dark'
    get().setMode(next)
  },
}))

if (typeof window !== 'undefined' && window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = () => {
    const state = useTheme.getState()
    if (state.mode !== 'system') return
    const resolved: 'light' | 'dark' = mq.matches ? 'dark' : 'light'
    apply(resolved)
    useTheme.setState({ resolved })
  }
  try {
    mq.addEventListener('change', handler)
  } catch {
    mq.addListener(handler)
  }
}
