import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { NS } from './locales.ts'
import { playAiCompleteSound, showAiCompleteToast } from './aiCompleteReminder.ts'
import { setSetting, settings } from './settings.ts'
import { containDialogFocus } from './dialogFocus.ts'
import css from './settings.module.css'

type Props = PropsLocale<typeof NS>

export function ReminderSettings({ t }: Props) {
  const [open, setOpen] = useState(false)
  const preferences = useSyncExternalStore(settings.subscribe, () => settings.get())
  const dialog = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open && dialog.current) return containDialogFocus(dialog.current, trigger.current, () => setOpen(false))
  }, [open])

  return (
    <div className={css.settingsRow}>
      <div className={css.reminderInfo}>
        <div className={css.settingTitle}>{t('title')}</div>
        <div className={css.settingHint}>{t('description')}</div>
      </div>
      <button type="button" className={css.manage} ref={trigger} onClick={() => { setOpen(true) }}>{t('settings')}</button>
      {open && createPortal(
        <div className={css.subModalOverlay} onClick={event => {
          if (event.target === event.currentTarget) setOpen(false)
        }}>
          <div ref={dialog} role="dialog" aria-modal="true" aria-label={t('title')} className={css.subModal}>
          <div className={css.subModalHeader}>
            <span>{t('title')}</span>
            <button type="button" aria-label={t('close')} className={css.subModalClose} onClick={() => { setOpen(false) }}>✕</button>
          </div>
          <div className={css.subModalBody}>
            <label className={css.reminderItem}>
              <span className={css.reminderInfo}>
                <span className={css.reminderLabel}>{t('popup')}</span>
                <span className={css.reminderHint}>{t('popupHint')}</span>
              </span>
              <span className={css.toggle}>
                <input type="checkbox" aria-label={t('popup')} checked={preferences.aiCompleteToastEnabled} onChange={event => {
                  const enabled = event.currentTarget.checked
                  setSetting('aiCompleteToastEnabled', enabled)
                  if (enabled) showAiCompleteToast(t('completed'))
                }} />
                <span className={css.toggleSlider} />
              </span>
            </label>
            <label className={css.reminderItem}>
              <span className={css.reminderInfo}>
                <span className={css.reminderLabel}>{t('sound')}</span>
                <span className={css.reminderHint}>{t('soundHint')}</span>
              </span>
              <span className={css.toggle}>
                <input type="checkbox" aria-label={t('sound')} checked={preferences.aiCompleteSoundEnabled} onChange={event => {
                  const enabled = event.currentTarget.checked
                  setSetting('aiCompleteSoundEnabled', enabled)
                  if (enabled) playAiCompleteSound()
                }} />
                <span className={css.toggleSlider} />
              </span>
            </label>
          </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
