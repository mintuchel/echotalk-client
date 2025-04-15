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
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
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
    href: string;
    icon: ReactNode;
    label: string;
  };
  onClickItem: (messages: Message[]) => void;
};

export default function ChatSidebarItem({ item, onClickItem }: Props) {
  const { id, href, icon, label } = item;
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
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
        // await updateConversation(id, value);
      } catch (error) {
        console.error(error);
        // toast.error("이름 수정에 실패하였습니다.");
      }
    }
  };

  // ✅ 삭제 버튼 클릭 시 모달 띄우기
  const handleDelete = async () => {
    try {
      // await deleteConversation(id);
      // toast.success("삭제에 성공했습니다.");

      if (params.conversationId === id) {
        // navigate(BASE_URL);
      }

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

  // ✅ 메시지 가져오기
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/chat/${item.id}`);
      const history = response.data.history;

      if (history) {
        const formattedMessages = history.flatMap(
          (item: { question: string; answer: string }, index: number) => [
            { id: index * 2, text: item.question, sender: "user" as const },
            { id: index * 2 + 1, text: item.answer, sender: "bot" as const },
          ]
        );

        onClickItem(formattedMessages);
      }
    } catch (error) {
      console.error("메시지 불러오기 실패:", error);
    }
  };

  return (
    <Link
  to={href}
  className={cn(
    "flex items-center justify-between text-sm p-3 group rounded-lg transition-colors",
    location.pathname === href
      ? "bg-zinc-300 text-black font-medium"
      : "text-zinc-700 hover:bg-zinc-200 hover:text-black"
  )}
  onClick={fetchMessages}
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
    </Link>
  );
}