import { useState } from "react";
import { ChatLayout } from "@/components/chat/layout";
import Header from "@/components/chat/Header";
import ChatBox from "@/components/chat/ChatBox";
import MenuSidebar from "@/components/chat/MenuSidebar";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { Message } from "@/types/message";

export function ChatForm() {
  const [model, setModel] = useState("openai");
  const [messages, setMessages] = useState<Message[]>([]);
  // DateLabels에서 클릭된 날짜들의 메시지들을 받아와 messages 상태를 업데이트하는 함수
  const handleDateSelect = (newMessages: Message[]) => {
    setMessages(newMessages); // 선택된 날짜의 질문과 답변을 ChatbotUI에게 전달
  };

  return (
    <ChatLayout>
      {/*<MenuSidebar messages={messages} setMessages={setMessages} />*/}
      <ChatSidebar onDateSelect={handleDateSelect} />
      <Header model={model} setModel={setModel} />
      <ChatBox messages={messages} setMessages={setMessages} />
    </ChatLayout>
  );
}