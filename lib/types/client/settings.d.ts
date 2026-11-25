import { Bus } from './bus.ts';
export interface ReminderSettings {
    readonly aiCompleteToastEnabled: boolean;
    readonly aiCompleteSoundEnabled: boolean;
}
export declare const settings: Bus<ReminderSettings>;
export declare function setSetting(property: keyof ReminderSettings, enabled: boolean): void;
export declare function bindSettings(): () => void;
