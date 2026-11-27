import type { ChatSnapshot } from '@deepseek-ai/dsh-client-ui-chat/client';
import { type ConversationDOM } from './conversationDom.ts';
export declare function isReadingHistory({ flow, scroll }: ConversationDOM, chat: ChatSnapshot, turn: number, beforeRender?: boolean): boolean;
