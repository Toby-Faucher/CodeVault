"use client";
import { useState } from "react";

export function CopySnippetLink({ url }: { url: string }) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="mt-4 text-center text-xs opacity-60 relative">
      Public Snippet • <button
        onClick={handleCopy}
        className="underline text-primary hover:text-primary-focus cursor-pointer"
      >
        Copy link
      </button>
      {showToast && (
        <div
          className="fixed bottom-4 right-4 z-50 bg-base-100 text-base-content px-6 py-4 rounded shadow-lg border-2 border-primary animate-pop-up"
          style={{ minWidth: '180px', textAlign: 'center', fontSize: '1.15rem' }}
        >
          <span className="font-semibold text-primary">Link copied!</span>
        </div>
      )}
    </div>
  );
}

// Add animation to global CSS if not present:
// .animate-pop-up { animation: popUp 0.3s cubic-bezier(.18,.89,.32,1.28); }
// @keyframes popUp { 0% { transform: scale(0.85); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
