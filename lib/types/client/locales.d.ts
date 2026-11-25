export declare const NS = "dshTurnCompletionNotifications";
export declare const zh: {
    title: string;
    description: string;
    settings: string;
    close: string;
    popup: string;
    popupHint: string;
    sound: string;
    soundHint: string;
    completed: string;
};
export declare const en: Record<keyof typeof zh, string>;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        dshTurnCompletionNotifications: keyof typeof zh;
    }
}
