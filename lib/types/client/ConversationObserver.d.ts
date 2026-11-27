import type { PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import { type TurnCompletionSources } from './turnCompletions.ts';
import type { NS } from './locales.ts';
type Props = PropsRuntime<'conversation.session.header.actions'> & PropsLocale<typeof NS> & TurnCompletionSources;
export declare function ConversationObserver(props: Props): import("react").JSX.Element;
export {};
