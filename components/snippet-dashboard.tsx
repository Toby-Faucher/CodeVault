"use client";
import { useEffect, useState } from "react";
import AddSnippetModal from "./add-snippet-modal";
import AddFolderModal from "./add-folder-modal"; // Import AddFolderModal
import { createBrowserClient } from "@supabase/ssr";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import PrismCodeBlock from "./prism-code-block";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";
import FilterBar from "./FilterBar";
import FolderGrid from "./FolderGrid";
import FolderDropdown from "./FolderDropdown";
import SnippetGrid from "./SnippetGrid";
import ToastStack from "./ToastStack";

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

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function SnippetDashboard({ userId }: { userId: string }) {
  // ...all state and logic above...

  const router = useRouter();
  function handlePrintSnippet(snippet: Snippet) {
    window.open(`/snippets/${snippet.id}/print`, '_blank');
  }

  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [showFoldersOpen, setShowFoldersOpen] = useState<boolean>(true);
  const [showSnippetsOpen, setShowSnippetsOpen] = useState<boolean>(true);
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

  // Filter and search state
  const [search, setSearch] = useState("");
  const [folderFilter, setFolderFilter] = useState<string>("root");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [visibilityFilter, setVisibilityFilter] = useState<string>("all");

  // Gather all unique languages for the filter dropdown
  const allLanguages = Array.from(new Set(snippets.map(s => s.language))).filter(Boolean);

  // Determine which snippets to search/filter
  let filteredSnippets: Snippet[] = snippets;
  // If in a folder, always show only that folder's snippets, then apply filters and search
  if (selectedFolder) {
    filteredSnippets = snippets.filter(s => s.folder_id === selectedFolder);
    if (languageFilter !== "all") {
      filteredSnippets = filteredSnippets.filter(s => s.language === languageFilter);
    }
    if (visibilityFilter !== "all") {
      filteredSnippets = filteredSnippets.filter(s => visibilityFilter === "public" ? s.is_public : !s.is_public);
    }
    // Apply search filter only if search is not empty
    if (search.trim() !== "") {
      filteredSnippets = filteredSnippets.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.language.toLowerCase().includes(search.toLowerCase())
      );
    }
  } else {
    if (folderFilter === "root") {
      filteredSnippets = filteredSnippets.filter(s => !s.folder_id);
    } else if (folderFilter !== "root") {
      filteredSnippets = filteredSnippets.filter(s => s.folder_id === folderFilter);
    }
    if (languageFilter !== "all") {
      filteredSnippets = filteredSnippets.filter(s => s.language === languageFilter);
    }
    if (visibilityFilter !== "all") {
      filteredSnippets = filteredSnippets.filter(s => visibilityFilter === "public" ? s.is_public : !s.is_public);
    }
    // Apply search filter only if search is not empty
    if (search.trim() !== "") {
      filteredSnippets = filteredSnippets.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.language.toLowerCase().includes(search.toLowerCase())
      );
    }
  }

  // The final visibleSnippets list
  const visibleSnippets = filteredSnippets;

  return (
    <>
      <ToastStack
        showAddToast={showAddToast}
        showEditToast={showEditToast}
        showDeleteToast={showDeleteToast}
        showFolderAddToast={showFolderAddToast}
        showFolderDeleteToast={showFolderDeleteToast}
      />
      <main className="flex flex-col min-h-screen min-h-screen bg-base-200">
        <div className="navbar bg-base-100 border-b border-base-300 px-8" style={{ minWidth: 1200, maxWidth: 1200, margin: '0 auto' }}>
          <div className="navbar-start">
            <Link href="/" className="btn btn-ghost normal-case text-lg flex items-center gap-2" style={{ cursor: 'pointer', padding: 0 }}>
              <Image
  src="/static/logo.svg"
  alt="CodeVault Logo"
  height={40}
  width={85} // Adjust width to match your logo's natural aspect ratio
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
        <div className="flex-1 flex flex-col items-center py-8 px-2">
          {/* Top Bar */}
          {/* Main Layout */}
          <div className="flex flex-1 w-full max-w-[1200px] min-w-[700px] mx-auto mt-8 gap-8" style={{ minWidth: 700, maxWidth: 1200 }}>
            {/* Main Content - full width, no sidebar */}
            <div className="flex-1">
              {/* Filters above Search Bar */}
              {selectedFolder && (
                <div className="w-full max-w-xl flex justify-start mb-2">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setSelectedFolder(null)}
                  >
                    ← Back to Root
                  </button>
                </div>
              )}
              <FilterBar
                folders={folders}
                selectedFolder={selectedFolder}
                folderFilter={folderFilter}
                setFolderFilter={setFolderFilter}
                languageFilter={languageFilter}
                setLanguageFilter={setLanguageFilter}
                allLanguages={allLanguages}
                visibilityFilter={visibilityFilter}
                setVisibilityFilter={setVisibilityFilter}
                search={search}
                setSearch={setSearch}
                setSelectedFolder={setSelectedFolder}
              />
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-2xl font-bold mb-1 text-base-content">Snippet Library</div>
                  {/* Folder name and settings cog on same row if in a folder */}
                  {selectedFolder && (
                    <div className="flex items-center gap-2 mb-1 mt-2">
                      <span className="text-lg font-semibold text-primary">
                        {folders.find(f => f.id === selectedFolder)?.name || ""}
                      </span>
                      {!showDeleteFolderDialog && (
                        <FolderDropdown
                          open={folderDropdownOpen}
                          setOpen={setFolderDropdownOpen}
                          onEdit={() => {
                            const folder = folders.find(f => f.id === selectedFolder);
                            setEditFolderName(folder?.name || "");
                            setShowEditFolderDialog(true);
                            setFolderDropdownOpen(false);
                          }}
                          onPrint={() => {
                            window.open(`/snippets/print-folder?folder=${selectedFolder}`, '_blank');
                            setFolderDropdownOpen(false);
                          }}
                          onDelete={() => {
                            setShowDeleteFolderDialog(true);
                            setFolderDropdownOpen(false);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 ml-auto">
                  <button className="btn btn-success" onClick={() => setAddModalOpen(true)}>
                    + Add Snippet
                  </button>
                  {/* Only show '+ New Folder' if not in a folder */}
                  {!selectedFolder && (
                    <button className="btn btn-primary" onClick={() => setAddFolderOpen(true)}>
                      + New Folder
                    </button>
                  )}
                </div>
              </div>
              {/* Folder/Snippet toggles replaced by contextual arrows */}
              {/* Folders Arrow Toggle (root view only, above folders grid) */}
              {!selectedFolder && folders.length > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => setShowFoldersOpen(v => !v)}
                    aria-label={showFoldersOpen ? "Hide Folders" : "Show Folders"}
                  >
                    {showFoldersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <span className="font-semibold">Folders</span>
                </div>
              )}
              {/* Folders grid (only in root view) */}
              {!selectedFolder && folders.length > 0 && showFoldersOpen && (
                <FolderGrid folders={folders} setSelectedFolder={setSelectedFolder} />
              )}
              {/* Snippets Arrow Toggle (root view only, above snippets grid) */}
              {!selectedFolder && (
                <div className="flex items-center gap-2 mb-2 mt-6">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => setShowSnippetsOpen(v => !v)}
                    aria-label={showSnippetsOpen ? "Hide Snippets" : "Show Snippets"}
                  >
                    {showSnippetsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <span className="font-semibold">Snippets</span>
                </div>
              )}
              {/* Snippet cards grid - only render once! */}
              {((!selectedFolder && showSnippetsOpen) || selectedFolder) && (
                <SnippetGrid
                  snippets={[...visibleSnippets].reverse()}
                  loading={loading}
                  error={error}
                  onOpenSnippet={setModalSnippet}
                />
              )}

              {/* Edit Folder Dialog */}
              {showEditFolderDialog && selectedFolder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-base-100 border-2 border-primary rounded-xl shadow-xl p-8 max-w-sm w-full relative">
                    <h3 className="text-xl font-bold mb-2">Edit Folder</h3>
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
                      <div className="flex gap-2 mt-4">
                        <button
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
                          if (selectedFolder) {
                            setShowDeleteFolderDialog(false);
                            await handleDeleteFolderConfirmed(selectedFolder);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              
              )}
            </div>
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
                                className="btn btn-outline btn-sm w-full flex items-center gap-2"
                                onClick={() => handlePrintSnippet(modalSnippet)}
                              >
                                Print Snippet
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
      </div>
      </div>
    </main>
  </>
  );
}

export default SnippetDashboard;
