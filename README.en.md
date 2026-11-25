<div align="center">

# dsh-turn-completion-notifications

**Turn completion notifications for [DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/)**

See when the current reply is ready while you read an earlier turn. Enable a sound if you prefer an audible cue.

[![DSH Plugin](https://img.shields.io/badge/DeepSeek%20Harness-plugin-6128FF)](https://deepseek-harness.github.io/deepseek-harness/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/houyanchao/dsh-turn-completion-notifications?style=social)](https://github.com/houyanchao/dsh-turn-completion-notifications)

[简体中文](./README.md) | **English**

</div>

## Usage

1. In a DSH Web conversation with at least two questions, scroll to an earlier turn while the latest reply is being generated.
2. When the turn finishes, a **Reply completed** pill appears at the upper right and fades after about 3.5 seconds. Reading the latest turn, reaching the bottom of the chat, or chatting in a single-turn conversation keeps reminders quiet.
3. Open **Settings → General → Turn completion notifications → Settings** to configure the popup and sound separately. The popup is enabled by default. Sound is off by default. Enabling either option previews it immediately.

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

This standalone plugin brings over the completion reminder from [dsh-timeline](https://github.com/houyanchao/dsh-timeline). On first use it imports the popup and sound preferences stored by timeline on the same site. It then saves its own settings in your browser and synchronizes them across tabs on that site. If both plugins are enabled, turn off reminders in one to avoid duplicate alerts.

## License

[GPL-3.0-or-later](./LICENSE)
