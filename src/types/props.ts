import { Message } from '@/types/models';
import { ReactNode } from 'react';

export type ChatBoxProp = {
  chat_id: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export type ChatSidebarProp = {
  onChatSelect: (chat_id: string, messages: Message[]) => void;
};

export type ChatSidebarItemProp = {
  item: {
    id: string;
    icon: ReactNode;
    label: string;
  };
  onClickItem: (id: string) => void;
}