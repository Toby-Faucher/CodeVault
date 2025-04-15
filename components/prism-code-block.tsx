"use client";
import React, { useEffect, useRef } from "react";

export default function PrismCodeBlock({ code, language, maxLines = 0 }: { code: string; language?: string; maxLines?: number }) {
  const ref = useRef<HTMLElement>(null);

  // Truncate code to maxLines if specified
  let displayCode = code;
  if (maxLines > 0) {
    const lines = code.split("\n");
    if (lines.length > maxLines) {
      displayCode = lines.slice(0, maxLines).join("\n") + "\n...";
    }
  }

  useEffect(() => {
    let isMounted = true;
    async function loadAndHighlight() {
      const Prism = (await import("prismjs")).default || (await import("prismjs"));
      await import("prismjs/themes/prism.css");
      try {
        if (language && !Prism.languages[language]) {
          await import(`prismjs/components/prism-${language}`);
        }
      } catch {
        await import("prismjs/components/prism-javascript");
      }
      if (isMounted && ref.current) {
        Prism.highlightElement(ref.current);
      }
    }
    loadAndHighlight();
    return () => { isMounted = false; };
  }, [displayCode, language]);

  return (
    <pre className="bg-base-100 rounded p-2 mt-2 text-sm overflow-x-auto max-h-48">
      <code ref={ref} className={`language-${language ?? "javascript"}`}>{displayCode}</code>
    </pre>
  );
}
