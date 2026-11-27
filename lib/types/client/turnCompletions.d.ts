import { type RefObject } from 'react';
import type { SessionEventSource } from '@deepseek-ai/dsh-api-session-controller/client';
import type { ChatSnapshot } from '@deepseek-ai/dsh-client-ui-chat/client';
export interface TurnCompletionSources {
    readonly completionEvents: SessionEventSource | undefined;
    readonly completionChat: {
        getSnapshot(): ChatSnapshot | undefined;
    };
}
/** Observe the session journal directly so queued turns cannot merge into one React update. */
export declare function useTurnCompletions({ completionEvents, completionChat }: TurnCompletionSources, enabled: boolean, anchor: RefObject<HTMLElement>, onComplete: () => void): void;
