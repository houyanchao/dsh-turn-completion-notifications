const HEADER = '[data-slot="conversation.session.header"]'
const FLOW = '[data-chat-flow]'
const SCROLL = '[data-conversation-scroll]'
const HIDDEN = '[hidden], [inert], [aria-hidden="true"]'

export interface ConversationDOM {
  readonly flow: HTMLElement
  readonly scroll: HTMLElement
}

function conversationRoot(anchor: Element | null): HTMLElement | null {
  if (!anchor?.isConnected) return null
  const header = anchor.closest<HTMLElement>(HEADER)
  // Newer hosts nest the strict session header inside the main panel's header slot.
  return header?.closest<HTMLElement>('[data-phase]') ?? header?.parentElement ?? null
}

export function findMessageElement(flow: HTMLElement, key: string): HTMLElement | null {
  const rows = flow.querySelectorAll<HTMLElement>(`[data-chat-flow-key="${CSS.escape(key)}"]`)
  for (const element of rows) {
    if (element.isConnected && element.closest(HIDDEN) === null && element.getClientRects().length > 0) return element
  }
  return null
}

export function findConversationDOM(anchor: Element | null): ConversationDOM | null {
  const root = conversationRoot(anchor)
  if (root === null) return null
  for (const flow of root.querySelectorAll<HTMLElement>(FLOW)) {
    const scroll = flow.closest<HTMLElement>(SCROLL)
    if (scroll === null || !root.contains(scroll) || flow.closest(HIDDEN) !== null || flow.getClientRects().length === 0) continue
    return { flow, scroll }
  }
  return null
}
