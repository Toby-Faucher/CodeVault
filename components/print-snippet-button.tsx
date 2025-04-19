"use client";

export default function PrintSnippetButton({ snippetId }: { snippetId: string }) {
  return (
    <button
      className="btn btn-warning"
      onClick={() => window.open(`/snippets/${snippetId}/print`, '_blank')}
      title="Print snippet"
    >
      Print
    </button>
  );
}
