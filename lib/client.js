window.__ModuleLoader__.load({
	id: "dsh-turn-completion-notifications",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_dom = require("react-dom");
		let react_jsx_runtime = require("react/jsx-runtime");
		// src/client/conversationDom.ts
		const HEADER = "[data-slot=\"conversation.session.header\"]";
		const FLOW = "[data-chat-flow]";
		const SCROLL = "[data-conversation-scroll]";
		const HIDDEN = "[hidden], [inert], [aria-hidden=\"true\"]";
		function conversationRoot(anchor) {
			if (!anchor?.isConnected) return null;
			const header = anchor.closest(HEADER);
			return header?.closest("[data-phase]") ?? header?.parentElement ?? null;
		}
		function findMessageElement(flow, key) {
			const rows = flow.querySelectorAll(`[data-chat-flow-key="${CSS.escape(key)}"]`);
			for (const element of rows) if (element.isConnected && element.closest(HIDDEN) === null && element.getClientRects().length > 0) return element;
			return null;
		}
		function findConversationDOM(anchor) {
			const root = conversationRoot(anchor);
			if (root === null) return null;
			for (const flow of root.querySelectorAll(FLOW)) {
				const scroll = flow.closest(SCROLL);
				if (scroll === null || !root.contains(scroll) || flow.closest(HIDDEN) !== null || flow.getClientRects().length === 0) continue;
				return {
					flow,
					scroll
				};
			}
			return null;
		}
		// src/client/readingPosition.ts
		/** Timeline's activation line measured from the top of the conversation scrollport. */
		const ACTIVATE_AHEAD = 120;
		function computeActiveIndex(offsetTops, scrollTop) {
			if (offsetTops.length === 0) return -1;
			let active = 0;
			for (let i = 0; i < offsetTops.length; i++) if (offsetTops[i] - ACTIVATE_AHEAD <= scrollTop) active = i;
			else break;
			return active;
		}
		function isReadingHistory(scope, questionKeys) {
			if (questionKeys.length <= 1) return false;
			const { flow, scroll } = scope;
			if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 1) return false;
			const containerTop = scroll.getBoundingClientRect().top;
			const offsets = [];
			let hasMountedMessage = false;
			for (const key of questionKeys) {
				const el = findMessageElement(flow, key);
				if (el === null) {
					offsets.push(offsets.length > 0 ? offsets[offsets.length - 1] : 0);
					continue;
				}
				hasMountedMessage = true;
				offsets.push(el.getBoundingClientRect().top - containerTop + scroll.scrollTop);
			}
			return computeActiveIndex(hasMountedMessage ? offsets : [], scroll.scrollTop) < questionKeys.length - 1;
		}
		// src/client/bus.ts
		/**
		* 微型外部 store：命令式 API（toast.show / dropdown.show 等）与 React
		* 宿主组件（useSyncExternalStore）之间的桥。原扩展的各 GlobalXxxManager
		* 是 window 单例 + 直接操作 DOM；DSH 下改为模块单例 + React 渲染。
		*/
		/** 可订阅的值容器。 */
		var Bus = class {
			value;
			listeners = /* @__PURE__ */ new Set();
			constructor(initial) {
				this.value = initial;
			}
			get() {
				return this.value;
			}
			set(next) {
				this.value = next;
				for (const fn of this.listeners) fn();
			}
			update(fn) {
				this.set(fn(this.value));
			}
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
		};
		// \0dsh-css:src/client/toast.module.css?e24dd9203b.mjs
		const css$1 = ".NBajEG_host{pointer-events:none;z-index:2147483647;width:0;height:0;position:fixed;top:0;left:0;overflow:visible}.NBajEG_toast{z-index:2147483647;pointer-events:none;white-space:nowrap;align-items:center;gap:8px;max-width:400px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;display:flex;position:fixed}.NBajEG_toastMultiline{box-sizing:border-box;white-space:pre-line;overflow-wrap:anywhere;max-width:min(400px,100vw - 16px)}.NBajEG_toastMultilineCentered{width:max-content;margin-inline:auto;inset-inline:0}.NBajEG_toastDefaultVisual{opacity:0;border-radius:12px;padding:10px 16px;font-size:13px;font-weight:500;transition:opacity .15s,transform .15s;transform:translateY(-10px);box-shadow:0 4px 14px #00000026,0 1px 2px #0000000f}.NBajEG_toastVisible{opacity:1!important}.NBajEG_toastDefaultVisual.NBajEG_toastVisible{transform:translateY(0)!important}.NBajEG_toastIcon{font-size:16px}.NBajEG_toastAiComplete{corner-shape:round;letter-spacing:-.01em;-webkit-backdrop-filter:blur(16px)saturate(180%);color:#1f2937;opacity:0;background:#ffffffe6;border:1px solid #0f172a14;border-radius:999px;gap:10px;padding:7px 14px 7px 7px;font-size:13px;font-weight:500;transition:opacity .28s cubic-bezier(.16,1,.3,1),transform .28s cubic-bezier(.16,1,.3,1);transform:translate(14px)scale(.96);box-shadow:0 1px 2px #0f172a0a,0 8px 24px #0f172a1a,inset 0 1px #ffffffa6}.NBajEG_toastAiComplete .NBajEG_toastIcon{corner-shape:round;color:#fff;background:linear-gradient(145deg,#22c55e 0%,#15803d 100%);border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;width:26px;height:26px;font-size:13px;display:inline-flex;box-shadow:0 2px 8px #15803d57}.NBajEG_toastAiComplete .NBajEG_toastIcon svg{display:block}.NBajEG_toastAiComplete.NBajEG_toastVisible{opacity:1!important;transform:translate(0)scale(1)!important}.NBajEG_host[data-theme=dark] .NBajEG_toastAiComplete{color:#f5f5f7;background:#1c1c1ee0;border-color:#ffffff1a;box-shadow:0 1px 2px #0000003d,0 10px 28px #0000005c,inset 0 1px #ffffff0f}.NBajEG_host[data-theme=dark] .NBajEG_toastAiComplete .NBajEG_toastIcon{box-shadow:0 2px 10px #15803d4d}";
		const tagId$1 = "dsh-turn-completion-notifications/toast.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-turn-completion-notifications";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var toast_module_css_e24dd9203b_default = {
			"toastVisible": "NBajEG_toastVisible",
			"toast": "NBajEG_toast",
			"toastIcon": "NBajEG_toastIcon",
			"toastAiComplete": "NBajEG_toastAiComplete",
			"host": "NBajEG_host",
			"toastMultilineCentered": "NBajEG_toastMultilineCentered",
			"toastMultiline": "NBajEG_toastMultiline",
			"toastDefaultVisual": "NBajEG_toastDefaultVisual"
		};
		// src/client/toast.tsx
		/**
		* 全局 Toast：移植原扩展 GlobalToastManager。
		* - 四种类型（success/error/info/warning），配色/图标/时长逐参数保留；
		* - 队列管理：最多同时 3 个，居中 toast 自上而下堆叠（起始 60px、间距 10px）；
		* - 相对定位：传 target 时贴目标元素 top/bottom/left/right + gap，视口边界 8px 修正；
		* - className/iconType/useClassStyles 支持 AI 完成提醒的胶囊样式。
		* 命令式 API（toast.success 等）+ React 宿主（ToastHost，portal 到 body）。
		*/
		/** 原版 config（逐参数移植）。 */
		const CONFIG = {
			maxVisible: 3,
			stackGap: 10,
			centerGap: 60,
			types: {
				success: {
					color: {
						light: {
							backgroundColor: "#ffffff",
							textColor: "#1f2937",
							borderColor: "#e5e7eb"
						},
						dark: {
							backgroundColor: "#ffffff",
							textColor: "#1f2937",
							borderColor: "#e5e7eb"
						}
					},
					icon: "✓",
					duration: 1e3,
					position: "top",
					gap: 10
				},
				error: {
					color: {
						light: {
							backgroundColor: "var(--dsw-alias-tooltip-bg)",
							textColor: "#ffffff",
							borderColor: "var(--dsw-alias-tooltip-bg)"
						},
						dark: {
							backgroundColor: "#ffffff",
							textColor: "#1f2937",
							borderColor: "#e5e7eb"
						}
					},
					icon: "⚠",
					duration: 1500,
					position: "top",
					gap: 10
				},
				info: {
					color: {
						light: {
							backgroundColor: "#ffffff",
							textColor: "#1f2937",
							borderColor: "#e5e7eb"
						},
						dark: {
							backgroundColor: "#ffffff",
							textColor: "#1f2937",
							borderColor: "#e5e7eb"
						}
					},
					icon: "✓",
					duration: 2e3,
					position: "top",
					gap: 10
				},
				warning: {
					color: {
						light: {
							backgroundColor: "var(--dsw-alias-tooltip-bg)",
							textColor: "#ffffff",
							borderColor: "var(--dsw-alias-tooltip-bg)"
						},
						dark: {
							backgroundColor: "#ffffff",
							textColor: "#1f2937",
							borderColor: "#e5e7eb"
						}
					},
					icon: "⚡",
					duration: 2e3,
					position: "top",
					gap: 10
				}
			}
		};
		let nextId = 1;
		const bus = new Bus([]);
		const timers = /* @__PURE__ */ new Map();
		function remove(id, immediate) {
			const timer = timers.get(id);
			if (timer !== void 0) {
				clearTimeout(timer);
				timers.delete(id);
			}
			const current = bus.get().find((t) => t.id === id);
			if (current === void 0) return;
			if (immediate) {
				bus.update((list) => list.filter((t) => t.id !== id));
				return;
			}
			bus.update((list) => list.map((t) => t.id === id ? {
				...t,
				leaving: true
			} : t));
			const cleanupDelay = current.config.useClassStyles === true ? 320 : 200;
			timers.set(id, setTimeout(() => {
				timers.delete(id);
				bus.update((list) => list.filter((t) => t.id !== id));
			}, cleanupDelay));
		}
		function show(type, message, options = {}) {
			if (message === "") return;
			const config = {
				...CONFIG.types[type],
				...options
			};
			const id = nextId++;
			bus.update((list) => {
				let next = [...list, {
					id,
					message,
					config,
					leaving: false
				}];
				const active = next.filter((t) => !t.leaving);
				if (active.length > CONFIG.maxVisible) {
					const oldest = active[0];
					next = next.filter((t) => t.id !== oldest.id);
					const timer = timers.get(oldest.id);
					if (timer !== void 0) {
						clearTimeout(timer);
						timers.delete(oldest.id);
					}
				}
				return next;
			});
			timers.set(id, setTimeout(() => {
				remove(id, false);
			}, config.duration));
		}
		/** 命令式 Toast API（等价原 window.globalToastManager）。 */
		const toast = {
			show,
			success: (message, target = null, options = {}) => {
				show("success", message, {
					target,
					...options
				});
			},
			error: (message, target = null, options = {}) => {
				show("error", message, {
					target,
					...options
				});
			},
			info: (message, target = null, options = {}) => {
				show("info", message, {
					target,
					...options
				});
			},
			warning: (message, target = null, options = {}) => {
				show("warning", message, {
					target,
					...options
				});
			},
			forceHideAll: () => {
				for (const timer of timers.values()) clearTimeout(timer);
				timers.clear();
				bus.set([]);
			}
		};
		/** check 图标（原 _createIconElement）。 */
		function CheckIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "14",
				height: "14",
				viewBox: "0 0 14 14",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M2.75 7.25L5.75 10.25L11.25 3.75",
					stroke: "currentColor",
					strokeWidth: "1.75",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			});
		}
		/**
		* Toast 宿主：渲染队列并按原版算法定位。
		* portal 到 body，且仅在有 toast 时挂载，保证插在收藏弹窗之后、不被挡住。
		* @param props - dark 为宿主主题（决定 light/dark 配色取值）。
		* @returns toast 列表。
		*/
		function ToastHost({ dark }) {
			const list = (0, react.useSyncExternalStore)(bus.subscribe, () => bus.get());
			const refs = (0, react.useRef)(/* @__PURE__ */ new Map());
			const shown = (0, react.useRef)(/* @__PURE__ */ new Set());
			const hostRef = (0, react.useRef)(null);
			(0, react.useLayoutEffect)(() => {
				const centerToasts = list.filter((t) => t.config.target == null && !t.leaving);
				const relativeToasts = list.filter((t) => t.config.target != null && !t.leaving);
				let centerTop = CONFIG.centerGap;
				centerToasts.forEach((t) => {
					const el = refs.current.get(t.id);
					if (el === void 0) return;
					const rect = el.getBoundingClientRect();
					if (!t.config.multiline) el.style.left = `${(window.innerWidth - rect.width) / 2}px`;
					el.style.top = `${centerTop}px`;
					centerTop += rect.height + CONFIG.stackGap;
				});
				for (const t of relativeToasts) {
					const el = refs.current.get(t.id);
					const target = t.config.target;
					if (el === void 0 || target == null) continue;
					if (!target.isConnected) {
						remove(t.id, true);
						continue;
					}
					const targetRect = target.getBoundingClientRect();
					const toastRect = el.getBoundingClientRect();
					const gap = t.config.gap ?? 10;
					let x;
					let y;
					switch (t.config.position) {
						case "bottom":
							x = targetRect.left + (targetRect.width - toastRect.width) / 2;
							y = targetRect.bottom + gap;
							break;
						case "left":
							x = targetRect.left - toastRect.width - gap;
							y = targetRect.top + (targetRect.height - toastRect.height) / 2;
							break;
						case "right":
							x = targetRect.right + gap;
							y = targetRect.top + (targetRect.height - toastRect.height) / 2;
							break;
						default:
							x = targetRect.left + (targetRect.width - toastRect.width) / 2;
							y = targetRect.top - toastRect.height - gap;
					}
					const padding = 8;
					x = Math.max(padding, Math.min(x, window.innerWidth - toastRect.width - padding));
					y = Math.max(padding, Math.min(y, window.innerHeight - toastRect.height - padding));
					el.style.left = `${x}px`;
					el.style.top = `${y}px`;
				}
				for (const t of list) {
					const el = refs.current.get(t.id);
					if (el === void 0) continue;
					if (t.leaving) {
						el.classList.remove(toast_module_css_e24dd9203b_default.toastVisible);
						continue;
					}
					if (shown.current.has(t.id)) continue;
					shown.current.add(t.id);
					requestAnimationFrame(() => {
						el.classList.add(toast_module_css_e24dd9203b_default.toastVisible);
					});
				}
				for (const id of [...shown.current]) if (!list.some((t) => t.id === id)) shown.current.delete(id);
				const host = hostRef.current;
				if (host !== null && host.parentNode === document.body) document.body.appendChild(host);
			}, [list]);
			if (list.length === 0) return null;
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: hostRef,
				className: toast_module_css_e24dd9203b_default.host,
				"data-theme": dark ? "dark" : "light",
				children: list.map((t) => {
					const useClass = t.config.useClassStyles === true;
					const colors = t.config.color === false ? null : dark ? (t.config.color ?? CONFIG.types.info.color).dark : (t.config.color ?? CONFIG.types.info.color).light;
					const classNames = [
						toast_module_css_e24dd9203b_default.toast,
						useClass ? "" : toast_module_css_e24dd9203b_default.toastDefaultVisual,
						t.config.multiline ? toast_module_css_e24dd9203b_default.toastMultiline : "",
						t.config.multiline && t.config.target == null ? toast_module_css_e24dd9203b_default.toastMultilineCentered : "",
						t.config.className === "ait-ai-complete-toast" ? toast_module_css_e24dd9203b_default.toastAiComplete : "",
						t.config.className ?? ""
					].filter(Boolean).join(" ");
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						role: "status",
						ref: (el) => {
							if (el !== null) refs.current.set(t.id, el);
							else refs.current.delete(t.id);
						},
						className: classNames,
						style: colors !== null && !useClass ? {
							backgroundColor: colors.backgroundColor,
							color: colors.textColor,
							border: `1px solid ${colors.borderColor}`,
							...t.leaving ? {
								opacity: 0,
								transform: "translateY(-10px)"
							} : {}
						} : void 0,
						children: [t.config.iconType === "check" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: toast_module_css_e24dd9203b_default.toastIcon,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CheckIcon, {})
						}) : t.config.icon !== void 0 && t.config.icon !== "" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: toast_module_css_e24dd9203b_default.toastIcon,
							children: t.config.icon
						}) : null, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t.message })]
					}, t.id);
				})
			}), document.body);
		}
		// src/client/doneSound.ts
		/** AI 完成提醒音效（原 assets/sounds/done1.mp3 的 base64 内嵌，DSH 无扩展资源目录）。 */
		const DONE_SOUND_DATA_URL = `data:audio/mpeg;base64,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`;
		// src/client/aiCompleteReminder.ts
		/**
		* AI 回复完成提醒（移植原 global/ai-complete-reminder-toast + playAICompleteSound）。
		* 右上角胶囊 toast（fixed 锚点 top:72px right:26px，向左弹出）+ 可选提示音。
		* 真实提醒（生成结束且用户不在最后节点）与设置面板预览共用。
		*/
		/** 锚点元素 class（原 ait-timeline-ai-complete-toast-anchor）。 */
		const ANCHOR_CLASS = "dsh-turn-completion-toast-anchor";
		/** 获取/创建右上角固定锚点（原 getAnchor）。 */
		function getAnchor() {
			const existing = document.querySelector(`.${ANCHOR_CLASS}`);
			if (existing !== null && existing.isConnected) return existing;
			const anchor = document.createElement("div");
			anchor.className = ANCHOR_CLASS;
			anchor.style.cssText = [
				"position: fixed",
				"top: 72px",
				"right: 26px",
				"width: 1px",
				"height: 1px",
				"pointer-events: none",
				"z-index: 2147483647"
			].join(";");
			document.body.appendChild(anchor);
			return anchor;
		}
		/**
		* 显示完成提醒 toast（原 AICompleteReminderToast.show）。
		* @param message - 本地化文案（原 timelineAICompleteNotLatestToast）。
		*/
		function showAiCompleteToast(message) {
			toast.info(message, getAnchor(), {
				duration: 3500,
				iconType: "check",
				color: false,
				className: "ait-ai-complete-toast",
				useClassStyles: true,
				position: "left",
				gap: 10
			});
		}
		/** 当前播放中的提示音实例（原 this.aiCompleteAudio，destroy 时 pause）。 */
		let currentAudio = null;
		/** 播放完成提示音（原 playAICompleteSound，volume 0.45）。 */
		function playAiCompleteSound() {
			try {
				stopAiCompleteSound();
				const audio = new Audio(DONE_SOUND_DATA_URL);
				audio.volume = .45;
				currentAudio = audio;
				audio.play().catch(() => {});
			} catch {}
		}
		/** 停止提示音（原 timeline destroy 中的 aiCompleteAudio.pause()）。 */
		function stopAiCompleteSound() {
			try {
				currentAudio?.pause();
				currentAudio = null;
			} catch {}
		}
		/** 移除锚点（原 removeAnchor，时间轴卸载时调用）。 */
		function removeAiCompleteAnchor() {
			document.querySelectorAll(`.${ANCHOR_CLASS}`).forEach((el) => {
				el.remove();
			});
		}
		// src/client/theme.ts
		let dark = false;
		const listeners = /* @__PURE__ */ new Set();
		/**
		* 绑定主题服务（index.ts 的 apply 中调用，早于任何组件挂载）。
		* 订阅经 ctx.on 注册，随插件 fiber 卸载自动解除；重载后重新绑定。
		* @param ctx - 注入了 theme 服务的客户端上下文。
		*/
		function bindTheme(ctx) {
			const sync = (snapshot) => {
				const next = snapshot.active.colorScheme === "dark";
				if (next === dark) return;
				dark = next;
				for (const fn of [...listeners]) fn();
			};
			sync(ctx.theme.getTheme());
			ctx.on("theme/change", sync);
		}
		/**
		* 当前是否深色主题。
		* @returns true 表示深色。
		*/
		function detectDarkTheme() {
			return dark;
		}
		/**
		* 订阅主题变化。
		* @param onChange - 主题变化时回调（回调内自行调用 detectDarkTheme）。
		* @returns 取消订阅。
		*/
		function observeTheme(onChange) {
			listeners.add(onChange);
			return () => {
				listeners.delete(onChange);
			};
		}
		// src/client/reminder.tsx
		function clearReminder() {
			toast.forceHideAll();
			removeAiCompleteAnchor();
			stopAiCompleteSound();
		}
		function ReminderHost() {
			const dark = (0, react.useSyncExternalStore)(observeTheme, detectDarkTheme);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ToastHost, { dark });
		}
		// src/client/settings.ts
		const key = "dsh.turn-completion-notifications.settings";
		const legacyKey = "dsh.timeline.settings";
		const defaults = {
			aiCompleteToastEnabled: true,
			aiCompleteSoundEnabled: false
		};
		function load() {
			try {
				const stored = localStorage.getItem(key);
				const raw = stored ?? localStorage.getItem(legacyKey);
				if (raw === null) return defaults;
				const data = JSON.parse(raw);
				const settings = {
					aiCompleteToastEnabled: typeof data?.aiCompleteToastEnabled === "boolean" ? data.aiCompleteToastEnabled : defaults.aiCompleteToastEnabled,
					aiCompleteSoundEnabled: typeof data?.aiCompleteSoundEnabled === "boolean" ? data.aiCompleteSoundEnabled : defaults.aiCompleteSoundEnabled
				};
				if (stored === null) try {
					localStorage.setItem(key, JSON.stringify(settings));
				} catch {}
				return settings;
			} catch {
				return defaults;
			}
		}
		const settings = new Bus(defaults);
		function setSetting(property, enabled) {
			const next = {
				...settings.get(),
				[property]: enabled
			};
			settings.set(next);
			try {
				localStorage.setItem(key, JSON.stringify(next));
			} catch {}
		}
		function bindSettings() {
			settings.set(load());
			const onStorage = (event) => {
				if (event.storageArea === localStorage && (event.key === key || event.key === null)) settings.set(load());
			};
			window.addEventListener("storage", onStorage);
			return () => {
				window.removeEventListener("storage", onStorage);
			};
		}
		// src/client/ConversationObserver.tsx
		function questionKeys(chat) {
			return chat.order.filter((key) => {
				const node = chat.nodes.get(key);
				return node !== void 0 && node.visibility !== "hidden" && (node.kind === "user" || node.kind === "steering");
			});
		}
		function sameKeys(previous, next) {
			return previous.length === next.length && previous.every((key, index) => key === next[index]);
		}
		function SessionObserver({ useSession, useChat, t }) {
			const anchor = (0, react.useRef)(null);
			const running = useSession((state) => state.running);
			const keys = useChat(questionKeys, sameKeys);
			const latest = (0, react.useRef)({
				keys,
				t
			});
			latest.current = {
				keys,
				t
			};
			const previous = (0, react.useRef)(running);
			(0, react.useEffect)(() => {
				const finished = previous.current && !running;
				previous.current = running;
				if (!finished) return;
				const timer = window.setTimeout(() => {
					const { aiCompleteToastEnabled, aiCompleteSoundEnabled } = settings.get();
					if (!aiCompleteToastEnabled && !aiCompleteSoundEnabled) return;
					const scope = findConversationDOM(anchor.current);
					if (scope === null || !isReadingHistory(scope, latest.current.keys)) return;
					if (aiCompleteToastEnabled) showAiCompleteToast(latest.current.t("completed"));
					if (aiCompleteSoundEnabled) playAiCompleteSound();
				}, 200);
				return () => {
					window.clearTimeout(timer);
				};
			}, [running]);
			(0, react.useEffect)(() => clearReminder, []);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				hidden: true,
				ref: anchor
			});
		}
		function ConversationObserver(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SessionObserver, { ...props }, props.sessionId);
		}
		// \0dsh-css:src/client/settings.module.css?ee720b914d.mjs
		const css = ".A2CzWq_toggle{flex-shrink:0;width:48px;height:26px;display:inline-block;position:relative}.A2CzWq_toggle input{opacity:0;width:0;height:0}.A2CzWq_toggleSlider{cursor:pointer;corner-shape:round;background-color:#d1d5db;border-radius:999px;transition:background-color .3s;position:absolute;inset:0}.A2CzWq_toggleSlider:before{content:\"\";corner-shape:round;background-color:#fff;border-radius:50%;width:20px;height:20px;transition:transform .3s;position:absolute;bottom:3px;left:3px}.A2CzWq_toggle input:checked+.A2CzWq_toggleSlider{background-color:#000}.A2CzWq_toggle input:checked+.A2CzWq_toggleSlider:before{transform:translate(22px)}.A2CzWq_toggle input:focus+.A2CzWq_toggleSlider{box-shadow:0 0 0 3px #0000001a}.A2CzWq_subModal{box-sizing:border-box;background:var(--dsw-alias-bg-base,Canvas);border:none;border-radius:12px;width:min(380px,100vw - 32px);max-height:80vh;margin:0;padding:0;animation:.2s A2CzWq_panel-scale-in;overflow:hidden;box-shadow:0 8px 32px #0000002e}.A2CzWq_subModalHeader{color:var(--dsw-alias-label-primary,CanvasText);justify-content:space-between;align-items:center;padding:16px 20px 12px;font-size:15px;font-weight:600;display:flex}.A2CzWq_subModalClose{color:#9ca3af;cursor:pointer;background:0 0;border:none;border-radius:6px;justify-content:center;align-items:center;width:28px;height:28px;font-size:16px;transition:all .15s;display:flex}.A2CzWq_subModalClose:hover{color:#374151;background:#f3f4f6}.A2CzWq_subModalBody{max-height:60vh;padding:4px 16px 16px;overflow-y:auto}.A2CzWq_reminderItem{border-radius:8px;justify-content:space-between;align-items:flex-start;gap:16px;padding:12px 8px;transition:background .15s;display:flex}.A2CzWq_reminderItem:hover{background:var(--dsw-alias-bg-hover,#7f7f7f14)}.A2CzWq_reminderInfo{flex:1;min-width:0}.A2CzWq_reminderLabel{color:var(--dsw-alias-label-primary,CanvasText);margin-bottom:4px;font-size:14px;font-weight:500;display:block}.A2CzWq_reminderHint{color:var(--dsw-alias-label-secondary,#6b7280);font-size:12px;line-height:1.5;display:block}@keyframes A2CzWq_panel-scale-in{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}.A2CzWq_subModalOverlay{z-index:2147483646;user-select:none;background:#0006;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.A2CzWq_settingsRow{justify-content:space-between;align-items:center;gap:16px;display:flex}.A2CzWq_settingTitle{font-size:14px;font-weight:500}.A2CzWq_settingHint{opacity:.7;margin-top:4px;font-size:12px}.A2CzWq_manage{color:inherit;cursor:pointer;background:0 0;border:1px solid;border-radius:6px;padding:4px 12px}";
		const tagId = "dsh-turn-completion-notifications/settings.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-turn-completion-notifications";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var settings_module_css_ee720b914d_default = {
			"panel-scale-in": "A2CzWq_panel-scale-in",
			"reminderHint": "A2CzWq_reminderHint",
			"settingTitle": "A2CzWq_settingTitle",
			"reminderInfo": "A2CzWq_reminderInfo",
			"settingHint": "A2CzWq_settingHint",
			"subModalOverlay": "A2CzWq_subModalOverlay",
			"toggle": "A2CzWq_toggle",
			"subModalBody": "A2CzWq_subModalBody",
			"reminderItem": "A2CzWq_reminderItem",
			"subModalHeader": "A2CzWq_subModalHeader",
			"toggleSlider": "A2CzWq_toggleSlider",
			"subModal": "A2CzWq_subModal",
			"manage": "A2CzWq_manage",
			"settingsRow": "A2CzWq_settingsRow",
			"reminderLabel": "A2CzWq_reminderLabel",
			"subModalClose": "A2CzWq_subModalClose"
		};
		// src/client/ReminderSettings.tsx
		function ReminderSettings({ t }) {
			const [open, setOpen] = (0, react.useState)(false);
			const preferences = (0, react.useSyncExternalStore)(settings.subscribe, () => settings.get());
			const closeButton = (0, react.useRef)(null);
			const trigger = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (!open) return;
				closeButton.current?.focus();
				const onKey = (event) => {
					if (event.key === "Escape") {
						event.stopImmediatePropagation();
						setOpen(false);
					}
				};
				document.addEventListener("keydown", onKey, true);
				return () => {
					document.removeEventListener("keydown", onKey, true);
					trigger.current?.focus();
				};
			}, [open]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_module_css_ee720b914d_default.settingsRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_module_css_ee720b914d_default.reminderInfo,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: settings_module_css_ee720b914d_default.settingTitle,
							children: t("title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: settings_module_css_ee720b914d_default.settingHint,
							children: t("description")
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: settings_module_css_ee720b914d_default.manage,
						ref: trigger,
						onClick: () => {
							setOpen(true);
						},
						children: t("settings")
					}),
					open && (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: settings_module_css_ee720b914d_default.subModalOverlay,
						onClick: (event) => {
							if (event.target === event.currentTarget) setOpen(false);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							role: "dialog",
							"aria-modal": "true",
							"aria-label": t("title"),
							className: settings_module_css_ee720b914d_default.subModal,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: settings_module_css_ee720b914d_default.subModalHeader,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("title") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": t("close"),
									className: settings_module_css_ee720b914d_default.subModalClose,
									ref: closeButton,
									onClick: () => {
										setOpen(false);
									},
									children: "✕"
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: settings_module_css_ee720b914d_default.subModalBody,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: settings_module_css_ee720b914d_default.reminderItem,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: settings_module_css_ee720b914d_default.reminderInfo,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: settings_module_css_ee720b914d_default.reminderLabel,
											children: t("popup")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: settings_module_css_ee720b914d_default.reminderHint,
											children: t("popupHint")
										})]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: settings_module_css_ee720b914d_default.toggle,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											"aria-label": t("popup"),
											checked: preferences.aiCompleteToastEnabled,
											onChange: (event) => {
												const enabled = event.currentTarget.checked;
												setSetting("aiCompleteToastEnabled", enabled);
												if (enabled) showAiCompleteToast(t("completed"));
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: settings_module_css_ee720b914d_default.toggleSlider })]
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: settings_module_css_ee720b914d_default.reminderItem,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: settings_module_css_ee720b914d_default.reminderInfo,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: settings_module_css_ee720b914d_default.reminderLabel,
											children: t("sound")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: settings_module_css_ee720b914d_default.reminderHint,
											children: t("soundHint")
										})]
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: settings_module_css_ee720b914d_default.toggle,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											"aria-label": t("sound"),
											checked: preferences.aiCompleteSoundEnabled,
											onChange: (event) => {
												const enabled = event.currentTarget.checked;
												setSetting("aiCompleteSoundEnabled", enabled);
												if (enabled) playAiCompleteSound();
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: settings_module_css_ee720b914d_default.toggleSlider })]
									})]
								})]
							})]
						})
					}), document.body)
				]
			});
		}
		// src/client/locales.ts
		const NS = "dshTurnCompletionNotifications";
		const zh = {
			title: "AI 回复完成提醒",
			description: "浏览较早的提问时，提醒你最新回复已完成。",
			settings: "设置",
			close: "关闭",
			popup: "弹窗提醒",
			popupHint: "AI 回复完成后，在页面右上角弹窗提醒",
			sound: "声音提醒",
			soundHint: "AI 回复完成后，声音提醒",
			completed: "回复已完成"
		};
		const en = {
			title: "Turn completion notifications",
			description: "Get notified when a reply finishes while you’re reading an earlier turn.",
			settings: "Settings",
			close: "Close",
			popup: "Popup reminder",
			popupHint: "Show a popup at the top right of the page after an AI reply finishes",
			sound: "Sound reminder",
			soundHint: "Play a sound after an AI reply finishes",
			completed: "Reply completed"
		};
		// src/client/index.ts
		const id = "dsh-turn-completion-notifications";
		const inject = [
			"slots",
			"locale",
			"theme"
		];
		function apply(ctx) {
			bindTheme(ctx);
			ctx.effect(bindSettings, `${id}: preferences`);
			ctx.effect(() => () => {
				clearReminder();
			}, `${id}: dismiss notification`);
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), `${id}: dictionaries`);
			ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
				name: "conversation.session.header.actions",
				id,
				order: 42,
				locale: NS
			}, ConversationObserver));
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id,
				locale: NS
			}, ReminderHost));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id,
				order: 70,
				locale: NS
			}, ReminderSettings));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
