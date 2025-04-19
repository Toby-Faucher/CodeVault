"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForkSnippetButton({ snippet }: { snippet: { id: string; title: string; code: string; language: string } }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleFork() {
    setLoading(true);
    setError(null);
    try {
      // Dynamically import supabase client to avoid SSR issues
      const { createBrowserClient } = await import("@supabase/ssr");
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
      if (!accessToken) {
        setError("You must be logged in to fork a snippet.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/snippets/fork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: snippet.title + " (fork)",
          code: snippet.code,
          language: snippet.language,
          forked_from: snippet.id,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fork snippet");
      router.push(`/dashboard?forked=${json.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fork snippet");
      } else {
        setError("Failed to fork snippet");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button className="btn btn-accent" onClick={handleFork} disabled={loading}>
        {loading ? "Forking..." : "Fork Snippet"}
      </button>
      {error && <div className="text-error mt-2 text-sm w-full text-center">{error}</div>}
    </>
  );
}
