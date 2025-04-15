import { createServerClient } from "@supabase/ssr";
import PrismCodeBlock from "../../../../components/prism-code-block";
import { notFound } from "next/navigation";
import { CopySnippetLink } from "../../../../components/copy-snippet-link";
import ForkSnippetButton from "../../../../components/fork-snippet-button";

export default async function PublicSnippetPage({ params }: { params: Promise<{ id: string }> }) {
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="w-full max-w-5xl bg-base-100 shadow-xl p-8 card mt-10">
        <h1 className="text-3xl font-bold mb-2 text-center">{data.title}</h1>
        <div className="text-center text-xs opacity-70 mb-4">
          {data.language} • {new Date(data.created_at).toLocaleString()}
        </div>
        <PrismCodeBlock code={data.code} language={data.language} maxLines={0} />
        <CopySnippetLink url={`http://localhost:3000/snippets/${data.id}`} />
        <ForkSnippetButton snippet={{
          id: data.id,
          title: data.title,
          code: data.code,
          language: data.language,
        }} />
      </div>
    </main>
  );
}
