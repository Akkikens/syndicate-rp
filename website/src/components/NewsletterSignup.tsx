"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

// `ready` is false when RESEND_API_KEY is missing (decided on the server and
// passed in), which renders a disabled "coming soon" state instead of failing.
// `compact` is the footer variant. The status line has a reserved height so
// success and error messages never shift the layout.
export default function NewsletterSignup({
  ready,
  compact = false,
}: {
  ready: boolean;
  compact?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  // When the form appeared; sent as `t` so the server can reject instant posts.
  const shownAt = useRef(0);

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          t: shownAt.current,
        }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      setStatus(data.ok ? "ok" : "error");
      setMessage(data.message);
      if (data.ok) form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  }

  const inputId = `${id}-email`;
  const statusId = `${id}-status`;

  return (
    <div className={compact ? "" : "neon-card rounded-md p-5 sm:p-6"}>
      <form action="/api/newsletter" method="post" onSubmit={onSubmit}>
        <label htmlFor={inputId} className="eyebrow block">
          Email address
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id={inputId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={!ready}
            placeholder={ready ? "you@example.com" : "Coming soon"}
            aria-describedby={statusId}
            className="min-w-0 flex-1 rounded-md border border-line bg-panel px-4 py-3 text-cream placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-60"
          />
          {/* Honeypot: hidden from people and assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button
            type="submit"
            disabled={!ready || status === "sending"}
            className="btn btn-vice shrink-0 px-6 disabled:opacity-60"
          >
            {ready ? (status === "sending" ? "Subscribing…" : "Subscribe") : "Coming soon"}
          </button>
        </div>
        <p className="mt-3 text-xs text-muted">
          Occasional GTA VI news.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-cream">
            Unsubscribe any time.
          </Link>
        </p>
        <p
          id={statusId}
          aria-live="polite"
          role="status"
          className={`mt-2 min-h-[2.5rem] text-sm ${status === "error" ? "text-sunset" : "text-teal"}`}
        >
          {!ready && status === "idle"
            ? "The newsletter is coming soon."
            : message}
        </p>
      </form>
    </div>
  );
}
