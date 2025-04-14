import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

interface ChatBoxProps {
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, setMessages }) => {
    const [inputMessage, setInputMessage] = useState("");
    const scrollViewRef = useRef<HTMLDivElement>(null);

// 자동 스크롤
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  }, [messages]);
    
      const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userQuery: Message = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userQuery]);
    setInputMessage("");

    await processUserQuery(inputMessage);
  };

  const processUserQuery = async (prompt: string) => {
    try {
      const response = await axios.post("http://localhost:8000/chat", { prompt });
      const answer = response.data.response;

      const botReply: Message = {
        id: Date.now(),
        text: answer,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  return (
    <Card className="w-[45vw] h-[64vh] mx-auto border rounded-t-none rounded-bl-2xl rounded-br-2xl shadow-lg">
      <CardContent className="p-4 space-y-4">
        <ScrollArea className="h-[55vh] pr-4">
          <div ref={scrollViewRef} className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "p-3 rounded-xl text-sm max-w-sm w-fit break-words whitespace-pre-wrap",
                  msg.sender === "user"
                    ? "bg-blue-100 ml-auto text-right"
                    : "bg-gray-100 mr-auto text-left"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="메시지를 입력하세요"
          />
          <Button onClick={handleSendMessage}>전송</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBox;