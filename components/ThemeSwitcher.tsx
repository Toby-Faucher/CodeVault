"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // On mount, sync theme from localStorage or system preference
  useEffect(() => {
    let initial: string;
    if (typeof window !== "undefined") {
      initial = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", initial);
      setTheme(initial);
      setMounted(true);
    }
  }, []);

  // Sync with global theme changes (e.g. from another switcher or tab)
  useEffect(() => {
    if (!mounted) return;
    const getCurrentTheme = () =>
      (typeof window !== "undefined" && document.documentElement.getAttribute("data-theme")) ||
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      "light";
    const syncTheme = () => setTheme(getCurrentTheme());
    window.addEventListener("storage", syncTheme);
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.removeEventListener("storage", syncTheme);
      observer.disconnect();
    };
  }, [mounted]);

  const toggleTheme = () => {
    if (!theme) return;
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  if (!mounted || !theme) {
    return (
      <span
        className="inline-block w-9 h-9 rounded-full bg-base-300 animate-pulse border border-base-200"
        aria-label="Loading theme switcher"
        style={{ lineHeight: 0 }}
      />
    );
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="bg-base-200 border border-base-300 rounded-full p-2 shadow hover:bg-base-300 transition-colors focus:outline-none"
      style={{ lineHeight: 0 }}
    >
      {theme === "dark" ? (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
      ) : (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500"><circle cx="12" cy="12" r="5" strokeWidth="2"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.02 0l-1.41 1.41M6.46 17.54l-1.41 1.41"/></svg>
      )}
    </button>
  );
}

