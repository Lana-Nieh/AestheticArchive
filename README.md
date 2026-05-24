# Aesthetic Archive

A private visual studio for creators — frontend prototype.

This is a complete, interactive frontend prototype of **Aesthetic Archive**: a personal aesthetic memory system powered by an AI curator. The product is positioned as a private visual studio (not Pinterest, not a generic DAM, not a chatbot). This MVP implements the full UI surface area defined in the product and technical docs, with carefully crafted mock data standing in for the LLM and backend.

## What's inside

- **Landing page** (`/`) — editorial hero, problem framing, workflow, aesthetic profile preview, agent task philosophy, principles, final CTA.
- **App shell** with calm sidebar nav, sticky semantic search topbar, command menu (`⌘ K`), and import shortcut (`⌘ U`).
- **Archive** (`/archive`) — masonry / bento / grid layouts, filter panel (color temperature, palette, style, mood, material, subject, rating), multi-select toolbar with bulk operations, hover previews with palette + AI tags.
- **Asset Detail Drawer** — large preview, editable title and notes, AI description, dominant palette, user tags, suggested tags (visually distinct, accept-on-click), star rating, similar assets, prev/next nav.
- **Collections** (`/collections`) — editorial shelf cards, AI-suggested collections with explanation cards, full detail page with palette + visual language summary.
- **Semantic Search** (`/search`) — natural language input, curator response card with matched moods/tags/colors, refinement suggestions, profile lens toggle.
- **Aesthetic Profile** (`/profile`) — editorial taste portrait: color memory grid, style / mood / material keyword clouds with pin / hide / delta, composition + subject bars, image clusters, recent shifts.
- **Agent Tasks** (`/agent`) — structured task cards (input scope, plan, preview, explanation, confidence) with accept / edit / ignore actions, recent activity log with undo.
- **Projects + Moodboard** (`/projects`, `/projects/:id`) — project cards with status, full moodboard workspace with drag-and-drop sortable grid (`@dnd-kit`), side inspector showing the full creative brief.
- **Upload Dialog** with drag, file picker, paste, and import preview queue.
- **Collection Picker** with search, multi-select, and inline create.
- **Settings** with keyboard reference.

## Visual direction

- Warm off-white paper (`#F6F3EC`), ink (`#171513`), muted beiges, one quiet **burnt clay accent** (`#B5532A`).
- Cormorant Garamond display serif for headlines, Inter for interface, JetBrains Mono for metadata.
- Editorial bento/masonry over generic SaaS grids.
- Subtle hover states, single accent color, no purple-blue gradients, no scattered AI sparkles.

## Tech stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** with semantic design tokens
- **Radix UI** (Dialog, Tooltip, Popover, Tabs) and shadcn-style primitives
- **Zustand** for global UI / selection / filter state
- **TanStack Query** wired (ready for real adapters)
- **@dnd-kit** for moodboard sortable grid
- **cmdk** for command menu
- **Lucide** icons

All data flows through `src/data/adapters/*` so swapping to a real backend later only changes the data layer.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type check + production bundle
```

## Project structure

```
src/
  app/                 App.tsx, router
  components/
    asset/             AssetCard, AssetMasonry, AssetDetailDrawer, UploadDialog, BulkActionBar
    collection/        CollectionCard, CollectionPicker
    command/           CommandMenu (cmdk)
    layout/            Sidebar, Topbar, AppShell, Logo
    ui/                Button, Input, Badge, Dialog, Drawer, Tooltip, EmptyState, Kbd, Skeleton
  data/
    adapters/          assetAdapter, collectionAdapter, searchAdapter, profileAdapter, projectAdapter
    mock/              assets, collections, profile, projects, tasks
  features/
    archive/           Archive page, filters, toolbar
    collections/       Collections list + detail
    search/            Semantic search + curator response
    profile/           Aesthetic Profile portrait
    projects/          Projects list + Moodboard workspace
    agent/             Agent task queue
    landing/           Landing page
    settings/          Settings + keyboard reference
  stores/              uiStore, selectionStore, filterStore
  hooks/               useKeyboardShortcuts
  lib/                 types, utils
  styles/              globals.css, design tokens
```

## What is mocked

- All AI / curator output (suggested tags, search explanations, profile summaries, brief sections, agent plans and confidence) is hand-crafted mock data, never a real model call.
- All asset thumbnails point to Unsplash with carefully chosen photo IDs that match the editorial aesthetic.
- All data lives in memory — mutations persist within the session but reset on refresh. The adapter layer is shaped to drop in a real backend later.
