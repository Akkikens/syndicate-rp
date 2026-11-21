import { routes } from "@/config/routes";
import { site } from "@/config/site";
import { guides } from "@/data/guides";
import { news } from "@/data/news";
import { faqs } from "@/data/faq";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// llms.txt: a plain-text map of the site for AI assistants and answer engines,
// generated from the same data as the pages so it never drifts.
export function GET() {
  const body = `# ${site.name}

> ${site.tagline}. Sourced Grand Theft Auto VI news and facts. GTA VI launched ${site.releaseDateLabel} on PS5 and Xbox Series X|S; see /ps5 for the console player guide. Facts last checked ${site.lastUpdatedLabel}.

## Key facts
${faqs
  .slice(0, 10)
  .map((f) => `- ${f.q} ${f.a}`)
  .join("\n")}

## Pages
${routes.map((r) => `- [${r.label}](${absoluteUrl(r.href)})`).join("\n")}

## Guides
${guides.map((g) => `- [${g.title}](${absoluteUrl(g.path)}): ${g.tagline}`).join("\n")}

## Latest news
${news
  .slice(0, 10)
  .map((n) => `- [${n.title}](${absoluteUrl(`/news/${n.slug}`)}) (${n.dateLabel}): ${n.summary}`)
  .join("\n")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
