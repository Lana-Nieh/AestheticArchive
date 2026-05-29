import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { TooltipProvider } from '@/components/ui/Tooltip'
import { Toaster } from '@/components/ui/Toast'
import { useLang } from '@/lib/i18n'
import { LandingPage } from '@/features/landing/LandingPage'
import { ArchivePage } from '@/features/archive/ArchivePage'
import { CollectionsPage } from '@/features/collections/CollectionsPage'
import { CollectionDetailPage } from '@/features/collections/CollectionDetailPage'
import { SearchPage } from '@/features/search/SearchPage'
import { ProfilePage } from '@/features/profile/ProfilePage'
import { ProjectsPage } from '@/features/projects/ProjectsPage'
import { MoodboardWorkspace } from '@/features/projects/MoodboardWorkspace'
import { AgentPage } from '@/features/agent/AgentPage'
import { SettingsPage } from '@/features/settings/SettingsPage'
import { AssetDetailDrawer } from '@/components/asset/AssetDetailDrawer'
import { UploadDialog } from '@/components/asset/UploadDialog'
import { CollectionPicker } from '@/components/collection/CollectionPicker'
import { BulkActionBar } from '@/components/asset/BulkActionBar'
import { CommandMenu } from '@/components/command/CommandMenu'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

export default function App() {
  useKeyboardShortcuts()
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const lang = useLang()

  useEffect(() => {
    document.title =
      lang === 'zh'
        ? '审美档案 — 你私人的审美记忆系统'
        : 'Aesthetic Archive — Your personal taste memory'
  }, [lang])

  return (
    <TooltipProvider>
      {isLanding ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      ) : (
        <AppShell>
          <Routes>
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:collectionId" element={<CollectionDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<MoodboardWorkspace />} />
            <Route path="/projects/:projectId/moodboard" element={<MoodboardWorkspace />} />
            <Route path="/agent" element={<AgentPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/archive" replace />} />
          </Routes>
        </AppShell>
      )}

      {/* Global overlays */}
      <AssetDetailDrawer />
      <UploadDialog />
      <CollectionPicker />
      <BulkActionBar />
      <CommandMenu />
      <Toaster />
    </TooltipProvider>
  )
}
