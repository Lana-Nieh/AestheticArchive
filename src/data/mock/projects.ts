import type { Project, Moodboard } from '@/lib/types'
import { mockAssets } from './assets'

const day = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

const has = (id: string) => mockAssets.some((a) => a.id === id)
const pick = (ids: string[]) => ids.filter(has)

export const mockMoodboards: Moodboard[] = [
  {
    id: 'mb_001',
    name: 'Hana — Tea House',
    layoutMode: 'grid',
    items: pick(['a_001', 'a_005', 'a_023', 'a_015', 'a_007', 'a_010', 'a_019', 'a_021']).map(
      (assetId, i) => ({
        id: `mbi_${assetId}`,
        assetId,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        zIndex: i,
      })
    ),
    createdAt: day(5),
    updatedAt: day(1),
  },
]

export const mockProjects: Project[] = [
  {
    id: 'prj_001',
    name: 'Hana — Tea House',
    description:
      'Brand and web direction for a new tea house in Kyoto. Quiet, warm, ceremonial.',
    status: 'directing',
    coverAssetId: 'a_023',
    moodboardId: 'mb_001',
    assetIds: pick(['a_001', 'a_005', 'a_023', 'a_015', 'a_007', 'a_010', 'a_019', 'a_021']),
    brief: {
      title: 'Hana — Tea House',
      mood: 'Quiet, warm, ceremonial. Light enters slowly. Materials speak first.',
      visualKeywords: ['warm minimal', 'wabi-sabi', 'ceramic', 'natural light', 'oak', 'linen'],
      colorDirection:
        'A warm neutral foundation — bone, oak, mushroom, espresso — anchored by a single clay accent. Avoid bright whites and any cool blues.',
      typographyDirection:
        'Editorial italic serif for headlines (Cormorant or Söhne Garamond). Clean humanist sans for body. Monospaced metadata for small product detail.',
      imageDirection:
        'Soft daylight, low contrast, low saturation. Materials in macro. Hands in motion. Single subject, generous whitespace.',
      layoutDirection:
        'Asymmetric editorial grid with large image moments and quiet text columns. Long vertical scroll, slow pacing.',
      materials: ['oak', 'linen', 'hand-thrown ceramic', 'unglazed clay', 'brass'],
      composition:
        'Hero with a single image and an italic serif headline. Subsequent sections alternate between full-bleed material macro shots and a 2-column editorial passage.',
      avoid: [
        'cool blue gradients',
        'bright pure white',
        'glossy chrome',
        'busy decorative type',
        'generic SaaS card grids',
      ],
      prompt:
        'A warm, quiet tea house interior in Kyoto, soft natural daylight, hand-thrown ceramic cups on a stone tray, oak shelving, linen drapes, low-saturation editorial photography, 35mm film, shallow depth of field, calm contemplative mood',
      notes:
        'For photographer: shoot at 8–10am, prioritize the back room window. For designer: use Cormorant for headlines and Inter for UI.',
    },
    createdAt: day(7),
    updatedAt: day(1),
  },
  {
    id: 'prj_002',
    name: 'Atelier Editorial Refresh',
    description: 'Magazine-style refresh for a furniture studio site.',
    status: 'exploring',
    coverAssetId: 'a_006',
    assetIds: pick(['a_006', 'a_020', 'a_025', 'a_015']),
    createdAt: day(3),
    updatedAt: day(2),
  },
]
