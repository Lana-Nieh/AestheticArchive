import { create } from 'zustand'

export type Language = 'en' | 'zh'

type LanguageState = {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
}

const STORAGE_KEY = 'aa.lang'

function readStored(): Language {
  if (typeof window === 'undefined') return 'en'
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw === 'en' || raw === 'zh') return raw
  } catch {
    /* ignore */
  }
  // Auto-pick Chinese on first visit if browser is set to a Chinese locale
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

function apply(lang: Language) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang === 'zh' ? 'zh' : 'en'
}

const initialLang = readStored()
apply(initialLang)

export const useLanguage = create<LanguageState>((set, get) => ({
  lang: initialLang,
  setLang: (lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    apply(lang)
    set({ lang })
  },
  toggle: () => {
    const next: Language = get().lang === 'en' ? 'zh' : 'en'
    get().setLang(next)
  },
}))
