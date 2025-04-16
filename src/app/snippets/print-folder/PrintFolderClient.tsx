"use client";
import { useEffect } from "react";
import PrismCodeBlock from "../../../../components/prism-code-block";

type Snippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  is_public: boolean;
  created_at: string;
};
type Folder = { id: string; name: string };

export default function PrintFolderClient({ folder, snippets }: { folder: Folder; snippets: Snippet[] }) {
  useEffect(() => {
    // Wait a bit longer to ensure the DOM is fully ready
    const printTimeout = setTimeout(() => {
      if (typeof window !== "undefined") window.print();
    }, 100);
    return () => clearTimeout(printTimeout);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white print:bg-white">
      <div className="w-full max-w-4xl bg-white shadow-none p-8 card mt-10 print:shadow-none print:p-0">
        <h1 className="text-4xl font-bold mb-8 text-center print:text-left">{folder.name}</h1>
        {snippets.length === 0 ? (
          <div className="text-center opacity-60 my-12">No snippets in this folder.</div>
        ) : (
          <div className="flex flex-col gap-14 print:gap-10">
            {snippets.map(snippet => (
              <section key={snippet.id} className="break-inside-avoid-page">
                <h2 className="text-2xl font-semibold mb-2 print:mt-0 print:mb-2">{snippet.title}</h2>
                <div className="text-xs opacity-70 mb-2 print:opacity-100">
                  {snippet.language} • {new Date(snippet.created_at).toLocaleString()}
                </div>
                <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={0} />
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
