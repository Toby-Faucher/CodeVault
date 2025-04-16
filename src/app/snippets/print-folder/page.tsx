import { createServerClient } from "@supabase/ssr";
import PrintFolderClient from "../print-folder/PrintFolderClient";

export default async function PrintFolderPage({ searchParams }: { searchParams: { folder: string } }) {
  const folderId = searchParams.folder;
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
  const { data: folderData, error: folderError } = await supabase
    .from("folders")
    .select("id, name")
    .eq("id", folderId)
    .single();
  const { data: snippets, error: snippetsError } = await supabase
    .from("snippets")
    .select("id, title, code, language, is_public, created_at")
    .eq("folder_id", folderId)
    .order("created_at", { ascending: true });
  if (folderError || !folderData) return <div>Folder not found.</div>;
  if (snippetsError) return <div>Error loading snippets.</div>;
  return <PrintFolderClient folder={folderData} snippets={snippets || []} />;
}
