import { useState } from "react";
import { ChatLayout } from "./layout";
import ModelTypeToggle from "./ModelTypeToggle";

export function ChatForm() {
    const [model, setModel] = useState("openai"); // 초기값은 원하는 걸로!

    return (
        <ChatLayout>
            <ModelTypeToggle model={model} setModel={setModel} />
            {/* 다른 컴포넌트나 입력 폼 등이 여기에 올 수 있음 */}
        </ChatLayout>
    );
}
