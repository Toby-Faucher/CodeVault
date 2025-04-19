"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PrismCodeBlock from "./prism-code-block";
import ForkSnippetButton from "./fork-snippet-button";
import OpenSnippetTabButton from "./open-snippet-tab-button";
import PrintSnippetButton from "./print-snippet-button";

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  created_at: string;
  is_public?: boolean;
  user_id?: string;
}

export default function PublicSnippetModal({ snippet, open, onClose }: {
  snippet: Snippet | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!snippet) return null;
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-base-100 p-8 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold mb-2">
                  {snippet.title}
                </Dialog.Title>
                <div className="mb-2 text-xs opacity-70">
                  {snippet.language} • {new Date(snippet.created_at).toLocaleString()}
                </div>
                <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={30} />
                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end items-stretch w-full">
                  <div className="flex flex-col sm:flex-row gap-2 sm:justify-end items-stretch w-full">
                    <ForkSnippetButton snippet={snippet} aria-label="Fork snippet" />
                    <OpenSnippetTabButton snippetId={snippet.id} aria-label="Open snippet in new tab" />
                    <PrintSnippetButton snippetId={snippet.id} aria-label="Print snippet" />
                    <button
                      className="btn btn-primary"
                      aria-label="Close snippet modal"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
