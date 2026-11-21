import {
  MIN_FILL_MS,
  isNewsletterConfigured,
  normaliseEmail,
  subscribe,
  throttled,
} from "@/lib/newsletter";

export const dynamic = "force-dynamic";

const MESSAGES = {
  ok: "You're on the list. Watch your inbox for GTA VI news.",
  invalid: "Enter a valid email address.",
  fast: "That was quick. Please press Subscribe again.",
  slow: "Too many attempts. Please wait a minute and try again.",
  error: "Something went wrong. Please try again in a moment.",
  soon: "The newsletter is coming soon.",
};

// The form posts here with fetch (JSON back) and also works as a plain HTML
// form post without JavaScript (small HTML page back).
function reply(request: Request, status: number, ok: boolean, message: string) {
  const wantsHtml = (request.headers.get("accept") ?? "").includes("text/html");
  if (!wantsHtml) {
    return Response.json({ ok, message }, { status, headers: { "Cache-Control": "no-store" } });
  }
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Newsletter</title><style>body{background:#0b0b14;color:#f4efe6;font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem}a{color:#2dd4bf}</style></head><body><p role="status">${message}</p><p><a href="/newsletter">Back to the newsletter page</a></p></body></html>`;
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!isNewsletterConfigured()) return reply(request, 503, false, MESSAGES.soon);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (throttled(ip)) return reply(request, 429, false, MESSAGES.slow);

  let fields: { email?: unknown; website?: unknown; t?: unknown };
  try {
    const type = request.headers.get("content-type") ?? "";
    fields = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return reply(request, 400, false, MESSAGES.invalid);
  }

  // Honeypot: real users never see this field. Bots get a normal-looking
  // success so they don't learn to adapt; nothing is stored.
  if (typeof fields.website === "string" && fields.website.trim() !== "") {
    return reply(request, 200, true, MESSAGES.ok);
  }

  // Time-to-submit: the form stamps the time it appeared. A submit faster than
  // a person could type is refused with a retryable message (not a fake
  // success, so a real user with autofill can just press the button again).
  // Without JavaScript there
  // is no stamp, so a missing value is allowed (progressive enhancement); the
  // honeypot and throttle still apply.
  const stamp = Number(fields.t);
  if (Number.isFinite(stamp) && stamp > 0 && Date.now() - stamp < MIN_FILL_MS) {
    return reply(request, 429, false, MESSAGES.fast);
  }

  const email = normaliseEmail(fields.email);
  if (!email) return reply(request, 400, false, MESSAGES.invalid);

  const result = await subscribe(email);
  return result === "ok"
    ? reply(request, 200, true, MESSAGES.ok)
    : reply(request, 502, false, MESSAGES.error);
}
