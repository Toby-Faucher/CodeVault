"use client";
import { useEffect } from "react";
import PrismCodeBlock from "../../../../../components/prism-code-block";

type Snippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  is_public: boolean;
  created_at: string;
};

export default function PrintSnippetClient({ snippet }: { snippet: Snippet }) {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const raf = requestAnimationFrame(() => {
      timeout = setTimeout(() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }, 50);
    });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white print:bg-white">
      <div className="w-full max-w-3xl bg-white shadow-none p-8 card mt-10 print:shadow-none print:p-0">
        <h1 className="text-3xl font-bold mb-2 text-center print:text-left">{snippet.title}</h1>
        <div className="text-center text-xs opacity-70 mb-4 print:text-left print:opacity-100">
          {snippet.language} • {new Date(snippet.created_at).toLocaleString()}
        </div>
        <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={0} />
      </div>
    </main>
  );
}
