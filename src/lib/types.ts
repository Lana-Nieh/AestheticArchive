export type AssetType =
  | 'image'
  | 'screenshot'
  | 'video'
  | 'link'
  | 'pdf'
  | 'font'
  | 'color'
  | 'unknown'

export type TagSource = 'user' | 'system' | 'mock_ai'

export type TagCategory =
  | 'style'
  | 'mood'
  | 'material'
  | 'subject'
  | 'composition'
  | 'era'
  | 'usage'
  | 'color'

export type Tag = {
  id: string
  label: string
  category?: TagCategory
  source: TagSource
}

export type AssetColor = {
  hex: string
  name?: string
  percentage?: number
  temperature?: 'warm' | 'cool' | 'neutral'
}

export type Asset = {
  id: string
  type: AssetType
  title: string
  description?: string
  aiDescription?: string
  fileName?: string
  mimeType?: string
  thumbnailUrl: string
  previewUrl: string
  sourceUrl?: string
  sourceLabel?: string
  width?: number
  height?: number
  aspectRatio?: number
  fileSize?: number
  colors: AssetColor[]
  tags: Tag[]
  aiTags: Tag[]
  collections: string[]
  rating?: 1 | 2 | 3 | 4 | 5
  isFavorite: boolean
  notes?: string
  importedAt: string
  createdAt: string
  updatedAt: string
}

export type Collection = {
  id: string
  name: string
  description?: string
  coverAssetIds: string[]
  assetIds: string[]
  tags: Tag[]
  viewMode: 'grid' | 'moodboard'
  isAiSuggested?: boolean
  aiReason?: string
  createdAt: string
  updatedAt: string
}

export type ProfileKeyword = {
  label: string
  weight: number
  pinned?: boolean
  hidden?: boolean
  delta?: number
}

export type ProfileColorPreference = {
  hex: string
  label: string
  weight: number
  temperature?: 'warm' | 'cool' | 'neutral'
}

export type AestheticProfile = {
  id: string
  summary: string
  colorPreferences: ProfileColorPreference[]
  styleKeywords: ProfileKeyword[]
  moodKeywords: ProfileKeyword[]
  materialPreferences: ProfileKeyword[]
  compositionPreferences: ProfileKeyword[]
  subjectKeywords: ProfileKeyword[]
  eraKeywords: ProfileKeyword[]
  trendSummary: string
  monthChange: { label: string; delta: number }[]
  generatedAt: string
  updatedAt: string
}

export type CreativeBrief = {
  title: string
  mood: string
  visualKeywords: string[]
  colorDirection: string
  typographyDirection?: string
  imageDirection: string
  layoutDirection?: string
  materials?: string[]
  composition?: string
  avoid?: string[]
  prompt?: string
  notes?: string
}

export type MoodboardItem = {
  id: string
  assetId: string
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  zIndex: number
  locked?: boolean
}

export type Moodboard = {
  id: string
  name: string
  items: MoodboardItem[]
  layoutMode: 'freeform' | 'grid'
  createdAt: string
  updatedAt: string
}

export type Project = {
  id: string
  name: string
  description?: string
  status?: 'exploring' | 'directing' | 'archived'
  coverAssetId?: string
  moodboardId?: string
  assetIds: string[]
  brief?: CreativeBrief
  createdAt: string
  updatedAt: string
}

export type AgentTaskType =
  | 'auto_tag'
  | 'find_similar'
  | 'suggest_collections'
  | 'clean_duplicates'
  | 'split_collection'
  | 'generate_moodboard'
  | 'generate_brief'
  | 'update_profile'

export type AgentTaskStatus = 'pending' | 'previewing' | 'accepted' | 'ignored' | 'running'

export type AgentTask = {
  id: string
  type: AgentTaskType
  title: string
  scope: string
  plan: string[]
  preview: string
  explanation: string
  confidence: number
  status: AgentTaskStatus
  targetAssetIds?: string[]
  targetCollectionIds?: string[]
  resultTags?: Tag[]
  resultCollectionName?: string
  createdAt: string
}

export type SearchExplanation = {
  summary: string
  matchedTags: string[]
  matchedColors: string[]
  matchedMoods: string[]
}

export type SearchResult = {
  items: Asset[]
  explanation: SearchExplanation
  suggestedRefinements: { label: string; query: string }[]
}
