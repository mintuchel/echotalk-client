import { Message } from '@/types/models';
import { ReactNode } from 'react';

export type ChatBoxProp = {
  chat_id: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

// 그저 부모 컴포넌트에게 신호만 보내는 역할이고
// ChatSidebar.tsx 내부적으로는 return해서 사용할 것은 없으므로 void로 선언
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
  // 새 채팅 버튼은 이게 없어도 되므로 선택적 prop 추가 방식으로 선언
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
}