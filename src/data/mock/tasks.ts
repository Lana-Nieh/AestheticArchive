import type { AgentTask } from '@/lib/types'

const day = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export const mockAgentTasks: AgentTask[] = [
  {
    id: 'task_001',
    type: 'suggest_collections',
    title: 'Group your last 24 imports into 3 collections',
    scope: 'Last 24 imported assets',
    plan: [
      'Cluster imports by visual embedding',
      'Filter clusters with ≥ 3 members and coherence ≥ 0.78',
      'Propose collection names and 3 cover assets each',
    ],
    preview:
      'Brutalist & Concrete (4), Foggy Calm Landscapes (3), Coffee Hospitality (5). Other 12 will stay in Archive.',
    explanation:
      'These three groups have the highest within-cluster similarity and form distinct visual languages. Other recent imports overlap with existing collections and were skipped to avoid duplication.',
    confidence: 0.84,
    status: 'previewing',
    createdAt: day(0),
  },
  {
    id: 'task_002',
    type: 'auto_tag',
    title: 'Auto-tag 12 untagged assets',
    scope: '12 assets imported in the past week',
    plan: [
      'Run multimodal tag extraction on each asset',
      'Filter tags with confidence ≥ 0.7',
      'Match against your existing tag vocabulary',
    ],
    preview:
      'Average 5 tags per asset, mostly material and mood. 3 assets will receive new style keywords not in your vocabulary.',
    explanation:
      'Style keywords like "wabi-sabi" and "soft brutalism" appear repeatedly in your archive but are not yet in your vocabulary. Adding them now will improve future search.',
    confidence: 0.79,
    status: 'pending',
    createdAt: day(1),
  },
  {
    id: 'task_003',
    type: 'clean_duplicates',
    title: 'Review 6 near-duplicate candidates',
    scope: 'Full archive',
    plan: [
      'Find pairs with perceptual hash distance ≤ 6',
      'Skip pairs where both are favorited',
      'Surface the higher-resolution version for keep',
    ],
    preview: '6 near-duplicate pairs found. 4 pairs are safe to merge, 2 need your review.',
    explanation:
      'Duplicates are usually screenshots of the same source or re-uploads. We never auto-delete; we just suggest which to keep.',
    confidence: 0.91,
    status: 'pending',
    createdAt: day(2),
  },
  {
    id: 'task_004',
    type: 'split_collection',
    title: 'Split "Material Studies" into two directions',
    scope: 'Collection · Material Studies (12 assets)',
    plan: [
      'Cluster by material category',
      'Propose two sub-collections',
      'Keep original collection as parent',
    ],
    preview: 'Proposed split: Soft Fibers (linen, wool, paper) — 6 · Hard Surfaces (stone, brass, ceramic) — 6.',
    explanation:
      'Your queries against this collection split roughly 50/50 between soft and hard material references. Splitting will surface them faster.',
    confidence: 0.76,
    status: 'previewing',
    createdAt: day(3),
  },
  {
    id: 'task_005',
    type: 'update_profile',
    title: 'Refresh your Aesthetic Profile',
    scope: 'All assets since last profile update',
    plan: [
      'Recompute color, style, mood, material weights',
      'Compare to previous month',
      'Generate trend summary',
    ],
    preview:
      'Concrete +23%, chrome +18%, cool +12%, romantic −6%. Core warm minimal preference unchanged.',
    explanation:
      'The shift is small but consistent across 3 weeks — worth surfacing in the profile so your search results begin to reflect it.',
    confidence: 0.88,
    status: 'pending',
    createdAt: day(0),
  },
  {
    id: 'task_006',
    type: 'generate_brief',
    title: 'Generate brief for "Hana — Tea House"',
    scope: 'Project · Hana — Tea House (8 assets)',
    plan: [
      'Read selected assets and tags',
      'Produce mood, color, type, image, layout sections',
      'Add avoid list and AI prompt',
    ],
    preview: 'Brief draft ready. 6 sections, 5-item avoid list, one prompt.',
    explanation:
      'Brief is built from the dominant tags and colors in the moodboard. Edit any section freely — your edits update the prompt.',
    confidence: 0.82,
    status: 'accepted',
    createdAt: day(1),
  },
]
