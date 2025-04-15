"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function AddFolderModal({ userId, open, onClose, onAdd }: {
  userId: string;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("folders").insert([
      { user_id: userId, name }
    ]);
    setLoading(false);
    if (error) setError(error.message);
    else {
      setName("");
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all border-4 border-primary/30">
                <Dialog.Title as="h3" className="text-2xl font-bold mb-4">Add New Folder</Dialog.Title>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Folder name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                  {error && <div className="alert alert-error">{error}</div>}
                  <div className="flex gap-2 mt-2">
                    <button type="button" className="btn flex-1" onClick={onClose} disabled={loading}>Cancel</button>
                    <button type="submit" className="btn btn-primary flex-1" disabled={loading}>
                      {loading ? "Adding..." : "Add Folder"}
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
