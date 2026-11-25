import { useSyncExternalStore } from 'react'
import { removeAiCompleteAnchor, stopAiCompleteSound } from './aiCompleteReminder.ts'
import { detectDarkTheme, observeTheme } from './theme.ts'
import { toast, ToastHost } from './toast.tsx'

export function clearReminder(): void {
  toast.forceHideAll()
  removeAiCompleteAnchor()
  stopAiCompleteSound()
}

export function ReminderHost() {
  const dark = useSyncExternalStore(observeTheme, detectDarkTheme)
  return <ToastHost dark={dark} />
}
