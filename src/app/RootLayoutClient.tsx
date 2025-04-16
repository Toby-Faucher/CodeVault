"use client";
import { usePathname } from "next/navigation";
import UserBubble from "../../components/user-bubble";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide UserBubble and promos on all /snippets/[id]/print and /snippets/print-folder routes
  const isPrintPage = /^\/snippets\/(.+)\/print/.test(pathname) || pathname.startsWith("/snippets/print-folder");
  return (
    <>
      {!isPrintPage && (
        <div className="fixed top-4 right-4">
          <UserBubble />
        </div>
      )}
      {children}
    </>
  );
}
