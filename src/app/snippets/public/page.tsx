import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import PublicSnippetSearchList from "../../../../components/public-snippet-search-list";
import Link from 'next/link';
import Image from 'next/image';

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
      <>
        <div className="bg-base-200  border-base-300 w-full">
        <div className="navbar max-w-[1200px] mx-auto px-8 bg-base-100">
            <div className="navbar-start">
              <Link href="/" className="btn btn-ghost normal-case text-lg flex items-center gap-2">
                <Image src="/static/logo.svg" alt="CodeVault Logo" height={40} width={85} priority />
                <span className="font-bold">CodeVault</span>
              </Link>
            </div>
            <div className="navbar-center hidden md:flex">
              <ul className="menu menu-horizontal px-1 gap-4">
                <li><Link href="/snippets/public" className="btn btn-ghost btn-sm font-semibold">Public Snippets</Link></li>
                <li><Link href="/dashboard" className="btn btn-ghost btn-sm font-semibold">Dashboard</Link></li>
                <li><Link href="/account" className="btn btn-ghost btn-sm font-semibold">Account</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <main className="min-h-screen flex flex-col items-center justify-center bg-base-200">
          <div className="alert alert-error shadow-lg mt-10">
            <span>Error loading public snippets: {error.message}</span>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="bg-base-200  border-base-300 w-full">
        <div className="navbar max-w-[1200px] mx-auto px-8 bg-base-100">
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost normal-case text-lg flex items-center gap-2" style={{ cursor: 'pointer', padding: 0 }}>
              <Image
                src="/static/logo.svg"
                alt="CodeVault Logo"
                height={40}
                width={85}
                style={{ width: 'auto', height: 40, display: 'inline-block', marginRight: 8 }}
                priority
              />
              <span style={{ fontWeight: 700 }}>CodeVault</span>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 gap-4">
              <li><Link href="/snippets/public" className="btn btn-ghost btn-sm font-semibold">Public Snippets</Link></li>
              <li><Link href="/dashboard" className="btn btn-ghost btn-sm font-semibold">Dashboard</Link></li>
              <li><Link href="/account" className="btn btn-ghost btn-sm font-semibold">Account</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <main className="min-h-screen bg-base-200 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold mb-6">All Public Snippets</h1>
        <PublicSnippetSearchList snippets={snippets ?? []} />
      </main>
    </>
  );
}
