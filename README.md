<div align="center">

# dsh-turn-completion-notifications

**[DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/) 回复完成提醒插件**

浏览较早的提问时，在当前页面看到 AI 回复完成的提醒，也可以开启提示音。

[![DSH Plugin](https://img.shields.io/badge/DeepSeek%20Harness-plugin-6128FF)](https://deepseek-harness.github.io/deepseek-harness/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/houyanchao/dsh-turn-completion-notifications?style=social)](https://github.com/houyanchao/dsh-turn-completion-notifications)

**简体中文** | [English](./README.en.md)

</div>

## 如何使用

1. 在 DSH Web 中进行至少两次提问。最新回复生成时，向上滚动到更早的一轮。
2. 每轮回复正常完成时，页面右上角会显示「回复已完成」，约 3.5 秒后淡出。排队发送的提问逐轮判断。手动停止、请求失败、正在阅读本轮回复、接近聊天底部或会话中只有一次提问时会保持安静。
3. 在 **设置 → 通用设置 → AI 回复完成提醒 → 设置** 中分别开关弹窗和提示音。弹窗默认开启，提示音默认关闭。打开任一开关即可预览。

提醒显示在当前会话的网页内，无需授权系统桌面通知。提示音随插件内置，浏览器的自动播放设置可能影响播放。插件跟随 DSH 的界面语言与深浅主题。

## 从 GitHub 安装

安装 DSH CLI 和 pnpm 后运行：

```bash
dsh plugin --profile web add https://github.com/houyanchao/dsh-turn-completion-notifications/archive/refs/heads/main.tar.gz
dsh web
```

## 从源码安装

安装支持 Web 配置的 DeepSeek Harness、pnpm 及 Node.js 24.11+，在本仓库根目录运行：

```bash
npm ci
npm run typecheck
npm run bundle
npm pack
dsh plugin --profile web add ./dsh-turn-completion-notifications-0.1.0.tgz
dsh web
```

若从源码运行 DSH，可在 DSH 仓库根目录使用 `pnpm dsh plugin --profile web add /absolute/path/to/dsh-turn-completion-notifications-0.1.0.tgz`，再运行 `pnpm dsh web`。

## 从 dsh-timeline 迁移

该功能源自 [dsh-timeline](https://github.com/houyanchao/dsh-timeline)，可独立安装。首次使用时，插件读取当前站点上已有的 timeline 弹窗和声音偏好，之后将设置单独保存在浏览器中，同站点的标签页会同步更新。若同时启用两个插件，请在其中一个插件里关闭提醒，以免重复。

## 许可证

[GPL-3.0-or-later](./LICENSE)
