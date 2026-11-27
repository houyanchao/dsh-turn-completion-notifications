<div align="center">

# dsh-turn-completion-notifications

**[DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/) 回复完成提醒插件**

回看历史对话时，用弹窗或提示音获知新回复已完成。

[![DSH Plugin](https://img.shields.io/badge/DeepSeek%20Harness-plugin-6128FF)](https://deepseek-harness.github.io/deepseek-harness/)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/houyanchao/dsh-turn-completion-notifications/pulls)
[![GitHub stars](https://img.shields.io/github/stars/houyanchao/dsh-turn-completion-notifications?style=social)](https://github.com/houyanchao/dsh-turn-completion-notifications)

**简体中文** | [English](./README.en.md)

</div>

## 📖 dsh-turn-completion-notifications 是什么？

在 DSH Web 里追问后，你可以趁 AI 生成回复时向上翻，继续读上一轮的内容。如果新回复在屏幕下方完成，插件会在当前会话页面提醒你，省去反复滚到底部查看进度的操作。

## ✨ 功能特性

- 🔔 **页面内弹窗** — 右上角显示「回复已完成」，约 3.5 秒后淡出。无需授权系统桌面通知。
- 🔊 **可选提示音** — 使用内置提示音。弹窗和声音可以分别开关，也可以同时启用。提示音播放受浏览器自动播放设置影响。
- 📚 **按阅读位置提醒** — 仅在回看较早的提问、且本轮回复正常完成时触发。正在阅读本轮回复、接近会话底部、手动停止或请求失败时都不会提醒。排队发送的提问逐轮判断。
- 🎨 **跟随宿主界面** — 提醒和设置支持中英文，跟随 DSH 的深浅主题。

## ⚙️ 使用与设置

在同一会话中发送第二个或后续提问，趁新回复生成时向上滚动到上一轮，停留在那里即可收到完成提醒。

打开 **设置 → 通用设置 → AI 回复完成提醒 → 设置**，可以分别调整「弹窗提醒」和「声音提醒」。没有已保存的偏好时，两项默认开启。打开任一开关即可预览对应效果。

## 📦 安装

### 安装方式 1（客户端）

在 [DeepSeek Harness](https://www.deepseek.com/harness/) 客户端打开「插件」→「添加插件」，粘贴下面的仓库地址，点击「安装」。

```text
https://github.com/houyanchao/dsh-turn-completion-notifications
```

![DeepSeek Harness 客户端中的「插件」页面、「添加插件」按钮和输入框](./docs/install-client.png)

### 安装方式 2（通过命令行从 GitHub 安装）

```bash
# 安装 dsh-turn-completion-notifications 插件
dsh plugin --profile web add https://github.com/houyanchao/dsh-turn-completion-notifications/archive/refs/heads/main.tar.gz
```

## 🔄 从 dsh-timeline 迁移

此功能也包含在 [dsh-timeline](https://github.com/houyanchao/dsh-timeline) 中。Timeline 运行期间，由它负责提醒，独立插件自动暂停。禁用或卸载 Timeline 后，独立插件自动接手。

独立插件首次启用时会读取 Timeline 在当前站点保存的弹窗和声音偏好。之后的更改由独立插件保存在浏览器中，并同步到同一站点打开的其他标签页。

## ⭐ 支持一下

如果 dsh-turn-completion-notifications 好用，欢迎给个🌟，帮助更多人发现它！

## 📄 许可证

本项目基于 [GPL-3.0-or-later](./LICENSE) 协议开源。
