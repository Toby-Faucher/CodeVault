"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function AddSnippetButton({ userId, onAdd }: { userId: string; onAdd: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("snippets").insert([
      {
        user_id: userId,
        title: "Hello World Example",
        code: "console.log('Hello, World!');",
        language: "javascript",
        is_public: true
      }
    ]);
    setLoading(false);
    if (error) setError(error.message);
    else onAdd();
  }

  return (
    <div className="flex flex-col items-center mb-6">
      <button className="btn btn-success" onClick={handleAdd} disabled={loading}>
        {loading ? "Adding..." : "Add Example Snippet"}
      </button>
      {error && <div className="alert alert-error mt-2">{error}</div>}
    </div>
  );
}
