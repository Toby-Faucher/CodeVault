"use client";
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(
  () => import("@monaco-editor/react"),
  { ssr: false }
);

export default function MonacoCodeEditor({
  value,
  language,
  onChange,
  height = 250,
  options = {}
}: {
  value: string;
  language?: string;
  onChange: (value: string) => void;
  height?: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
}) {
  return (
    <div className="w-full border rounded-lg overflow-hidden bg-base-200">
      <MonacoEditor
        value={value}
        language={language}
        onChange={(val: string | undefined) => onChange(val ?? "")}
        height={height}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          ...options
        }}
      />
    </div>
  );
}
