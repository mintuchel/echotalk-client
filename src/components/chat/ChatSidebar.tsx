import { MessageSquare, Plus } from "lucide-react";
import { Logo } from "@/components/chat/Logo";
import ChatSidebarItem from "@/components/chat/ChatSidebarItem";
import { LogoutButton } from "@/components/chat/LogoutButton";

import { useEffect, useState } from "react";
import axios from "axios";

// 부모 컴포넌트인 App.tsx에게 전달
interface ChatSidebarProps {
  onChatSelect: (
    messages: { id: number; text: string; sender: "user" | "bot" }[],
    chat_id: string // chat_id도 같이 넘겨줘야 함
  ) => void;
}

type Chat = {
  chat_id: string;
  chat_name: string;
};

export default function ChatSidebar({ onChatSelect }: ChatSidebarProps) {
  const [chatList, setChatList] = useState<Chat[]>([]); // 상태로 관리

  const fetchChatList = async () => {
    try {
      // cookie에 있는 user_id를 authorization header로 전달
      const response = await axios.get("http://localhost:8000/chat", {
        withCredentials: true, // 핵심!
      });

      const chatList = response.data.map((chat: any) => ({
        chat_id: chat.id,
        chat_name: chat.name
      }));

      setChatList(chatList);
    } catch (error) {
      console.error("ChatSideBar.tsx의 fetchChatList에서 터짐", error);
    }
  };
  
  // 처음 렌더링 될 때 한 번만 fetchChatList를 통해 채팅목록 가져오기
  useEffect(() => {
    fetchChatList()
  }, []);

  // 새로운 채팅 버튼 클릭하면 동작
  const handleNewChat = async () => {
    try {
      // cookie에 있는 user_id를 authorization header로 전달
      const response = await axios.post("http://localhost:8000/chat", {},
        {
          withCredentials: true,
        });

      console.log("새로운 대화 생성됨:", response.data);
      const newChatId = response.data.id;
      
      // 대화 리스트 다시 불러오기
      await fetchChatList();

      fetchChatMessages(newChatId);

    } catch (error) {
      console.error("새 대화 생성 실패:", error);
    }
  };
  
  // 클릭하면 서버로부터 과거 대화를 받아 message 배열로 전달
  // 부모인 ChatForm에서 관리되는 chat_id 값도 변경
  const fetchChatMessages = async (chat_id: string) => {
    try {
      const response = await axios.get("http://localhost:8000/message", {
        params: {
          chat_id: chat_id,
        },
      });

      const messages = response.data.messages

      if (messages) {
        const formattedMessages = messages.flatMap(
          (item: { question: string; answer: string }, index: number) => [
            { id: index * 2, text: item.question, sender: "user" },
            { id: index * 2 + 1, text: item.answer, sender: "bot" },
          ]
        );

        onChatSelect(formattedMessages, chat_id);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <nav className="h-[70vh] w-[20vw] bg-white border-[3px] rounded-2xl shadow-lg p-4 mr-4 flex flex-col">
      {/* 로고 영역 + 메뉴 아이템 */}
      <Logo />
      <div className="flex-1 overflow-y-auto mt-4 flex flex-col gap-2 pr-1">
        {/* 항상 맨 위에 고정되는 새로운 대화 버튼 */}
        <ChatSidebarItem
          item={{
            id: "new",
            icon: <Plus />,
            label: "새로운 대화",
          }}
          onClickItem={() => handleNewChat()}
        />
          {chatList.length >= 0 &&
          chatList.map((chat, index) => (
            <ChatSidebarItem
              key={index}
              item={{
                id: chat.chat_id,
                icon: <MessageSquare />, // 적당한 아이콘
                label: chat.chat_name,
              }}
              onClickItem={() => fetchChatMessages(chat.chat_id)}
            />
          ))}
        </div>

      {/* 로그아웃 버튼 영역 */}
      <div className="flex justify-center pt-4">
        <LogoutButton />
      </div>
    </nav>
  );
}