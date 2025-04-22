import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { cn } from "../../lib/utils";
import { useModalStore } from "../../store/modal";
import { ModalFooter } from "../modal/ModalFooter";
import { Message } from "@/types/message";

type Props = {
  item: {
    id: string;
    icon: ReactNode;
    label: string;
  };
  onClickItem: (messages: Message[]) => void;
};

export default function ChatSidebarItem({ item, onClickItem }: Props) {
  const { id, icon, label } = item;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(item.label);

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ 이름 수정 input 변경
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // ✅ 드롭다운 메뉴 토글
  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // ✅ 엔터 누르면 수정 완료
  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleBlur();
    }
  };

  // ✅ 포커스 아웃 시 수정 종료
  const handleBlur = async () => {
    setIsEditMode(false);
    if (value !== label) {
      try {
        const response = await axios.patch("http://localhost:8000/chat",
          {
            id,
            label,
          },
          {
            withCredentials: true,
          }
    );
      } catch (error) {
        console.error(error);
        // toast.error("이름 수정에 실패하였습니다.");
      }
    }
  };

  // ✅ 삭제 버튼 클릭 시 모달 띄우기
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/chat/${id}`, {
        withCredentials: true, // 쿠키 전달
      });

      console.log(response)

      // toast.success("삭제에 성공했습니다.");

      closeModal();
    } catch (error) {
      console.error(error);
      // toast.error("삭제에 실패했습니다.");
    }
  };

  // ✅ 실제 삭제 함수
  const clickDelete = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    openModal({
      title: "정말 삭제하겠습니까?",
      description: "삭제 후 데이터는 복구하기 어려울 수 있습니다.",
      footer: <ModalFooter onCancel={closeModal} onConfirm={handleDelete} />,
    });
  };

   // ✅ 수정 모드 진입
  const clickEdit = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const fetchMessages = async (chat_id: string) => {
    const response = await axios.get("http://localhost:8000/message", {
      params: {
        chat_id: chat_id,
      }
    });

    console.log(response);

    const messages = response.data.messages;

    console.log(messages);

  const formattedMessages = messages.flatMap(
    (item: { question: string; answer: string }, index: number) => [
      { id: index * 2, text: item.question, sender: "user" },
      { id: index * 2 + 1, text: item.answer, sender: "bot" },
    ]
  );

  onClickItem(formattedMessages);
};

  return (
    <button
        className={cn(
        "w-full text-left flex items-center justify-between text-sm p-3 group rounded-lg transition-colors",
        "text-zinc-700 hover:bg-zinc-200 hover:text-black"
        )}
        onClick={() => fetchMessages(item.id)}
    >

      {/* label 영역 */}
      <div className="flex items-center gap-2">
        {icon}{" "}
        {isEditMode ? (
          <input
            value={value}
            onChange={handleChange}
            onClick={(event) => event.preventDefault()}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-transparent border border-zinc-400 rounded-lg px-2 py-1"
            ref={inputRef}
          />
        ) : (
          <div className="w-[180px] truncate">{label}</div>
        )}
      </div>
      {/* 드롭다운 메뉴 영역 */}
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis
                className={cn(
                  "group-hover:block text-gray-400 hover:text-white",
                  isMenuOpen ? "block text-white" : "md:hidden text-gray-400"
                )}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2" onClick={clickEdit}>
              <Pencil size={18} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={clickDelete}>
              <Trash size={18} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </button>
  );
}