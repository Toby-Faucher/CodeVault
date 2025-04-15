"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrismCodeBlock from "./prism-code-block";

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

  return (
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
  );
}
