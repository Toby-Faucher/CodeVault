"use client";

export default function OpenSnippetTabButton({ snippetId }: { snippetId: string }) {
  return (
    <button
      className="btn btn-info"
      onClick={() => window.open(`/snippets/${snippetId}`, '_blank')}
      title="Open in new tab"
    >
      Open in New Tab
    </button>
  );
}
