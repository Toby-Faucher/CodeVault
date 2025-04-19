import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import PublicSnippetSearchList from "../../../../components/public-snippet-search-list";

export default async function PublicSnippetsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  // Fetch all public snippets
  const { data: snippets, error } = await supabase
    .from("snippets")
    .select("id, title, code, language, created_at, is_public")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <div className="alert alert-error shadow-lg mt-10">
          <span>Error loading public snippets: {error.message}</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-200 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">All Public Snippets</h1>
      <PublicSnippetSearchList snippets={snippets ?? []} />
    </main>
  );
}
