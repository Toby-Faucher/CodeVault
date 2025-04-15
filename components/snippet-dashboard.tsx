"use client";
import { useEffect, useState } from "react";
import AddSnippetModal from "./add-snippet-modal";
import { createBrowserClient } from "@supabase/ssr";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import PrismCodeBlock from "./prism-code-block";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

type Snippet = {
  id: string;
  title: string;
  code: string;
  language: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export default function SnippetDashboard({ userId, userEmail }: { userId: string; userEmail: string }) {
  const [snippets, setSnippets] = useState<Snippet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalSnippet, setModalSnippet] = useState<Snippet | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  async function fetchSnippets() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("snippets")
      .select("id, title, code, language, user_id, is_public, created_at, updated_at")
      .eq("user_id", userId);
    setSnippets(data ?? []);
    setError(error ? error.message : null);
    setLoading(false);
  }

  async function handleDelete(snippetId: string) {
    await supabase.from("snippets").delete().eq("id", snippetId);
    fetchSnippets();
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
      <div className="flex flex-col items-center mb-6">
        <button className="btn btn-success" onClick={() => setAddModalOpen(true)}>
          Add New Snippet
        </button>
      </div>
      <AddSnippetModal
        userId={userId}
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={fetchSnippets}
      />
      <div className="flex flex-col gap-4">
        {error ? (
          <div className="alert alert-error">Error loading snippets: {error}</div>
        ) : loading ? (
          <div className="text-center text-base opacity-70">Loading...</div>
        ) : Array.isArray(snippets) && snippets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="card bg-base-200 shadow-md p-4 cursor-pointer hover:ring-2 hover:ring-primary transition"
                onClick={() => setModalSnippet(snippet)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">{snippet.title}</div>
                    <button
                      className="btn btn-xs btn-error ml-2"
                      title="Delete snippet"
                      onClick={(e) => { e.stopPropagation(); handleDelete(snippet.id); }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="text-xs opacity-70">{snippet.language} • {new Date(snippet.created_at).toLocaleString()}</div>
                  <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={5} />
                  <div className="text-xs opacity-60 mt-1">Public: {snippet.is_public ? "Yes" : "No"}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-base opacity-70">No code snippets found. Start by adding a new one!</div>
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
  );
}
