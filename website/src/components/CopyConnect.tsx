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

  // Server not deployed yet — show a launch state instead of a dead connect link.
  if (!site.server.live) {
    return (
      <div className="neon-card flex flex-col gap-3 rounded-md p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sunset" />
          </span>
          <span className="font-mono text-sm text-cream">
            Server launching soon
          </span>
        </div>
        <a
          href={site.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 btn btn-vice px-4 py-2"
        >
          Get the go-live alert
        </a>
      </div>
    );
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
