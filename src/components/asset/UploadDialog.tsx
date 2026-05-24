import { useCallback, useRef, useState } from 'react'
import { UploadCloud, Sparkles, X, Image as ImageIcon, Link2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { useUi } from '@/stores/uiStore'
import { assetAdapter } from '@/data/adapters/assetAdapter'
import { uid } from '@/lib/utils'
import type { Asset } from '@/lib/types'
import { useT } from '@/lib/i18n'

type Pending = {
  id: string
  name: string
  size: number
  url: string
  aspect: number
}

export function UploadDialog() {
  const open = useUi((s) => s.uploadDialogOpen)
  const setOpen = useUi((s) => s.setUploadDialogOpen)
  const [pending, setPending] = useState<Pending[]>([])
  const [drag, setDrag] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const t = useT()

  const reset = () => setPending([])

  const onFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/'))
    Promise.all(
      arr.map(
        (f) =>
          new Promise<Pending>((resolve) => {
            const url = URL.createObjectURL(f)
            const img = new Image()
            img.onload = () => {
              resolve({
                id: uid('pending'),
                name: f.name,
                size: f.size,
                url,
                aspect: img.width / img.height,
              })
            }
            img.src = url
          })
      )
    ).then((next) => setPending((p) => [...p, ...next]))
  }, [])

  const importNow = () => {
    const now = new Date().toISOString()
    pending.forEach((p) => {
      const asset: Asset = {
        id: uid('a'),
        type: 'image',
        title: p.name.replace(/\.[^/.]+$/, ''),
        thumbnailUrl: p.url,
        previewUrl: p.url,
        sourceLabel: 'Local',
        fileName: p.name,
        mimeType: 'image/*',
        width: 1600,
        height: Math.round(1600 / p.aspect),
        aspectRatio: p.aspect,
        fileSize: p.size,
        colors: [
          { hex: '#D8CDB7', name: 'Bone', temperature: 'warm', percentage: 50 },
          { hex: '#8E7C66', name: 'Mushroom', temperature: 'warm', percentage: 30 },
          { hex: '#3D342B', name: 'Espresso', temperature: 'warm', percentage: 20 },
        ],
        tags: [],
        aiTags: [
          {
            id: uid('tag'),
            label: 'analyzing…',
            source: 'mock_ai',
            category: 'mood',
          },
        ],
        collections: [],
        isFavorite: false,
        importedAt: now,
        createdAt: now,
        updatedAt: now,
      }
      assetAdapter.create(asset)
    })
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>{t('upload.title')}</DialogTitle>
          <DialogDescription>
            {t('upload.desc')}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-5 space-y-5">
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDrag(true)
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDrag(false)
              onFiles(e.dataTransfer.files)
            }}
            onPaste={(e) => {
              const items = Array.from(e.clipboardData?.items ?? [])
              const files = items
                .filter((i) => i.kind === 'file')
                .map((i) => i.getAsFile())
                .filter(Boolean) as File[]
              if (files.length) onFiles(files)
            }}
            className={`relative rounded-md border border-dashed transition-colors ${
              drag ? 'border-accent bg-accent/[0.04]' : 'border-ink/[0.18] bg-paper-50'
            }`}
          >
            <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-paper-200 border border-ink/[0.06] flex items-center justify-center mb-4">
                <UploadCloud className="h-5 w-5 text-ink-600" strokeWidth={1.6} />
              </div>
              <h3 className="serif text-[20px] tracking-editorial text-ink">
                {t('upload.drop')}
              </h3>
              <p className="text-[13px] text-ink-600 mt-1 max-w-sm">
                {t('upload.or_paste')}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="primary" size="sm" onClick={() => fileRef.current?.click()}>
                  <ImageIcon className="h-3.5 w-3.5" />
                  {t('upload.choose')}
                </Button>
                <Button variant="secondary" size="sm">
                  <Link2 className="h-3.5 w-3.5" />
                  {t('upload.paste_url')}
                </Button>
              </div>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && onFiles(e.target.files)}
              />
            </div>
          </div>

          {pending.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="eyebrow">{t('upload.queued', { n: pending.length })}</span>
                <button onClick={reset} className="text-[11.5px] text-ink-600 hover:text-ink">
                  {t('upload.clear')}
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-[260px] overflow-y-auto p-1 -m-1">
                {pending.map((p) => (
                  <div key={p.id} className="relative group aspect-square rounded-sm overflow-hidden bg-paper-200">
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPending((arr) => arr.filter((x) => x.id !== p.id))}
                      className="absolute top-1 right-1 h-5 w-5 inline-flex items-center justify-center bg-paper/90 border border-ink/[0.1] rounded-xs text-ink-600 opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 px-1.5 py-1 bg-gradient-to-t from-ink/80 to-transparent text-paper text-[10px] truncate">
                      {p.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-md border border-ink/[0.08] bg-paper-50 p-3 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-accent mt-0.5" strokeWidth={2} />
            <div className="flex-1">
              <p className="text-[12.5px] text-ink-800 leading-snug">
                {t('upload.on_import')}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-ink/[0.06] flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            {t('upload.cancel')}
          </Button>
          <Button variant="primary" size="sm" onClick={importNow} disabled={!pending.length}>
            {pending.length ? t('upload.import_n', { n: pending.length }) : t('upload.import')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
