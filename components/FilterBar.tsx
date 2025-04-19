"use client";
import React from "react";

interface FilterBarProps {
  folders: { id: string; name: string }[];
  selectedFolder: string | null;
  folderFilter: string;
  setFolderFilter: (val: string) => void;
  languageFilter: string;
  setLanguageFilter: (val: string) => void;
  allLanguages: string[];
  visibilityFilter: string;
  setVisibilityFilter: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  setSelectedFolder: (folder: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  folders,
  selectedFolder,
  folderFilter,
  setFolderFilter,
  languageFilter,
  setLanguageFilter,
  allLanguages,
  visibilityFilter,
  setVisibilityFilter,
  search,
  setSearch,
}) => (
  <div className="flex flex-col items-center mb-8 gap-4">
    {selectedFolder == null ? (
      <div className="flex gap-4 w-full max-w-xl min-w-[600px] mx-auto">
        {/* Folder Filter - only show in root view */}
        <select
          className="select select-bordered select-sm w-1/3"
          value={folderFilter}
          onChange={e => setFolderFilter(e.target.value)}
        >
          <option value="root">Root</option>
          {folders.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        {/* Language Filter */}
        <select
          className="select select-bordered select-sm w-1/3"
          value={languageFilter}
          onChange={e => setLanguageFilter(e.target.value)}
        >
          <option value="all">All languages</option>
          {allLanguages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        {/* Visibility Filter */}
        <select
          className="select select-bordered select-sm w-1/3"
          value={visibilityFilter}
          onChange={e => setVisibilityFilter(e.target.value)}
        >
          <option value="all">All visibilities</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
    ) : (
      <div className="w-full flex justify-center gap-4">
        {/* Centered Language and Visibility Filters */}
        <select
          className="select select-bordered select-sm min-w-[200px]"
          value={languageFilter}
          onChange={e => setLanguageFilter(e.target.value)}
        >
          <option value="all">All languages</option>
          {allLanguages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          className="select select-bordered select-sm min-w-[200px]"
          value={visibilityFilter}
          onChange={e => setVisibilityFilter(e.target.value)}
        >
          <option value="all">All visibilities</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
    )}
    <input
      type="text"
      placeholder="Search snippets"
      className="input input-bordered input-lg w-full max-w-xl"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </div>
);

export default FilterBar;
