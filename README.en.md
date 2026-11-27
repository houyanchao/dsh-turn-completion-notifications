<div align="center">

# dsh-turn-completion-notifications

**Turn completion notifications for [DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/)**

Get a popup or a sound when a reply finishes while you’re reading an earlier turn.

[![DSH Plugin](https://img.shields.io/badge/DeepSeek%20Harness-plugin-6128FF)](https://deepseek-harness.github.io/deepseek-harness/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/houyanchao/dsh-turn-completion-notifications/pulls)
[![GitHub stars](https://img.shields.io/github/stars/houyanchao/dsh-turn-completion-notifications?style=social)](https://github.com/houyanchao/dsh-turn-completion-notifications)

[简体中文](./README.md) | **English**

</div>

## 📖 What is dsh-turn-completion-notifications?

After asking a follow-up question in DSH Web, you can scroll up to reread an earlier answer while the next one is being written. When the new reply finishes below your reading position, the plugin lets you know right in the conversation, so you can keep your place.

## ✨ Features

- 🔔 **In-page popup** — “Reply completed” appears in the upper-right corner and fades after about 3.5 seconds. It requires no desktop notification permission.
- 🔊 **Optional sound** — Choose the built-in sound, the popup, or both. Sound playback follows your browser’s autoplay settings.
- 📚 **Reminders while reading earlier turns** — A reminder appears only when a reply completes successfully while you’re reading an earlier turn. The plugin stays quiet if you’re already reading the reply, you’re near the bottom of the chat, you stop generation, or the request fails. It checks each queued turn separately.
- 🎨 **Language and theme** — The reminder and settings follow the English or Chinese interface and the light or dark theme in DSH.

## ⚙️ Usage and settings

Ask a second or later question in the same conversation. While the reply is being generated, scroll up to the previous turn and stay there to receive a completion reminder.

Open **Settings → General → Turn completion notifications → Settings** to adjust **Popup reminder** and **Sound reminder** independently. Both are on by default if you have no saved preferences. Turning either option on gives you a preview.

## 📦 Installation

With the DSH CLI and pnpm installed, add the plugin and launch the web interface.

```bash
dsh plugin --profile web add https://github.com/houyanchao/dsh-turn-completion-notifications/archive/refs/heads/main.tar.gz
dsh web
```

> [!TIP]
> If you run DSH from source, run the commands above from the **DSH repository root** and replace the leading `dsh` with `pnpm dsh`.

## 🔄 Moving from dsh-timeline

[dsh-timeline](https://github.com/houyanchao/dsh-timeline) also includes completion reminders. While Timeline is running, it handles reminders and the standalone plugin pauses. The standalone plugin takes over automatically when you disable or uninstall Timeline.

The first time the standalone plugin runs, it imports any popup and sound preferences Timeline saved on the same site. It then saves its own preferences in your browser and syncs changes across tabs on that site.

## ⭐ Support

If the plugin helps you, give it a star on [GitHub](https://github.com/houyanchao/dsh-turn-completion-notifications) or share it with another DSH user.

## 📄 License

This project is licensed under [GPL-3.0-or-later](./LICENSE).
