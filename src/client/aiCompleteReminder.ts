import { DONE_SOUND_DATA_URL } from './doneSound.ts'
export { showAiCompleteToast } from './toast.tsx'

/** 当前播放中的提示音实例（原 this.aiCompleteAudio，destroy 时 pause）。 */
let currentAudio: HTMLAudioElement | null = null

/** 播放完成提示音（原 playAICompleteSound，volume 0.45）。 */
export function playAiCompleteSound(): void {
  try {
    stopAiCompleteSound()
    const audio = new Audio(DONE_SOUND_DATA_URL)
    audio.volume = 0.45
    currentAudio = audio
    void audio.play().catch(() => { /* 自动播放被浏览器拦截时静默 */ })
  } catch { /* 静默 */ }
}

/** 停止提示音（原 timeline destroy 中的 aiCompleteAudio.pause()）。 */
export function stopAiCompleteSound(): void {
  try {
    currentAudio?.pause()
    currentAudio = null
  } catch { /* 静默 */ }
}
