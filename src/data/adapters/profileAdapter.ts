import type { AestheticProfile, ProfileKeyword } from '@/lib/types'
import { mockProfile } from '@/data/mock/profile'

let store: AestheticProfile = { ...mockProfile }
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function subscribeProfile(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export const profileAdapter = {
  get(): AestheticProfile {
    return store
  },
  togglePin(group: keyof AestheticProfile, label: string) {
    const collection = store[group]
    if (!Array.isArray(collection)) return store
    const next = (collection as ProfileKeyword[]).map((k) =>
      k.label === label ? { ...k, pinned: !k.pinned } : k
    )
    store = { ...store, [group]: next, updatedAt: new Date().toISOString() } as AestheticProfile
    emit()
    return store
  },
  toggleHide(group: keyof AestheticProfile, label: string) {
    const collection = store[group]
    if (!Array.isArray(collection)) return store
    const next = (collection as ProfileKeyword[]).map((k) =>
      k.label === label ? { ...k, hidden: !k.hidden } : k
    )
    store = { ...store, [group]: next, updatedAt: new Date().toISOString() } as AestheticProfile
    emit()
    return store
  },
}
