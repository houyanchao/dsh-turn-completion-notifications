/** Keep keyboard navigation inside the open settings dialog and return focus to its opener. */
export declare function containDialogFocus(dialog: HTMLElement, opener: HTMLElement | null, dismiss: () => void): () => void;
