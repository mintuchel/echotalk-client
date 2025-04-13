export function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex items-center justify-center h-screen border-2 border-gray-300">
          {children}
    </div>
  );
}