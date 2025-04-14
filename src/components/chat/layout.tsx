export function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex flex-col items-center justify-center h-screen border-2 border-gray-300">
          {children}
    </div>
  );
}