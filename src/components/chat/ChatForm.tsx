import { useState } from "react";
import { ChatLayout } from "@/components/chat/layout";
import Header from "@/components/chat/Header";
import ChatBox from "@/components/chat/ChatBox";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { Message } from "@/types/models";

export function ChatForm() {
  const [model, setModel] = useState("직원정보");
  const[chat_id, setChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatSelect = (selectedChatId: string, newMessages: Message[]) => {
    setMessages(newMessages);
    setChat(selectedChatId);
  };

  return (
    <ChatLayout>
      <ChatSidebar onChatSelect={handleChatSelect} />
      <Header model={model} setModel={setModel} />
      <ChatBox messages={messages} setMessages={setMessages} chat_id={chat_id} />
    </ChatLayout>
  );
}