import { Bus } from './bus.ts'

export interface ReminderSettings {
  readonly aiCompleteToastEnabled: boolean
  readonly aiCompleteSoundEnabled: boolean
}

const key = 'dsh.turn-completion-notifications.settings'
const legacyKey = 'dsh.timeline.settings'
const defaults: ReminderSettings = { aiCompleteToastEnabled: true, aiCompleteSoundEnabled: false }

function load(): ReminderSettings {
  try {
    const stored = localStorage.getItem(key)
    const raw = stored ?? localStorage.getItem(legacyKey)
    if (raw === null) return defaults
    const data: Partial<ReminderSettings> = JSON.parse(raw)
    const settings = {
      aiCompleteToastEnabled: typeof data?.aiCompleteToastEnabled === 'boolean' ? data.aiCompleteToastEnabled : defaults.aiCompleteToastEnabled,
      aiCompleteSoundEnabled: typeof data?.aiCompleteSoundEnabled === 'boolean' ? data.aiCompleteSoundEnabled : defaults.aiCompleteSoundEnabled,
    }
    if (stored === null) {
      try { localStorage.setItem(key, JSON.stringify(settings)) } catch { /* Preferences remain usable in memory. */ }
    }
    return settings
  } catch {
    return defaults
  }
}

export const settings = new Bus<ReminderSettings>(defaults)

export function setSetting(property: keyof ReminderSettings, enabled: boolean): void {
  const next = { ...settings.get(), [property]: enabled }
  settings.set(next)
  try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* Keep the in-memory preference. */ }
}

export function bindSettings(): () => void {
  settings.set(load())
  const onStorage = (event: StorageEvent): void => {
    if (event.storageArea === localStorage && (event.key === key || event.key === null)) settings.set(load())
  }
  window.addEventListener('storage', onStorage)
  return () => { window.removeEventListener('storage', onStorage) }
}
