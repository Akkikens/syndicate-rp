"use client";

import { useState } from "react";
import { site } from "@/config/site";

export default function CopyConnect() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.server.connectCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — user can select the text manually.
    }
  }

  return (
    <div className="neon-card flex flex-col gap-3 rounded-md p-4 sm:flex-row sm:items-center sm:justify-between">
      <code className="font-mono text-sm text-teal">
        {site.server.connectCommand}
      </code>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 btn btn-vice px-4 py-2"
      >
        {copied ? "Copied ✓" : "Copy connect"}
      </button>
    </div>
  );
}
