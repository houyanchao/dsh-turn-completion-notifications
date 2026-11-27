import type { Context } from '@deepseek-ai/cordis'
import { whenTimelineInactive } from './whenTimelineInactive.ts'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import { ConversationObserver } from './ConversationObserver.tsx'
import { ReminderSettings } from './ReminderSettings.tsx'
import { NS, en, zh } from './locales.ts'
import { bindSettings } from './settings.ts'
import { bindTheme } from './theme.ts'
import { clearReminder, ReminderHost } from './reminder.tsx'

const id = 'dsh-turn-completion-notifications'
export const inject = ['slots', 'locale', 'theme', 'sessions', 'uiConversation']

export function apply(ctx: Context): void {
  whenTimelineInactive(ctx, { name: 'dsh-turn-completion-notifications', inject, apply: activate })
}

function activate(ctx: Context): void {
  bindTheme(ctx)
  ctx.effect(bindSettings, `${id}: preferences`)
  ctx.effect(() => () => { clearReminder() }, `${id}: dismiss notification`)
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), `${id}: dictionaries`)
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
    name: 'conversation.session.header.actions', id, order: 42, locale: NS,
    inject: sessionId => ({
      completionEvents: ctx.sessions.binding(sessionId)?.eventSource,
      completionChat: ctx.uiConversation.binding(sessionId).target('chat'),
    }),
  }, ConversationObserver))
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name: 'shell.overlay', id, locale: NS,
  }, ReminderHost))
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item', id, order: 70, locale: NS,
  }, ReminderSettings))
}
