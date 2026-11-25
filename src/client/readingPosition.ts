import { findMessageElement, type ConversationDOM } from './conversationDom.ts'

/** Timeline's activation line measured from the top of the conversation scrollport. */
const ACTIVATE_AHEAD = 120

function computeActiveIndex(offsetTops: readonly number[], scrollTop: number): number {
  if (offsetTops.length === 0) return -1
  let active = 0
  for (let i = 0; i < offsetTops.length; i++) {
    if ((offsetTops[i] - ACTIVATE_AHEAD) <= scrollTop) {
      active = i
    } else {
      break
    }
  }
  return active
}

export function isReadingHistory(scope: ConversationDOM, questionKeys: readonly string[]): boolean {
  if (questionKeys.length <= 1) return false
  const { flow, scroll } = scope
  // Timeline pads the end of the conversation to bring a short final turn up
  // to the activation line. This independent plugin leaves that layout to DSH.
  if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 1) return false
  const containerTop = scroll.getBoundingClientRect().top
  const offsets: number[] = []
  let hasMountedMessage = false
  for (const key of questionKeys) {
    const el = findMessageElement(flow, key)
    if (el === null) {
      offsets.push(offsets.length > 0 ? offsets[offsets.length - 1] : 0)
      continue
    }
    hasMountedMessage = true
    offsets.push(el.getBoundingClientRect().top - containerTop + scroll.scrollTop)
  }
  const activeIndex = computeActiveIndex(hasMountedMessage ? offsets : [], scroll.scrollTop)
  return activeIndex < questionKeys.length - 1
}
