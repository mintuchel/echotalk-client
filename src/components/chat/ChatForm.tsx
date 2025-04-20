import { useState } from "react";
import { ChatLayout } from "@/components/chat/layout";
import Header from "@/components/chat/Header";
import ChatBox from "@/components/chat/ChatBox";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { Message } from "@/types/message";

export function ChatForm() {
  const [model, setModel] = useState("openai");
  const[chat_id, setChat] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChatSelect = (newMessages: Message[], selectedChatId: string) => {
    setMessages(newMessages);
    setChat(selectedChatId);
  };

  return (
    <ChatLayout>
      {/*<MenuSidebar messages={messages} setMessages={setMessages} />*/}
      <ChatSidebar onChatSelect={handleChatSelect} />
      <Header model={model} setModel={setModel} />
      <ChatBox messages={messages} setMessages={setMessages} chat_id={chat_id} />
    </ChatLayout>
  );
}