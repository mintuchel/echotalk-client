import { MessageSquare, Plus } from "lucide-react";
import { Logo } from "@/components/chat/Logo";
import ChatSidebarItem from "@/components/chat/ChatSidebarItem";
import { LogoutButton } from "@/components/chat/LogoutButton";
import AddChatButton from "@/components/chat/AddChatButton";
import { useEffect, useState } from "react";
import { Chat } from "@/types/models";
import { ChatSidebarProp } from "@/types/props";
import { getChatList, createChat, getChatMessages } from "@/apis/chat";

// 인자로 받는 onChatSelect 함수는 ChatSidebarProp 타입이다 (왜냐구? ChatSidebarProp에 멤버로 저 함수밖에 없거든...)
export default function ChatSidebar({ onChatSelect }: ChatSidebarProp) {
  const [chatList, setChatList] = useState<Chat[]>([]);

  const fetchChatList = async () => {
    try {
      // 서버에서 오는 형식이랑 클라이언트에서 사용하는 타입이랑 동일해서 map 없이 바로 받아도 됨
      const chatList = await getChatList();
      setChatList(chatList);
    } catch (error) {
      console.error("ChatSideBar.tsx의 fetchChatList에서 터짐", error);
    }
  };
  
  // 처음 렌더링 될 때 1번만 fetchChatList를 통해 채팅목록 가져오기
  useEffect(() => {
    fetchChatList()
  }, []);

  // 새로운 채팅 버튼 클릭하면 동작
  const handleNewChat = async () => {
    try {
      const { id } = await createChat();
      await fetchChatList();
      fetchChatMessages(id);
      console.log("새 대화 생성됨: id", id);
    } catch (error) {
      console.error("새 대화 생성 실패:", error);
    }
  };
  
  // 클릭하면 서버로부터 과거 대화를 받아 message 배열로 전달
  // 부모인 ChatForm에서 관리되는 chat_id 값도 변경
  const fetchChatMessages = async (id: string) => {
    try {
      const messages = await getChatMessages(id);
      if (messages) {
        const formattedMessages = messages.flatMap(
          (item: { question: string; answer: string }, index: number) => [
            { id: index * 2, text: item.question, sender: "user" },
            { id: index * 2 + 1, text: item.answer, sender: "bot" },
          ]
        );

        onChatSelect(id, formattedMessages);
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
        <AddChatButton onClick={handleNewChat} />
        
        {/* 유저의 대화내역 보여주기 */}
        {chatList.length >= 0 && chatList.map((chat, index) => (
          <ChatSidebarItem
            key={index}
            item={{
              id: chat.id,
              icon: <MessageSquare />, // 적당한 아이콘
              label: chat.name,
            }}
            onClickItem={fetchChatMessages}
            onDeleteSuccess={fetchChatList}
            onEditSuccess={fetchChatList}
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