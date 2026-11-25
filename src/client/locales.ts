export const NS = 'dshTurnCompletionNotifications'

export const zh = {
  title: 'AI 回复完成提醒',
  description: '浏览较早的提问时，提醒你最新回复已完成。',
  settings: '设置',
  close: '关闭',
  popup: '弹窗提醒',
  popupHint: 'AI 回复完成后，在页面右上角弹窗提醒',
  sound: '声音提醒',
  soundHint: 'AI 回复完成后，声音提醒',
  completed: '回复已完成',
}

export const en: Record<keyof typeof zh, string> = {
  title: 'Turn completion notifications',
  description: 'Get notified when a reply finishes while you’re reading an earlier turn.',
  settings: 'Settings',
  close: 'Close',
  popup: 'Popup reminder',
  popupHint: 'Show a popup at the top right of the page after an AI reply finishes',
  sound: 'Sound reminder',
  soundHint: 'Play a sound after an AI reply finishes',
  completed: 'Reply completed',
}

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    dshTurnCompletionNotifications: keyof typeof zh
  }
}
