import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "@/types/models";
import { ChatBoxProps } from "@/types/props";

const ChatBox: React.FC<ChatBoxProps> = ({ messages, setMessages, chat_id }) => {
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

    const userText = inputMessage.trim();

    setMessages((prevMessages) => {
      const lastId = prevMessages.length > 0 ? prevMessages[prevMessages.length - 1].id : 0;

      const userQuery: Message = {
        id: lastId + 1,
        text: userText,
        sender: "user",
      };

      return [...prevMessages, userQuery];
    });

    setInputMessage("");

    await processUserQuery(userText); // userText 따로 넘기기
  };

  // fastapi 서버로 쿼리 날림
  const processUserQuery = async (prompt: string) => {

    if (chat_id == "") return;

    try {
      const response = await axios.post("http://localhost:8000/message",
        {
          prompt,
          chat_id,
        },
      );

      const answer = response.data.answer;
      console.log(answer)

      setMessages((prevMessages) => {
        const lastId = prevMessages.length > 0 ? prevMessages[prevMessages.length - 1].id : 0;

        const botReply: Message = {
          id: lastId + 1,
          text: answer,
          sender: "bot",
        };

        return [...prevMessages, botReply];
      });
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
                  msg.sender === "user" ? "bg-blue-100 ml-auto text-left" : "bg-gray-100 mr-auto text-left"
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