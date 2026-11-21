"use client";

import { useState } from "react";

// The only client code in the share row: everything else is a plain anchor.
export default function CopyLinkButton({ url }: { url: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <>
      <button type="button" onClick={copy} className={shareClass}>
        {state === "copied" ? "Copied" : "Copy link"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" && "Link copied to clipboard"}
        {state === "failed" && "Could not copy the link"}
      </span>
    </>
  );
}

const shareClass =
  "rounded-full border border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted hover:border-teal hover:text-cream";
