"use client";
import React from "react";
import PrismCodeBlock from "./prism-code-block";

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  folder_id: string | null;
}

interface SnippetGridProps {
  snippets: Snippet[];
  loading: boolean;
  error: string | null;
  onOpenSnippet: (snippet: Snippet) => void;
}

const SnippetGrid: React.FC<SnippetGridProps> = ({ snippets, loading, error, onOpenSnippet }) => (
  <div className="w-full flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 w-full max-w-[1100px] mx-auto" style={{ minWidth: 700, maxWidth: 1100, minHeight: 220 }}>
      {error ? (
        <div className="alert alert-error col-span-full">Error loading snippets: {error}</div>
      ) : loading ? (
        <div className="text-center text-base opacity-70 col-span-full">Loading...</div>
      ) : snippets.length === 0 ? (
        <div className="text-center opacity-60 my-12 col-span-full" style={{ minHeight: 60 }}>No snippets found.</div>
      ) : (
        <>
          {[...snippets].reverse().map(snippet => (
            <div
              key={snippet.id}
              className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm flex flex-col relative cursor-pointer hover:ring-2 hover:ring-primary transition"
              onClick={() => onOpenSnippet(snippet)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-base-content">{snippet.title}</div>
                {snippet.is_public && (
                  <span className="text-xs font-semibold rounded px-2 py-1 ml-2 bg-blue-100 text-blue-700">PUBLIC</span>
                )}
              </div>
              <div className="text-xs text-base-content/60 mb-2">{snippet.language} • {new Date(snippet.created_at).toLocaleString()}</div>
              <div className="text-sm text-base-content/80 mb-4">
                <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={5} />
              </div>
              <button className="btn btn-neutral btn-block mt-auto">Open</button>
            </div>
          ))}
          {/* Fill empty grid cells to keep width stable */}
          {Array.from({ length: Math.max(0, 3 - snippets.length) }).map((_, i) => (
            <div key={"placeholder-" + i} className="invisible" />
          ))}
        </>
      )}
    </div>
  </div>
);

export default SnippetGrid;
