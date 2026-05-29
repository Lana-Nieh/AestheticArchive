import { toast } from '@/components/ui/Toast'
import { translate } from '@/lib/i18n'
import { useLanguage } from '@/stores/languageStore'

// Editorial mock-action helpers. The prototype has many actions whose real
// implementation belongs to a future backend; these emit a quiet toast so
// every interaction still feels alive. Keep strings short and editorial.

const getLang = () => useLanguage.getState().lang
const tt = (key: string, vars?: Record<string, string | number>) =>
  translate(key, getLang(), vars)

export const mockActions = {
  // Generic "AI is doing X" toast — curator-flavoured.
  curatorWorking(verb: string, target?: string) {
    toast.curator(
      target ? `${verb} · ${target}` : verb,
      tt('mock.curator_thinking_desc')
    )
  },

  exported(label: string) {
    toast.mock(`${label} · ${tt('mock.exported')}`, tt('mock.exported_desc'))
  },

  shared(label: string) {
    toast.mock(`${label} · ${tt('mock.shared')}`, tt('mock.shared_desc'))
  },

  copied(label?: string) {
    toast.success(label ?? tt('mock.copied'), undefined)
  },

  notImplemented(label: string) {
    toast.mock(label, tt('mock.not_yet'))
  },
}

export async function copyText(text: string, label?: string) {
  try {
    await navigator.clipboard.writeText(text)
    mockActions.copied(label)
  } catch {
    toast.info(tt('mock.copy_failed'))
  }
}
