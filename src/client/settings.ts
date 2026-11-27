import { Bus } from './bus.ts'

export interface ReminderSettings {
  readonly aiCompleteToastEnabled: boolean
  readonly aiCompleteSoundEnabled: boolean
}

const key = 'dsh.turn-completion-notifications.settings'
const legacyKey = 'dsh.timeline.settings'
const fields = ['aiCompleteToastEnabled', 'aiCompleteSoundEnabled'] as const
const defaults: ReminderSettings = { aiCompleteToastEnabled: true, aiCompleteSoundEnabled: false }
const unsaved: Partial<Record<keyof ReminderSettings, boolean>> = {}
let unsavedBaseline: ReminderSettings | undefined

function readPreferences(prefix: string, raw: string | null): ReminderSettings {
  let base: Partial<ReminderSettings> | null = null
  if (raw !== null) {
    try { base = JSON.parse(raw) } catch { /* Keep defaults for a damaged snapshot. */ }
  }
  const result = { ...defaults }
  for (const field of fields) {
    const stored = localStorage.getItem(`${prefix}.${field}`)
    if (stored === 'true' || stored === 'false') result[field] = stored === 'true'
    else if (typeof base?.[field] === 'boolean') result[field] = base[field]
  }
  return result
}

function load(): ReminderSettings {
  let raw = localStorage.getItem(key)
  if (raw === null) {
    // Snapshot the first visit even when Timeline has never stored any preferences.
    const baseline = unsavedBaseline ?? readPreferences(legacyKey, localStorage.getItem(legacyKey))
    raw = JSON.stringify(baseline)
    try {
      localStorage.setItem(key, raw)
      unsavedBaseline = undefined
    } catch { unsavedBaseline = baseline }
  } else {
    unsavedBaseline = undefined
  }
  return { ...readPreferences(key, raw), ...unsaved }
}

export const settings = new Bus<ReminderSettings>(defaults)

function reload(fallback = settings.get()): void {
  let next: ReminderSettings
  try { next = load() } catch { next = fallback }
  settings.set(next)
}

export function setSetting(property: keyof ReminderSettings, enabled: boolean): void {
  // Independent keys let two tabs change different switches without replacing each other's writes.
  try {
    localStorage.setItem(`${key}.${property}`, String(enabled))
    delete unsaved[property]
  } catch { unsaved[property] = enabled }
  reload({ ...settings.get(), [property]: enabled })
}

export function bindSettings(): () => void {
  const onStorage = (event: StorageEvent): void => {
    if (event.key !== null && event.key !== key && !fields.some(field => event.key === `${key}.${field}`)) return
    try { if (event.storageArea !== localStorage) return } catch { return }
    reload()
  }
  window.addEventListener('storage', onStorage)
  reload()
  return () => { window.removeEventListener('storage', onStorage) }
}
