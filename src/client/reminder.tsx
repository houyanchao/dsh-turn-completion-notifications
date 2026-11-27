import { useSyncExternalStore } from 'react'
import { stopAiCompleteSound } from './aiCompleteReminder.ts'
import { detectDarkTheme, observeTheme } from './theme.ts'
import { clearCompletionToasts, ToastHost } from './toast.tsx'

export function clearReminder(): void {
  clearCompletionToasts()
  stopAiCompleteSound()
}

export function ReminderHost() {
  const dark = useSyncExternalStore(observeTheme, detectDarkTheme)
  return <ToastHost dark={dark} />
}
