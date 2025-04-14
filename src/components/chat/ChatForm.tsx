import { useState } from "react";
import { ChatLayout } from "@/components/chat/layout";
import Header from "@/components/chat/Header";
import ChatBox from "@/components/chat/ChatBox";
import Sidebar from "@/components/chat/SideBar";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export function ChatForm() {
  const [model, setModel] = useState("openai");
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ChatLayout>
      <Sidebar messages={messages} setMessages={setMessages} />
      <Header model={model} setModel={setModel} />
      <ChatBox messages={messages} setMessages={setMessages}/>
    </ChatLayout>
  );
}