export declare function showAiCompleteToast(message: string): void;
export declare function clearCompletionToasts(): void;
export declare function ToastHost({ dark }: {
    readonly dark: boolean;
}): import("react").ReactPortal | null;
