import { useEffect, useRef, useSyncExternalStore } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import { useTurnCompletions, type TurnCompletionSources } from './turnCompletions.ts'
import type { NS } from './locales.ts'
import { playAiCompleteSound, showAiCompleteToast } from './aiCompleteReminder.ts'
import { clearReminder } from './reminder.tsx'
import { settings } from './settings.ts'

type Props = PropsRuntime<'conversation.session.header.actions'> & PropsLocale<typeof NS> & TurnCompletionSources

function SessionObserver({ completionEvents, completionChat, t }: Props) {
  const anchor = useRef<HTMLSpanElement>(null)
  const enabled = useSyncExternalStore(settings.subscribe, () => {
    const current = settings.get()
    return current.aiCompleteToastEnabled || current.aiCompleteSoundEnabled
  })
  useTurnCompletions({ completionEvents, completionChat }, enabled, anchor, () => {
    const { aiCompleteToastEnabled, aiCompleteSoundEnabled } = settings.get()
    if (!aiCompleteToastEnabled && !aiCompleteSoundEnabled) return
    if (aiCompleteToastEnabled) showAiCompleteToast(t('completed'))
    if (aiCompleteSoundEnabled) playAiCompleteSound()
  })

  useEffect(() => clearReminder, [])

  return <span hidden ref={anchor} />
}

export function ConversationObserver(props: Props) {
  return <SessionObserver key={props.sessionId} {...props} />
}
