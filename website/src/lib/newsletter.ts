import { Resend } from "resend";

// Server-only newsletter logic, used by /api/newsletter.
//
// Resend model (docs checked 2026-11-21): contacts are global per team and
// segments (formerly audiences) only group contacts for broadcasts. Creating a
// contact is an upsert and RESETS `unsubscribed` to false, even when the field
// is omitted (verified against the live API). So we look the address up first
// and never touch an existing contact: this keeps signup idempotent and means
// re-submitting an address can never re-subscribe someone who unsubscribed.

export const isNewsletterConfigured = () => Boolean(process.env.RESEND_API_KEY);

export const MAX_EMAIL_LENGTH = 254;
// Faster than a human can read a label and type: treated as a bot.
export const MIN_FILL_MS = 1000;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

export function normaliseEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return null;
  }
  return email;
}

// Best-effort per-IP throttle. State lives in this server instance's memory,
// so on serverless it resets on cold starts and is not shared between
// instances: it blunts casual abuse, it is not a hard limit. Resend's own
// rate limits are the backstop.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function throttled(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

let cachedSegmentId: string | undefined;

// Subscribers go in a segment so broadcasts have a recipient list. Use
// NEWSLETTER_SEGMENT_ID if set, otherwise the segment named "General" that
// Resend creates with the account.
async function segmentId(resend: Resend): Promise<string | undefined> {
  if (process.env.NEWSLETTER_SEGMENT_ID) return process.env.NEWSLETTER_SEGMENT_ID;
  if (cachedSegmentId) return cachedSegmentId;
  const { data, error } = await resend.segments.list();
  if (error) throw new Error(`segments.list failed: ${error.name}`);
  cachedSegmentId = data?.data.find((s) => s.name === "General")?.id;
  return cachedSegmentId;
}

export type SubscribeResult = "ok" | "error";

export async function subscribe(email: string): Promise<SubscribeResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "error";
  try {
    const resend = new Resend(key);

    const existing = await resend.contacts.get({ email });
    if (existing.data) return "ok"; // already on the list: same response
    const notFound =
      existing.error?.name === "not_found" || existing.error?.statusCode === 404;
    if (existing.error && !notFound) {
      throw new Error(`contacts.get failed: ${existing.error.name}`);
    }

    const seg = await segmentId(resend);
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(seg && { segments: [{ id: seg }] }),
    });
    if (error) throw new Error(`contacts.create failed: ${error.name}`);

    await sendWelcomeEmail(resend, email);
    return "ok";
  } catch (err) {
    // Log the failure kind only: never the address or the key.
    console.error(
      "[newsletter] subscribe failed:",
      err instanceof Error ? err.message : "unknown error",
    );
    return "error";
  }
}

// Welcome email: OFF and UNTESTED. The sending domain updates.gta6network.org
// is not verified in Resend yet (DNS records not added), so nothing is sent on
// signup. Once the domain shows "verified", set NEWSLETTER_WELCOME_EMAIL=1 to
// enable it. A failure here never fails the signup.
async function sendWelcomeEmail(resend: Resend, email: string) {
  if (process.env.NEWSLETTER_WELCOME_EMAIL !== "1") return;
  try {
    const { error } = await resend.emails.send({
      from: "GTA 6 Network <news@updates.gta6network.org>",
      to: email,
      subject: "You're on the GTA 6 Network list",
      text: "Thanks for signing up. You'll get occasional GTA VI news from gta6network.org. Every email has an unsubscribe link.",
    });
    if (error) console.error("[newsletter] welcome email failed:", error.name);
  } catch {
    console.error("[newsletter] welcome email failed");
  }
}
