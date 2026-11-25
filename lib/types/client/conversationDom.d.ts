export interface ConversationDOM {
    readonly flow: HTMLElement;
    readonly scroll: HTMLElement;
}
export declare function findMessageElement(flow: HTMLElement, key: string): HTMLElement | null;
export declare function findConversationDOM(anchor: Element | null): ConversationDOM | null;
