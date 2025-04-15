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

  return (
    <ChatLayout>
      <MenuSidebar messages={messages} setMessages={setMessages} />
      {/*<ChatSidebar/>*/}
      <Header model={model} setModel={setModel} />
      <ChatBox messages={messages} setMessages={setMessages} />
    </ChatLayout>
  );
}