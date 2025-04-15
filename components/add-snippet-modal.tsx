"use client";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { PRISM_LANGUAGES } from "../utils/prism-language-list";
import MonacoCodeEditor from "./monaco-code-editor";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

interface Folder {
  id: string;
  name: string;
}

interface AddSnippetModalProps {
  userId: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  folders: Folder[];
  defaultFolderId: string | null;
  initialSnippet?: {
    id: string;
    title: string;
    code: string;
    language: string;
    user_id: string;
    is_public: boolean;
    created_at: string;
    updated_at?: string;
    folder_id: string;
  };
  isEdit?: boolean;
}

export default function AddSnippetModal({ userId, open, onClose, onAdd, folders, defaultFolderId, initialSnippet, isEdit }: AddSnippetModalProps) {
  const [title, setTitle] = useState(initialSnippet?.title || "");
  const [code, setCode] = useState(initialSnippet?.code || "");
  const [language, setLanguage] = useState(initialSnippet?.language || "");
  const [languageQuery, setLanguageQuery] = useState("");
  const [isPublic, setIsPublic] = useState(initialSnippet?.is_public ?? true);
  const [folderId, setFolderId] = useState<string | null>(defaultFolderId ?? initialSnippet?.folder_id ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && initialSnippet) {
      setTitle(initialSnippet.title);
      setCode(initialSnippet.code);
      setLanguage(initialSnippet.language);
      setIsPublic(initialSnippet.is_public);
      setFolderId(initialSnippet.folder_id ?? null);
    } else if (open && !initialSnippet) {
      setTitle("");
      setCode("");
      setLanguage("");
      setIsPublic(true);
      setFolderId(defaultFolderId ?? null);
    }
  }, [open, initialSnippet, defaultFolderId]);

  const filteredLanguages = languageQuery === ""
    ? PRISM_LANGUAGES
    : PRISM_LANGUAGES.filter(lang =>
        lang.label.toLowerCase().includes(languageQuery.toLowerCase()) ||
        lang.id.toLowerCase().includes(languageQuery.toLowerCase())
      );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let error;
    if (isEdit && initialSnippet) {
      // Update existing snippet
      const res = await supabase.from("snippets").update({
        title,
        code,
        language,
        is_public: isPublic,
        folder_id: folderId
      }).eq("id", initialSnippet.id);
      error = res.error;
    } else {
      // Insert new snippet
      const res = await supabase.from("snippets").insert([
        {
          user_id: userId,
          title,
          code,
          language,
          is_public: isPublic,
          folder_id: folderId
        }
      ]);
      error = res.error;
    }
    setLoading(false);
    if (error) setError(error.message);
    else {
      setTitle(""); setCode(""); setLanguage(""); setIsPublic(true); setFolderId(defaultFolderId ?? null);
      onAdd();
      onClose();
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 pointer-events-none">
            <div className="absolute inset-0 backdrop-blur transition-opacity" />
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
                <Dialog.Title as="h3" className="text-2xl font-bold mb-4">{isEdit ? "Edit Snippet" : "Add New Snippet"}</Dialog.Title>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                  <label className="block mb-4">
                    <span className="block mb-1 font-bold">Language</span>
                    <Combobox value={language} onChange={val => setLanguage(val ?? "")}> 
                      <div className="relative">
                        <Combobox.Input
                          className="input input-bordered w-full mb-2"
                          displayValue={(id: string) => PRISM_LANGUAGES.find(l => l.id === id)?.label || ""}
                          onChange={e => setLanguageQuery(e.target.value)}
                          placeholder="Search language..."
                          required
                        />
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {filteredLanguages.length === 0 && (
                            <div className="px-4 py-2 text-gray-500">No languages found.</div>
                          )}
                          {filteredLanguages.map(lang => (
                            <Combobox.Option
                              key={lang.id}
                              value={lang.id}
                              className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? "bg-primary text-white" : "text-gray-900"}`}
                            >
                              <span className="block truncate">{lang.label}</span>
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </div>
                    </Combobox>
                  </label>
                  <label className="block mb-1 font-medium">Folder</label>
                  <select
                    className="input input-bordered w-full mb-3"
                    value={folderId || ""}
                    onChange={e => setFolderId(e.target.value || null)}
                  >
                    <option value="">No folder</option>
                    {folders.map(folder => (
                      <option key={folder.id} value={folder.id}>{folder.name}</option>
                    ))}
                  </select>
                  <div>
                    <span className="block mb-1 font-bold">Code</span>
                    <MonacoCodeEditor
                      value={code}
                      language={language || undefined}
                      onChange={setCode}
                      height={250}
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={isPublic}
                      onChange={e => setIsPublic(e.target.checked)}
                    />
                    <span className="font-bold">Public</span>
                  </label>
                  {error && <div className="alert alert-error">{error}</div>}
                  <div className="flex gap-2 mt-2">
                    <button type="button" className="btn flex-1" onClick={onClose} disabled={loading}>Cancel</button>
                    <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                      {loading ? (isEdit ? "Saving..." : "Adding...") : (isEdit ? "Save Changes" : "Add Snippet")}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
