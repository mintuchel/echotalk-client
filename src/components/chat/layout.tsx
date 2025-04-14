export function ChatLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  // children 배열 구조 분해: Sidebar + 나머지
  const [sidebar, ...content] = Array.isArray(children) ? children : [children];

  return (
<div className="flex justify-center items-center h-screen">
      <div className="flex">
        {sidebar}
        {/* 오른쪽: Header + ChatBox */}
        <div className="flex flex-col">
          {content}
        </div>
      </div>
    </div>
  );
}