import { Users, FileText, Building2, Workflow, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DateLabels from "@/components/chat/DateLabels";
import { Message } from "@/types/message";
import { Logo } from "./Logo";

const menuItems = [
  { label: "직원정보", icon: Users },
  { label: "규정정보", icon: FileText },
  { label: "회사정보", icon: Building2 },
  { label: "RPA현황", icon: Workflow },
  { label: "문서조회", icon: FileSearch},
];

interface SidebarProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function MenuSidebar({ messages, setMessages }: SidebarProps) {
  const [active, setActive] = useState("직원정보");

  return (
    <aside className="h-[70vh] w-[12vw] bg-white border rounded-2xl shadow-lg p-4 mr-4">
      {/*<div className="flex items-center justify-center text-xl font-bold mb-6 px-2"> 리소스 메뉴</div>*/}
    <Logo />
  <nav className="space-y-2 mt-6">
    {menuItems.map((item) => (
      <button
        key={item.label}
        onClick={() => setActive(item.label)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 hover:text-blue-800 text-left",
          active === item.label
            ? "bg-blue-100 text-blue-800 font-semibold"
            : "text-gray-700"
        )}
      >
        <item.icon className="w-5 h-5" />
        {item.label}
      </button>
    ))}
      </nav>
    {/* DateLabels 컴포넌트 추가 */}
      <div className="mt-6">
        <DateLabels onDateSelect={setMessages} />
      </div>
</aside>
  );
}