"use client";
import { useEffect, useState } from "react";
import AddSnippetButton from "./add-snippet-button";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

type Snippet = {
  id: string;
  user_id: string;
  name: string;
};

export default function SnippetDashboard({ userId, userEmail }: { userId: string; userEmail: string }) {
  const [snippets, setSnippets] = useState<Snippet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchSnippets() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
  .from("snippets")
  .select("id, user_id, name")
  .eq("user_id", userId);
    setSnippets(data ?? []);
    setError(error ? error.message : null);
    setLoading(false);
  }

  useEffect(() => {
    fetchSnippets();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="w-full max-w-3xl bg-base-100 shadow-xl p-8 card">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Code Snippets</h1>
      <p className="text-center mb-6">
        You are logged in as <span className="font-mono">{userEmail}</span>.
      </p>
      <AddSnippetButton userId={userId} onAdd={fetchSnippets} />
      <div className="flex flex-col gap-4">
        {error ? (
          <div className="alert alert-error">Error loading snippets: {error}</div>
        ) : loading ? (
          <div className="text-center text-base opacity-70">Loading...</div>
        ) : Array.isArray(snippets) && snippets.length > 0 ? (
          <ul className="divide-y divide-base-300">
            {snippets.map((snippet) => (
              <li key={snippet.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg">{snippet.name}</div>
                  <div className="text-xs opacity-70">Snippet ID: {snippet.id} • User ID: {snippet.user_id}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-base opacity-70">No code snippets found. Start by adding a new one!</div>
        )}
      </div>
    </div>
  );
}
