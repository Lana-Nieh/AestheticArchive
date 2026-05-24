import type { Collection, Tag } from '@/lib/types'
import { mockAssets } from './assets'

const t = (label: string, cat?: Tag['category']): Tag => ({
  id: `c_tag_${label.toLowerCase().replace(/\s+/g, '_')}`,
  label,
  source: 'system',
  category: cat,
})

const day = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

const pick = (ids: string[]) => ids.filter((id) => mockAssets.some((a) => a.id === id))

export const mockCollections: Collection[] = [
  {
    id: 'col_001',
    name: 'Quiet Luxury Interiors',
    description: 'Warm minimal residential spaces. Oak, linen, plaster, natural daylight.',
    coverAssetIds: pick(['a_001', 'a_010', 'a_027']),
    assetIds: pick(['a_001', 'a_005', 'a_010', 'a_015', 'a_027', 'a_023']),
    tags: [t('quiet luxury', 'style'), t('warm minimal', 'style'), t('interior', 'subject')],
    viewMode: 'grid',
    createdAt: day(28),
    updatedAt: day(2),
  },
  {
    id: 'col_002',
    name: 'Warm Editorial Layouts',
    description: 'Serif headlines, asymmetric grids, generous whitespace.',
    coverAssetIds: pick(['a_006', 'a_020', 'a_025']),
    assetIds: pick(['a_006', 'a_020', 'a_025']),
    tags: [t('editorial', 'style'), t('typography', 'subject')],
    viewMode: 'grid',
    createdAt: day(14),
    updatedAt: day(3),
  },
  {
    id: 'col_003',
    name: '90s Cold Metal References',
    description: 'Chrome, steel, desaturated portraits, cool palette.',
    coverAssetIds: pick(['a_002', 'a_008', 'a_024']),
    assetIds: pick(['a_002', 'a_008', 'a_024', 'a_017']),
    tags: [t('90s', 'era'), t('metal', 'material'), t('cool', 'mood')],
    viewMode: 'grid',
    createdAt: day(20),
    updatedAt: day(5),
  },
  {
    id: 'col_004',
    name: 'Japanese Cafe References',
    description: 'Specialty coffee, brass, oak, ceramic, warm hospitality.',
    coverAssetIds: pick(['a_005', 'a_019', 'a_023']),
    assetIds: pick(['a_005', 'a_019', 'a_023', 'a_015']),
    tags: [t('cafe', 'subject'), t('hospitality', 'usage'), t('warm minimal', 'style')],
    viewMode: 'grid',
    createdAt: day(10),
    updatedAt: day(1),
  },
  {
    id: 'col_005',
    name: 'Material Studies',
    description: 'Macro material references — linen, wool, ceramic, stone, paper.',
    coverAssetIds: pick(['a_007', 'a_014', 'a_021']),
    assetIds: pick(['a_007', 'a_014', 'a_021', 'a_028']),
    tags: [t('material', 'subject'), t('texture', 'subject')],
    viewMode: 'grid',
    createdAt: day(40),
    updatedAt: day(11),
  },
  {
    id: 'col_006',
    name: 'Soft Summer Palette',
    description: 'Muted dusty pinks, warm taupes, dusty greens.',
    coverAssetIds: pick(['a_011', 'a_026']),
    assetIds: pick(['a_011', 'a_026', 'a_022']),
    tags: [t('palette', 'subject'), t('low saturation', 'style')],
    viewMode: 'grid',
    createdAt: day(22),
    updatedAt: day(6),
  },
  {
    id: 'col_007',
    name: 'Suggested · Brutalist & Concrete',
    description: 'Auto-grouped from your recent imports. Strong geometric, cool palette, concrete material.',
    coverAssetIds: pick(['a_004', 'a_017']),
    assetIds: pick(['a_004', 'a_017']),
    tags: [t('brutalist', 'style'), t('concrete', 'material')],
    viewMode: 'grid',
    isAiSuggested: true,
    aiReason:
      '4 assets imported in the past 30 days share a brutalist concrete language with strong geometric composition. Confidence 0.87.',
    createdAt: day(2),
    updatedAt: day(2),
  },
  {
    id: 'col_008',
    name: 'Suggested · Foggy & Calm Landscapes',
    description: 'AI grouped these for a possible mood reference set.',
    coverAssetIds: pick(['a_012', 'a_013', 'a_028']),
    assetIds: pick(['a_012', 'a_013', 'a_028']),
    tags: [t('landscape', 'subject'), t('calm', 'mood')],
    viewMode: 'grid',
    isAiSuggested: true,
    aiReason:
      'Shared low-contrast, cool palette, and contemplative mood. Could become your “calm reset” reference shelf.',
    createdAt: day(3),
    updatedAt: day(3),
  },
]

// Wire back into assets' collections field
for (const c of mockCollections) {
  for (const aId of c.assetIds) {
    const a = mockAssets.find((x) => x.id === aId)
    if (a && !a.collections.includes(c.id)) a.collections.push(c.id)
  }
}
