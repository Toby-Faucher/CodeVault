"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrismCodeBlock from "./prism-code-block";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  created_at: string;
  is_public?: boolean;
  user_id?: string;
}

export default function PublicSnippetList({ snippets }: { snippets: Snippet[] }) {
  const [modalSnippet, setModalSnippet] = useState<Snippet | null>(null);
  const router = useRouter();

  return (
    <>
      {/* Dashboard-style Navbar */}
      <div className="navbar bg-base-100 border-b border-base-300 px-8" style={{ minWidth: 1200, maxWidth: 1200, margin: '0 auto' }}>
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
            <li>
              <button className="btn btn-ghost btn-sm font-semibold" onClick={() => router.push('/snippets/public')}>
                Public Snippets
              </button>
            </li>
            <li><button className="btn btn-ghost btn-sm font-semibold" onClick={() => router.push('/dashboard')}>Dashboard</button></li>
            <li><button className="btn btn-ghost btn-sm font-semibold" onClick={() => router.push('/account')}>Account</button></li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-sm font-semibold" onClick={async () => {
            await supabase.auth.signOut();
            router.push('/signin');
          }}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {snippets.length ? snippets.map(snippet => (
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
              <div className="text-xs opacity-60 mt-1">Public: {snippet.is_public ? "Yes" : "No"}</div>
            </div>
          </div>
        )) : (
          <div className="text-center text-base opacity-70 col-span-2">No public snippets found.</div>
        )}
      </div>
      {/* Always-on blur when modal is open */}
      {!!modalSnippet && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 backdrop-blur transition-opacity" />
        </div>
      )}
      <Transition.Root show={!!modalSnippet} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setModalSnippet(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            {/* Only vignette is animated */}
            <div className="fixed inset-0 z-50 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30 rounded-none" />
            </div>
          </Transition.Child>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all border-4 border-primary/30">
                  {modalSnippet && (
                    <>
                      <Dialog.Title as="h3" className="text-2xl font-bold mb-2">{modalSnippet.title}</Dialog.Title>
                      <div className="text-xs opacity-70 mb-2">{modalSnippet.language} • {new Date(modalSnippet.created_at).toLocaleString()}</div>
                      <PrismCodeBlock code={modalSnippet.code} language={modalSnippet.language} />
                      <div className="text-xs opacity-60 mb-2">Public: {modalSnippet.is_public ? "Yes" : "No"}</div>
                      <a
                        href={`/snippets/${modalSnippet.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-success w-full mb-2"
                      >
                        View Public Link
                      </a>
                      <button className="btn btn-primary w-full mt-2" onClick={() => setModalSnippet(null)}>Close</button>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  </>
  );
}
