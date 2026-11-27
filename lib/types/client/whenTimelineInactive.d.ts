import type { Context, Plugin } from '@deepseek-ai/cordis';
/** Run the standalone feature only while Timeline's client overlay is absent. */
export declare function whenTimelineInactive(ctx: Context, feature: Plugin.Object): void;
