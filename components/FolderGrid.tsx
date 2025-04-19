"use client";
import React from "react";

interface FolderGridProps {
  folders: { id: string; name: string }[];
  setSelectedFolder: (folder: string) => void;
}

const FolderGrid: React.FC<FolderGridProps> = ({ folders, setSelectedFolder }) => (
  <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[1100px] mx-auto" style={{ minWidth: 700, maxWidth: 1100, minHeight: 120 }}>
    <>
      {folders.map(folder => (
        <button
          key={folder.id}
          className="card bg-base-200 border-2 border-primary/20 hover:border-primary p-4 flex flex-row items-center gap-3 cursor-pointer transition-all relative"
          onClick={() => setSelectedFolder(folder.id)}
          style={{ minHeight: 56 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-base-content/70"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7a2 2 0 012-2h3.28a2 2 0 011.6.8l1.44 1.92A2 2 0 0012.72 9H19a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
          <span className="text-lg font-semibold text-base-content">{folder.name}</span>
        </button>
      ))}
      {/* Fill empty grid cells to keep width stable */}
      {Array.from({ length: Math.max(0, 4 - folders.length) }).map((_, i) => (
        <div key={"folder-placeholder-" + i} className="invisible" />
      ))}
    </>
  </div>
);

export default FolderGrid;
