import type { Moodboard, Project } from '@/lib/types'
import { mockMoodboards, mockProjects } from '@/data/mock/projects'
import { uid } from '@/lib/utils'

let projects: Project[] = [...mockProjects]
let moodboards: Moodboard[] = [...mockMoodboards]

const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export function subscribeProjects(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export const projectAdapter = {
  listProjects(): Project[] {
    return [...projects].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
  },
  getProject(id: string): Project | null {
    return projects.find((p) => p.id === id) ?? null
  },
  createProject(input: Partial<Project> & { name: string }): Project {
    const now = new Date().toISOString()
    const p: Project = {
      id: uid('prj'),
      name: input.name,
      description: input.description,
      status: input.status ?? 'exploring',
      coverAssetId: input.coverAssetId,
      assetIds: input.assetIds ?? [],
      brief: input.brief,
      createdAt: now,
      updatedAt: now,
    }
    projects = [p, ...projects]
    emit()
    return p
  },
  updateProject(id: string, patch: Partial<Project>): Project | null {
    projects = projects.map((p) =>
      p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p
    )
    emit()
    return projectAdapter.getProject(id)
  },
  getMoodboard(id?: string): Moodboard | null {
    if (!id) return null
    return moodboards.find((m) => m.id === id) ?? null
  },
  updateMoodboard(id: string, items: Moodboard['items']) {
    moodboards = moodboards.map((m) =>
      m.id === id ? { ...m, items, updatedAt: new Date().toISOString() } : m
    )
    emit()
  },
}
