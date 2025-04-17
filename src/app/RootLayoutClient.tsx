"use client";

import { usePathname } from "next/navigation";
import ThemeSwitcher from "../../components/ThemeSwitcher";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {/* Only show the theme switch button if not on the landing page */}
      {/* Only show the theme switch button if not on the landing page */}
      {pathname !== "/" && (
        <div className="fixed top-3 right-3 z-[100]">
          <ThemeSwitcher />
        </div>
      )}
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}
