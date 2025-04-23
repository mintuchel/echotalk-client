import { Plus } from "lucide-react";
import ChatSidebarItem from "./ChatSidebarItem";
import { AddChatButtonProp } from "@/types/props";

export default function AddChatButton({ onClick }: AddChatButtonProp) {
    return (
        <ChatSidebarItem
            item={{
                id: "new",
                icon: <Plus />,
                label: "새로운 대화",
            }}
            onClickItem={onClick}
        />
    )
}