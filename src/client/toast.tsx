import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Bus } from './bus.ts'
import css from './toast.module.css'

interface CompletionToast {
  readonly id: number
  readonly message: string
  readonly leaving: boolean
}

const toasts = new Bus<readonly CompletionToast[]>([])
const timers = new Map<number, ReturnType<typeof setTimeout>>()
let nextId = 0

function removeToast(id: number): void {
  clearTimeout(timers.get(id))
  timers.delete(id)
  toasts.update(list => list.filter(item => item.id !== id))
}

export function showAiCompleteToast(message: string): void {
  if (!message) return
  const active = toasts.get().filter(item => !item.leaving)
  if (active.length >= 3) removeToast(active[0].id)
  const id = ++nextId
  toasts.update(list => [...list, { id, message, leaving: false }])
  timers.set(id, setTimeout(() => {
    toasts.update(list => list.map(item => item.id === id ? { ...item, leaving: true } : item))
    timers.set(id, setTimeout(() => removeToast(id), 320))
  }, 3500))
}

export function clearCompletionToasts(): void {
  for (const timer of timers.values()) clearTimeout(timer)
  timers.clear()
  toasts.set([])
}

function Capsule({ item }: { readonly item: CompletionToast }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])
  return (
    <div role="status" className={`${css.toastAiComplete} ait-ai-complete-toast`} data-visible={visible && !item.leaving}>
      <span className={css.toastIcon}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.75 7.25L5.75 10.25L11.25 3.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{item.message}</span>
    </div>
  )
}

export function ToastHost({ dark }: { readonly dark: boolean }) {
  const list = useSyncExternalStore(toasts.subscribe, () => toasts.get())
  if (!list.length) return null
  return createPortal(
    <div className={css.host} data-theme={dark ? 'dark' : 'light'}>
      {list.map(item => <Capsule key={item.id} item={item} />)}
    </div>,
    document.body,
  )
}
