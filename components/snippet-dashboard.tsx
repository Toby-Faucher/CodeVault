"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddSnippetModal from "./add-snippet-modal";
import AddFolderModal from "./add-folder-modal"; // Import AddFolderModal
import { createBrowserClient } from "@supabase/ssr";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import PrismCodeBlock from "./prism-code-block";
import { Settings } from "lucide-react";

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
  folder_id: string | null;
};

export default function SnippetDashboard({ userId, userEmail }: { userId: string; userEmail: string }) {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalSnippet, setModalSnippet] = useState<Snippet | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [snippetToEdit, setSnippetToEdit] = useState<Snippet | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFolderOpen, setAddFolderOpen] = useState(false); // Restore addFolderOpen state
  const [deleting, setDeleting] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showAddToast, setShowAddToast] = useState(false);
  const [showEditToast, setShowEditToast] = useState(false);
  const [showFolderAddToast, setShowFolderAddToast] = useState(false);
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showFolderDeleteToast, setShowFolderDeleteToast] = useState(false);
  const [showDeleteFolderDialog, setShowDeleteFolderDialog] = useState(false);
  const [showEditFolderDialog, setShowEditFolderDialog] = useState(false);
  const [editFolderName, setEditFolderName] = useState("");
  const [editFolderLoading, setEditFolderLoading] = useState(false);
  const [folderDropdownOpen, setFolderDropdownOpen] = useState(false);

  async function fetchSnippets() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("snippets")
      .select("id, title, code, language, user_id, is_public, created_at, updated_at, folder_id")
      .eq("user_id", userId);
    setSnippets(data ?? []);
    setError(error ? error.message : null);
    setLoading(false);
  }

  async function fetchFolders() {
    const { data } = await supabase.from("folders").select("id, name").eq("user_id", userId).order("created_at", { ascending: true });
    setFolders(data || []);
  }

  async function handleDelete(snippetId: string) {
    setDeleting(true);
    await supabase.from("snippets").delete().eq("id", snippetId);
    await fetchSnippets();
    setDeleting(false);
    setShowDeleteToast(true);
    setTimeout(() => setShowDeleteToast(false), 2000);
  }

  async function handleDeleteFolderConfirmed(folderId: string) {
    // Delete all snippets in the folder
    await supabase.from("snippets").delete().eq("folder_id", folderId);
    // Delete the folder
    await supabase.from("folders").delete().eq("id", folderId);
    await fetchFolders();
    await fetchSnippets();
    setShowFolderDeleteToast(true);
    setTimeout(() => setShowFolderDeleteToast(false), 2000);
    if (selectedFolder === folderId) setSelectedFolder(null);
  }

  useEffect(() => {
    fetchSnippets();
    fetchFolders();
    // eslint-disable-next-line
  }, []);

  // Only show snippets with no folder in the root view
  const visibleSnippets = selectedFolder
    ? snippets.filter(s => s.folder_id === selectedFolder)
    : snippets.filter(s => !s.folder_id);

  return (
    <div className="w-full max-w-3xl bg-base-100 shadow-xl p-8 card">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Code Snippets</h1>
      <p className="text-center mb-6">
        You are logged in as <span className="font-mono">{userEmail}</span>.
      </p>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {selectedFolder && (
            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedFolder(null)}>
              ← Back
            </button>
          )}
          <h2 className="text-3xl font-bold">
            {selectedFolder ?
              folders.find(f => f.id === selectedFolder)?.name || "Folder"
              : "Your Snippets"}
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-success" onClick={() => setAddModalOpen(true)}>
            + Add Snippet
          </button>
          {!selectedFolder && (
            <button className="btn btn-primary" onClick={() => setAddFolderOpen(true)}>
              + New Folder
            </button>
          )}
        </div>
      </div>
      {/* Folders on top */}
      {!selectedFolder && folders.length > 0 && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {folders.map(folder => (
            <button
              key={folder.id}
              className="card bg-base-200 border-2 border-primary/20 hover:border-primary p-4 flex flex-col items-center cursor-pointer transition-all relative"
              onClick={() => setSelectedFolder(folder.id)}
              style={{ minHeight: 56 }}
            >
              <span className="text-lg font-semibold text-primary">{folder.name}</span>
            </button>
          ))}
        </div>
      )}
      {/* Folder settings cog and delete dialog in folder view */}
      {selectedFolder && !showDeleteFolderDialog && (
        <div className="flex items-center justify-end mb-6 relative">
          <div className={`dropdown dropdown-end${folderDropdownOpen ? ' dropdown-open' : ''}`}> 
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              title="Folder settings"
              onClick={() => setFolderDropdownOpen(open => !open)}
              onBlur={() => setTimeout(() => setFolderDropdownOpen(false), 100)}
            >
              <Settings size={22} />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 border-2 border-neutral mt-2 z-50"
            >
              <li>
                <button
                  className="btn btn-sm w-full flex items-center gap-2"
                  onClick={() => {
                    // Set current folder name for editing
                    const folder = folders.find(f => f.id === selectedFolder);
                    setEditFolderName(folder?.name || "");
                    setShowEditFolderDialog(true);
                    setFolderDropdownOpen(false);
                  }}
                >
                  Edit Folder Name
                </button>
              </li>
              <hr className="my-3"/>
              <li>
                <button
                  className="btn btn-error btn-sm w-full flex items-center gap-2"
                  onClick={() => {
                    setShowDeleteFolderDialog(true);
                    setFolderDropdownOpen(false);
                  }}
                >
                  Delete Folder
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {showEditFolderDialog && selectedFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-base-100 border-2 border-primary rounded-xl shadow-xl p-8 max-w-sm w-full relative">
            <h3 className="text-xl font-bold text-primary mb-2">Edit Folder Name</h3>
            <form
              onSubmit={async e => {
                e.preventDefault();
                setEditFolderLoading(true);
                await supabase.from("folders").update({ name: editFolderName }).eq("id", selectedFolder);
                setEditFolderLoading(false);
                setShowEditFolderDialog(false);
                await fetchFolders();
              }}
            >
              <input
                className="input input-bordered w-full mb-4"
                value={editFolderName}
                onChange={e => setEditFolderName(e.target.value)}
                required
                maxLength={64}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  className="btn"
                  type="button"
                  onClick={() => setShowEditFolderDialog(false)}
                  disabled={editFolderLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={editFolderLoading || !editFolderName.trim()}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteFolderDialog && selectedFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-base-100 border-2 border-error rounded-xl shadow-xl p-8 max-w-sm w-full relative">
            <h3 className="text-xl font-bold text-error mb-2">Delete Folder?</h3>
            <p className="mb-4">This will <b>permanently delete</b> the folder and <b>all snippets inside it</b>. This action cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <button className="btn" onClick={() => setShowDeleteFolderDialog(false)}>Cancel</button>
              <button
                className="btn btn-error"
                onClick={async () => {
                  setShowDeleteFolderDialog(false);
                  await handleDeleteFolderConfirmed(selectedFolder);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Snippets filtered by folder */}
      <div className="flex flex-col items-center mb-6">
      </div>
      <AddSnippetModal
        userId={userId}
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={() => {
          setShowAddToast(true);
          setTimeout(() => setShowAddToast(false), 2000);
          fetchSnippets();
        }}
        folders={folders}
        defaultFolderId={selectedFolder}
      />
      {/* Edit Snippet Modal */}
      <AddSnippetModal
        userId={userId}
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSnippetToEdit(null);
        }}
        onAdd={() => {
          setEditModalOpen(false);
          setSnippetToEdit(null);
          setModalSnippet(null);
          setShowEditToast(true);
          setTimeout(() => setShowEditToast(false), 2000);
          fetchSnippets();
        }}
        folders={folders}
        defaultFolderId={snippetToEdit?.folder_id || null}
        initialSnippet={
          snippetToEdit
            ? { ...snippetToEdit, folder_id: snippetToEdit.folder_id ?? "" }
            : undefined
        }
        isEdit
      />
      <AddFolderModal
        userId={userId}
        open={addFolderOpen}
        onClose={() => setAddFolderOpen(false)}
        onAdd={() => {
          setShowFolderAddToast(true);
          setTimeout(() => setShowFolderAddToast(false), 2000);
          fetchFolders();
        }}
      />
      {error ? (
        <div className="alert alert-error">Error loading snippets: {error}</div>
      ) : loading ? (
        <div className="text-center text-base opacity-70">Loading...</div>
      ) : visibleSnippets.length === 0 ? (
        <div className="text-center opacity-60 my-12">No snippets found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleSnippets.map(snippet => (
            <div
              key={snippet.id}
              className="card bg-base-200 shadow-md p-4 cursor-pointer hover:ring-2 hover:ring-primary transition"
              onClick={() => setModalSnippet(snippet)}
            >
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-lg">{snippet.title}</div>
                <div className="text-xs opacity-70">{snippet.language} • {new Date(snippet.created_at).toLocaleString()}</div>
                <PrismCodeBlock code={snippet.code} language={snippet.language} maxLines={5} />
                <div className="text-xs opacity-60 mt-1">Public: {snippet.is_public ? "Yes" : "No"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
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
                    <div className="relative">
                      <Dialog.Title as="h3" className="text-2xl font-bold mb-2">{modalSnippet.title}</Dialog.Title>
                      <div className="text-xs opacity-70 mb-2">{modalSnippet.language} • {new Date(modalSnippet.created_at).toLocaleString()}</div>
                      <PrismCodeBlock code={modalSnippet.code} language={modalSnippet.language} />
                      <div className="text-xs opacity-60 mb-2">Public: {modalSnippet.is_public ? "Yes" : "No"}</div>
                      {modalSnippet.is_public ? (
                        <a
                          href={`/snippets/${modalSnippet.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-success w-full mb-2"
                        >
                          View Public Link
                        </a>
                      ) : (
                        <button
                          className="btn btn-outline btn-warning w-full mb-2"
                          onClick={async () => {
                            // Make snippet public in Supabase
                            const supabase = await import("@supabase/ssr");
                            const client = supabase.createBrowserClient(
                              process.env.NEXT_PUBLIC_SUPABASE_URL!,
                              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                            );
                            await client.from("snippets").update({ is_public: true }).eq("id", modalSnippet.id);
                            // Optionally: refresh the UI
                            window.location.reload();
                          }}
                        >
                          Go Public
                        </button>
                      )}
                      {/* Cogwheel/settings dropdown in modal */}
                      <div className="absolute top-0 right-0 z-10">
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                            <Settings size={20} />
                          </label>
                          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 border-2 border-neutral mt-2">
                            <li>
                              <button
                                className="btn btn-sm w-full flex items-center gap-2"
                                onClick={() => {
                                  setSnippetToEdit(modalSnippet);
                                  setEditModalOpen(true);
                                }}
                              >
                                Edit Snippet
                              </button>
                            </li>
                            <hr className="my-3"/>
                            <li>
                              <button
                                className="btn btn-error btn-sm w-full flex items-center gap-2"
                                onClick={async () => {
                                  await handleDelete(modalSnippet.id);
                                  setModalSnippet(null);
                                }}
                                disabled={deleting}
                              >
                                {deleting ? "Deleting..." : "Delete Snippet"}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* Skeleton loading remains below for smoothness */}
                      {deleting && (
                        <div className="animate-pulse mt-2">
                          <div className="h-4 bg-base-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-base-200 rounded w-5/6 mb-2"></div>
                          <div className="h-4 bg-base-200 rounded w-2/3"></div>
                        </div>
                      )}
                      <button className="btn btn-primary w-full mt-2" onClick={() => setModalSnippet(null)}>Close</button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <AnimatePresence>
        {showAddToast && (
          <motion.div
            key="add-toast"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
            style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
          >
            <span className="font-semibold text-primary">Snippet added!</span>
          </motion.div>
        )}
        {showEditToast && (
          <motion.div
            key="edit-toast"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
            style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
          >
            <span className="font-semibold text-primary">Snippet updated!</span>
          </motion.div>
        )}
        {showDeleteToast && (
          <motion.div
            key="delete-toast"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
            style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
          >
            <span className="font-semibold text-primary">Snippet deleted!</span>
          </motion.div>
        )}
        {showFolderAddToast && (
          <motion.div
            key="folder-add-toast"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
            style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
          >
            <span className="font-semibold text-primary">Folder added!</span>
          </motion.div>
        )}
        {showFolderDeleteToast && (
          <motion.div
            key="folder-delete-toast"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
            className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary"
            style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
          >
            <span className="font-semibold text-primary">Folder deleted!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
