# Newsletter setup (Resend)

The signup form on gta6network.org stores subscribers as contacts in Resend.
This page is the owner's checklist. Nothing is sent on signup yet.

## Where the list lives

- Resend dashboard, Audience / Contacts. Contacts are global to the Resend
  team; the old "Audiences" are now called **Segments** and only group
  contacts for broadcasts.
- New subscribers are added to the segment named **General** (created with
  the account). To use a different segment, set `NEWSLETTER_SEGMENT_ID` in the
  Vercel project env.
- Env vars used: `RESEND_API_KEY` (without it the form shows a disabled
  "coming soon" state), `RESEND_EMAIL_DOMAIN` (informational),
  `NEWSLETTER_SEGMENT_ID` (optional), `NEWSLETTER_WELCOME_EMAIL` (optional).
- Pages are prerendered, so the key is read at build time: after adding or
  removing `RESEND_API_KEY` in Vercel, redeploy for the form state to change.
  The API route itself reads the key at request time.
- Signup is idempotent and never changes an existing contact, so submitting
  the form again cannot re-subscribe someone who unsubscribed. (Resend's
  create-contact call is an upsert that resets `unsubscribed` to false, which
  is why the code looks the address up first.)

## DNS records to verify updates.gta6network.org

Domain id `e9c63c6e-36f4-45c0-b72d-921404fc1119`, region us-east-1, status
`not_started` when fetched (2026-11-21, `GET /domains/{id}`, read-only). Add
these at the DNS host for gta6network.org, then press Verify in the Resend
dashboard (Domains). The host column is as Resend returns it, relative to
`gta6network.org`.

| Purpose | Type | Host / name | Value | Priority | TTL |
|---|---|---|---|---|---|
| DKIM | TXT | `resend._domainkey.updates` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtHaZgQwYx5KnkhTxqfTgr0obSLXJux1sRO5e5vKanG5JuVkQPXbdOjYx2eqRjokL9qU5wqv69rwvXXjnJ2UPPVcvNWm2WXeKFoOS4Ej/XJq34bqhrZkb6nToiODsh2Baakop2+yZlocOAVniM5TwUbjNn7kCl0AEOndB8wvtx/QIDAQAB` | none returned | Auto |
| SPF | CNAME | `rsend.updates` | `rsend.forge.rmta.net` | none returned | Auto |
| SPF | CNAME | `send.updates` | `send.forge.rmta.net` | none returned | Auto |

The API returned no MX records and no priorities for this domain. If the
dashboard shows different or extra records when you open the domain, trust the
dashboard: records can change, and this table is a snapshot.

## Enable the welcome email later

Only after the domain shows **verified** in Resend:

1. Set `NEWSLETTER_WELCOME_EMAIL=1` in the Vercel project env and redeploy.
2. New signups then get a short plain-text welcome from
   `news@updates.gta6network.org` (see `sendWelcomeEmail` in
   `website/src/lib/newsletter.ts`).

This path is **off and untested**: it was written without a verified domain, so
send yourself a test signup right after enabling it. A failed welcome email is
logged and never fails the signup. Existing subscribers are not emailed.

## Send a broadcast

1. Resend dashboard, Broadcasts, Create broadcast.
2. From: an address on `updates.gta6network.org` (needs the verified domain).
3. Recipients: the **General** segment.
4. Keep the unsubscribe link in the body (Resend's template variable
   `{{{RESEND_UNSUBSCRIBE_URL}}}`). The privacy page promises every email has
   one, so do not remove it.
5. Send a test to yourself first, then Send (or schedule).

Contacts who unsubscribe are skipped automatically by Resend.

## Resend API calls the site makes

- `GET /contacts/{email}` (look up the address)
- `GET /segments` (find the "General" segment, cached per server instance)
- `POST /contacts` (create the contact in that segment)
- `POST /emails` only when `NEWSLETTER_WELCOME_EMAIL=1`

## Abuse protection (best effort)

Honeypot field, a minimum time-to-submit check, and an in-memory per-IP
throttle (5 attempts per minute). The throttle lives in each serverless
instance's memory, so it is not shared and resets on cold starts; Resend's own
rate limits are the backstop. Failures are logged without the address or key.
