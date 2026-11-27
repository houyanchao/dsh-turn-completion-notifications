<div align="center">

# dsh-turn-completion-notifications

**Turn completion notifications for [DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/)**

When a reply finishes while you’re reading an earlier turn, the plugin shows an in-page notification and plays a sound by default.

[![DSH Plugin](https://img.shields.io/badge/DeepSeek%20Harness-plugin-6128FF)](https://deepseek-harness.github.io/deepseek-harness/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/houyanchao/dsh-turn-completion-notifications?style=social)](https://github.com/houyanchao/dsh-turn-completion-notifications)

[简体中文](./README.md) | **English**

</div>

## Usage

1. In a DSH Web conversation with at least two questions, scroll to an earlier turn while the latest reply is being generated.
2. When a reply finishes successfully, a **Reply completed** pill appears at the upper right and fades after about 3.5 seconds. Each queued turn is checked separately. Reminders stay quiet when you stop a reply, a request fails, you are reading that reply or near the bottom of the chat, or the conversation has only one question.
3. Open **Settings → General → Turn completion notifications → Settings** to configure the popup and sound separately. Both options are on by default if you have no saved preferences. Enabling either option previews it immediately.

The reminder appears inside the current conversation page and requires no desktop notification permission. The sound ships with the plugin and follows your browser’s autoplay policy. The interface follows the DSH language and theme.

## Install from GitHub

With the DSH CLI and pnpm on your PATH, run the following commands.

```bash
dsh plugin --profile web add https://github.com/houyanchao/dsh-turn-completion-notifications/archive/refs/heads/main.tar.gz
dsh web
```

## Install from source

With DeepSeek Harness, pnpm and Node.js 24.11+ installed, run these commands in the plugin checkout:

```bash
npm ci
npm run typecheck
npm run bundle
npm pack
dsh plugin --profile web add ./dsh-turn-completion-notifications-0.1.0.tgz
dsh web
```

When running DSH from its source checkout, run `pnpm dsh plugin --profile web add /absolute/path/to/dsh-turn-completion-notifications-0.1.0.tgz` there, then run `pnpm dsh web`.

## Moving from dsh-timeline

This standalone plugin brings over the completion reminder from [dsh-timeline](https://github.com/houyanchao/dsh-timeline). On first use it imports the popup and sound preferences stored by timeline on the same site. It then saves its own settings in your browser and synchronizes them across tabs on that site. While dsh-timeline is running, this plugin pauses and Timeline manages reminders. Disabling or uninstalling Timeline automatically restores this plugin with its saved popup and sound preferences.

## License

[GPL-3.0-or-later](./LICENSE)
