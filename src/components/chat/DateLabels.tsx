import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// 부모 컴포넌트인 App.tsx에게 전달
interface DateLabelsProps {
  onDateSelect: (
    messages: { id: number; text: string; sender: "user" | "bot" }[]
  ) => void;
}

const DateLabels: React.FC<DateLabelsProps> = ({ onDateSelect }) => {
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

        // 부모 컴포넌트로 메시지 전달
        onDateSelect(formattedMessages);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* ScrollArea로 날짜 리스트 감싸기 */}
      <ScrollArea className="h-72 w-full overflow-y-auto">
        {dates.length > 0 &&
          dates.map((date, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => fetchHistory(date)} // 날짜 선택 시 메시지 업데이트
              className={cn(
                "w-full text-left py-2 px-3 text-sm rounded-md transition-colors hover:bg-blue-100 hover:text-blue-800",
                // 동일한 스타일 적용
                "text-gray-700"
              )}
            >
              {date}
            </Button>
          ))}
      </ScrollArea>
    </div>
  );
};

export default DateLabels;