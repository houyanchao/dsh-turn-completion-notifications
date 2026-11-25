import { useEffect, useRef } from 'react'
import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { ChatSnapshot } from '@deepseek-ai/dsh-client-ui-chat/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import { findConversationDOM } from './conversationDom.ts'
import type { NS } from './locales.ts'
import { isReadingHistory } from './readingPosition.ts'
import { playAiCompleteSound, showAiCompleteToast } from './aiCompleteReminder.ts'
import { clearReminder } from './reminder.tsx'
import { settings } from './settings.ts'

type Props = PropsRuntime<'conversation.session.header.actions'> & PropsLocale<typeof NS>

function questionKeys(chat: ChatSnapshot): string[] {
  return chat.order.filter(key => {
    const node = chat.nodes.get(key)
    return node !== undefined && node.visibility !== 'hidden' && (node.kind === 'user' || node.kind === 'steering')
  })
}

function sameKeys(previous: readonly string[], next: readonly string[]): boolean {
  return previous.length === next.length && previous.every((key, index) => key === next[index])
}

function SessionObserver({ useSession, useChat, t }: Props) {
  const anchor = useRef<HTMLSpanElement>(null)
  const running = useSession(state => state.running)
  const keys = useChat(questionKeys, sameKeys)
  const latest = useRef({ keys, t })
  latest.current = { keys, t }
  const previous = useRef(running)

  useEffect(() => {
    const finished = previous.current && !running
    previous.current = running
    if (!finished) return
    const timer = window.setTimeout(() => {
      const { aiCompleteToastEnabled, aiCompleteSoundEnabled } = settings.get()
      if (!aiCompleteToastEnabled && !aiCompleteSoundEnabled) return
      const scope = findConversationDOM(anchor.current)
      if (scope === null || !isReadingHistory(scope, latest.current.keys)) return
      if (aiCompleteToastEnabled) showAiCompleteToast(latest.current.t('completed'))
      if (aiCompleteSoundEnabled) playAiCompleteSound()
    }, 200)
    return () => { window.clearTimeout(timer) }
  }, [running])

  useEffect(() => clearReminder, [])

  return <span hidden ref={anchor} />
}

export function ConversationObserver(props: Props) {
  return <SessionObserver key={props.sessionId} {...props} />
}
