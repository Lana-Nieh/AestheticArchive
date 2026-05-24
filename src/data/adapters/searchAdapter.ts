import type { SearchResult } from '@/lib/types'
import { assetAdapter } from './assetAdapter'

// Semantic-feeling keyword map — when the user says "warm", we know to widen
// the search to include linen, oak, brass, cream, etc.
const semanticMap: Record<string, string[]> = {
  warm: ['oak', 'brass', 'linen', 'cream', 'tan', 'terracotta', 'warm', 'mushroom'],
  cool: ['concrete', 'steel', 'chrome', 'slate', 'mist', 'cool', 'graphite'],
  quiet: ['quiet luxury', 'warm minimal', 'calm', 'natural light'],
  calm: ['calm', 'foggy', 'contemplative', 'low contrast', 'low saturation'],
  minimal: ['warm minimal', 'whitespace', 'editorial'],
  editorial: ['editorial', 'serif headline', 'asymmetric grid', 'magazine'],
  coffee: ['coffee', 'cafe', 'hospitality', 'brass', 'oak'],
  wooden: ['oak', 'walnut', 'wood', 'tan'],
  beige: ['oat', 'bone', 'cream', 'linen', 'sand', 'tan'],
  metal: ['chrome', 'brass', 'steel', 'metal'],
  interior: ['interior', 'plaster', 'oak', 'linen'],
  natural: ['natural', 'natural light', 'organic', 'botanical'],
  '90s': ['90s', 'chrome', 'cold', 'editorial'],
  y2k: ['y2k', 'chrome', 'iridescent', 'glossy'],
  brutalist: ['brutalist', 'concrete', 'cool'],
  premium: ['quiet luxury', 'warm minimal', 'whitespace'],
  whitespace: ['whitespace', 'editorial'],
  ceramic: ['ceramic', 'clay', 'wabi-sabi'],
  craft: ['craft', 'tactile', 'wabi-sabi'],
}

export type SearchQuery = {
  q: string
  colors?: string[]
  styles?: string[]
}

export const searchAdapter = {
  search(query: SearchQuery): SearchResult {
    const q = (query.q ?? '').toLowerCase().trim()
    const tokens = q.split(/[\s,]+/).filter(Boolean)
    const expanded = Array.from(
      new Set(tokens.flatMap((t) => [t, ...(semanticMap[t] ?? [])]))
    )

    const { items: all } = assetAdapter.list()
    const scored = all.map((a) => {
      const hay = [
        a.title,
        a.description ?? '',
        a.aiDescription ?? '',
        ...a.tags.map((t) => t.label),
        ...a.aiTags.map((t) => t.label),
        ...a.colors.map((c) => c.name ?? ''),
      ]
        .join(' ')
        .toLowerCase()

      let score = 0
      const matchedTags = new Set<string>()
      const matchedColors = new Set<string>()
      const matchedMoods = new Set<string>()

      for (const tok of expanded) {
        if (hay.includes(tok)) {
          score += tokens.includes(tok) ? 3 : 1
          ;[...a.tags, ...a.aiTags].forEach((t) => {
            if (t.label.toLowerCase().includes(tok)) {
              matchedTags.add(t.label)
              if (t.category === 'mood') matchedMoods.add(t.label)
            }
          })
          a.colors.forEach((c) => {
            if ((c.name ?? '').toLowerCase().includes(tok)) matchedColors.add(c.name!)
          })
        }
      }
      return { a, score, matchedTags, matchedColors, matchedMoods }
    })

    const filtered = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score)
    const items = filtered.slice(0, 60).map((x) => x.a)

    const matchedTags = Array.from(new Set(filtered.flatMap((x) => Array.from(x.matchedTags)))).slice(0, 8)
    const matchedColors = Array.from(new Set(filtered.flatMap((x) => Array.from(x.matchedColors)))).slice(0, 6)
    const matchedMoods = Array.from(new Set(filtered.flatMap((x) => Array.from(x.matchedMoods)))).slice(0, 5)

    const summary =
      items.length === 0
        ? 'No matches yet — try a broader feeling like "warm", "quiet", or "editorial".'
        : buildSummary(q, items.length, matchedTags, matchedColors, matchedMoods)

    return {
      items,
      explanation: {
        summary,
        matchedTags,
        matchedColors,
        matchedMoods,
      },
      suggestedRefinements: buildRefinements(q),
    }
  },
}

function buildSummary(
  q: string,
  count: number,
  tags: string[],
  colors: string[],
  moods: string[]
) {
  const parts: string[] = [`${count} matches for `, `“${q}”`, ' — surfacing assets that share ']
  const phrases: string[] = []
  if (moods.length) phrases.push(`${moods.slice(0, 2).join(' / ')} mood`)
  if (colors.length) phrases.push(`${colors.slice(0, 2).join(', ').toLowerCase()} tones`)
  if (tags.length) phrases.push(`${tags.slice(0, 3).join(', ')} language`)
  parts.push(phrases.join(', ') + '.')
  return parts.join('')
}

function buildRefinements(q: string) {
  const base: { label: string; query: string }[] = []
  if (!q.includes('warm') && !q.includes('cool')) {
    base.push({ label: '+ warm tones only', query: `${q} warm` })
    base.push({ label: '+ cool tones only', query: `${q} cool` })
  }
  if (!q.includes('whitespace')) base.push({ label: '+ generous whitespace', query: `${q} whitespace` })
  if (!q.includes('editorial')) base.push({ label: '+ editorial layouts', query: `${q} editorial` })
  return base.slice(0, 4)
}
