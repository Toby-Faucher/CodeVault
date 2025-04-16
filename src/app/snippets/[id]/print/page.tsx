import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import PrintSnippetClient from "./PrintSnippetClient";

export default async function PrintSnippetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
  const { data, error } = await supabase
    .from("snippets")
    .select("id, title, code, language, is_public, created_at")
    .eq("id", id)
    .single();

  if (error || !data || !data.is_public) {
    notFound();
  }

  return <PrintSnippetClient snippet={data} />;
}
