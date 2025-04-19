"use client";
import { useState } from "react";

import PrismCodeBlock from "./prism-code-block";
import PublicSnippetModal from "./public-snippet-modal";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  created_at: string;
  is_public?: boolean;
  user_id?: string;
}

export default function PublicSnippetSearchList({ snippets }: { snippets: Snippet[] }) {
  // Search/filter state
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const allLanguages = Array.from(new Set(snippets.map(s => s.language))).filter(Boolean);
  // Only public snippets
  let filteredSnippets = snippets.filter(s => s.is_public !== false);
  const [modalSnippet, setModalSnippet] = useState<Snippet | null>(null);
  if (languageFilter !== "all") {
    filteredSnippets = filteredSnippets.filter(s => s.language === languageFilter);
  }
  if (search.trim() !== "") {
    filteredSnippets = filteredSnippets.filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.language.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col items-center mb-8 gap-4">
        <div className="w-full flex justify-center">
          <select
            className="select select-bordered select-sm min-w-[200px]"
            value={languageFilter}
            onChange={e => setLanguageFilter(e.target.value)}
          >
            <option value="all">All languages</option>
            {allLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search snippets"
          className="input input-bordered input-lg w-full max-w-xl"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {filteredSnippets.length ? filteredSnippets.map(snippet => (
          <div
            key={snippet.id}
            className="card bg-base-200 shadow-md p-4 cursor-pointer hover:ring-2 hover:ring-primary transition"
            onClick={() => setModalSnippet(snippet)}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">{snippet.title}</div>
              </div>
              <div className="text-xs opacity-70">{snippet.language} • {new Date(snippet.created_at).toLocaleString()}</div>
              <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={5} />
              <div className="text-xs opacity-60 mt-1">Public: Yes</div>
            </div>
          </div>
        )) : (
          <div className="text-center text-base opacity-70 col-span-2">No public snippets found.</div>
        )}
      </div>
      <PublicSnippetModal
        snippet={modalSnippet}
        open={!!modalSnippet}
        onClose={() => setModalSnippet(null)}
      />
    </div>
  );
}
