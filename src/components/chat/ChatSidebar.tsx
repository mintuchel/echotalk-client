import { MessageSquare, Plus } from "lucide-react";
import { Logo } from "@/components/chat/Logo";
import ChatSidebarItem from "@/components/chat/ChatSidebarItem";
import { LogoutButton } from "@/components/chat/LogoutButton";
import { Message } from "@/types/message";

import { useEffect, useState } from "react";
import axios from "axios";

const DUMMY_ITEMS = [
  {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: "https://localhost:8000/1",
  },
];

// 부모 컴포넌트인 App.tsx에게 전달
interface ChatSidebarProps {
  onDateSelect: (
    messages: { id: number; text: string; sender: "user" | "bot" }[]
  ) => void;
}

export default function ChatSidebar({ onDateSelect }: ChatSidebarProps) {
  const [dates, setDates] = useState<string[]>([]); // 상태로 관리
  
  // 처음 렌더링 될 때 한 번만 서버에서 날짜별 conversation 가져오기
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get("http://localhost:8000/chat/dates");
        // json 형식에서 dates 추출
        const dateList = response.data.dates;
        setDates(dateList);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, []);

// 클릭하면 서버로부터 과거 대화를 받아 message 배열로 전달
  const fetchHistory = async (date: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/chat/${date}`);
      const history = response.data.history;

      if (history) {
        const formattedMessages = history.flatMap(
          (item: { question: string; answer: string }, index: number) => [
            { id: index * 2, text: item.question, sender: "user" },
            { id: index * 2 + 1, text: item.answer, sender: "bot" },
          ]
        );

        onDateSelect(formattedMessages);
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
          {dates.length >= 0 &&
          dates.map((date, index) => (
            <ChatSidebarItem
              key={index}
              item={{
                id: date,
                href: `/chat/${date}`, // 링크가 필요 없다면 "#"이나 빈 문자열도 OK
                icon: <MessageSquare />, // 적당한 아이콘
                label: date,
              }}
              onClickItem={() => fetchHistory(date)}
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