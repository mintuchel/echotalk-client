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
  {
    id: "1",
    label:
      "새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/2",
  },
  {
    id: "2",
    label: "일반 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/3",
  },
    {
    id: "1",
    label:
      "새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/2",
  },
  {
    id: "2",
    label: "일반 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/3",
  },
    {
    id: "1",
    label:
      "새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/2",
  },
  {
    id: "2",
    label: "일반 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/3",
  },  {
    id: "1",
    label:
      "새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다. 새로운 긴 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/2",
  },
  {
    id: "2",
    label: "일반 대화 예시입니다.",
    icon: <MessageSquare />,
    href: "https://localhost:8000/3",
  }
];

interface ChatSidebarProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatSidebar({ messages, setMessages }: ChatSidebarProps) {
  const [dates, setDates] = useState<string[]>([]); // 상태로 관리
  
  // 처음 렌더링 될 때 한 번만 서버에서 날짜 가져오기
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

  const handleSidebarItemClick = (msgs: Message[]) => {
    setMessages(msgs);
  };

  return (
    <nav className="h-[70vh] w-[20vw] bg-white border-[3px] rounded-2xl shadow-lg p-4 mr-4 flex flex-col">
      {/* 로고 영역 + 메뉴 아이템 */}

        <Logo />
        <div className="flex-1 overflow-y-auto mt-4 flex flex-col gap-2 pr-1">
          {dates.length > 0 &&
          dates.map((date, index) => (
            <ChatSidebarItem key={index} item={item} onClickItem={handleSidebarItemClick} />
          ))}
        </div>

      {/* 로그아웃 버튼 영역 */}
      <div className="flex justify-center pt-4">
        <LogoutButton />
      </div>
    </nav>
  );
}