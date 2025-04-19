"use client";
import React from "react";
import { Settings } from "lucide-react";

interface FolderDropdownProps {
  folderName: string;
  onEdit: () => void;
  onPrint: () => void;
  onDelete: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const FolderDropdown: React.FC<FolderDropdownProps> = ({
  folderName,
  onEdit,
  onPrint,
  onDelete,
  open,
  setOpen,
}) => (
  <div className={`dropdown dropdown-end${open ? ' dropdown-open' : ''}`}> 
    <button
      tabIndex={0}
      className="btn btn-ghost btn-circle"
      title="Folder settings"
      onClick={() => setOpen(!open)}
      onBlur={() => setTimeout(() => setOpen(false), 100)}
    >
      <Settings size={22} />
    </button>
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48 border-2 border-neutral mt-2 z-50"
    >
      <li>
        <button className="btn btn-sm w-full flex items-center gap-2" onClick={onEdit}>
          Edit Folder Name
        </button>
      </li>
      <hr className="my-3"/>
      <li>
        <button className="btn btn-outline btn-sm w-full flex items-center gap-2" onClick={onPrint}>
          Print Folder
        </button>
      </li>
      <hr className="my-3"/>
      <li>
        <button className="btn btn-error btn-sm w-full flex items-center gap-2" onClick={onDelete}>
          Delete Folder
        </button>
      </li>
    </ul>
  </div>
);

export default FolderDropdown;
