import type { Context, Fiber, Plugin } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'

/** Run the standalone feature only while Timeline's client overlay is absent. */
export function whenTimelineInactive(ctx: Context, feature: Plugin.Object): void {
  ctx.effect(() => {
    let active: Fiber | undefined
    let closed = false
    let pending = Promise.resolve()

    const reconcile = async (): Promise<void> => {
      if (closed || ctx.fiber.uid === null) return
      // Wait for the host to declare the slot before interpreting an empty list.
      const standalone = ctx.slots.spec('shell.overlay') !== undefined
        && !ctx.slots.entries('shell.overlay').some(entry => entry.options.id === 'dsh-timeline-ui')
      if (standalone) {
        active ??= ctx.plugin(feature)
      } else if (active) {
        await active.dispose()
        active = undefined
      }
    }

    // Slot updates also include our own overlay. Re-read the latest state after
    // any in-flight teardown so rapid toggles cannot register the feature twice.
    const refresh = (): void => {
      pending = pending.then(reconcile).catch(error => ctx.logger.error(error))
    }
    const unsubscribe = ctx.slots.subscribe('shell.overlay', refresh)
    refresh()
    return () => {
      closed = true
      unsubscribe()
      // Cordis owns the active child and disposes it with the parent.
      return pending
    }
  }, 'watch Timeline client overlay')
}
