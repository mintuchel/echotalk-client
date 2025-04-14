// ChatForm.tsx

import { useState } from "react";
import { ChatLayout } from "./layout";
import Header from "./Header";
import ChatBox from "./ChatBox";

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
      <Header model={model} setModel={setModel} />
      {/* 여기에 다른 컴포넌트 추가 가능 */}
      <ChatBox messages={messages} setMessages={setMessages}/>
    </ChatLayout>
  );
}