import { Message } from '@/types/models';
import { ReactNode } from 'react';

export type ChatBoxProps = {
  chat_id: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export type ChatSidebarProps = {
  onChatSelect: ( chat_id: string, messages: Message[]) => void;
};

export type SidebarItemProps = {
  item: {
    id: string;
    icon: ReactNode;
    label: string;
  };
  onClickItem: (messages: Message[]) => void;
}