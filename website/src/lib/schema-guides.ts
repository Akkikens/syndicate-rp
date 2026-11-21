import { absoluteUrl } from "@/lib/seo";
import { site } from "@/config/site";

// HowTo JSON-LD for procedural guides. Required by Google: name and step[].text.
export function howToSchema(
  path: string,
  howTo: { name: string; steps: { name: string; text: string }[] },
) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    url,
    inLanguage: "en-US",
    step: howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// CollectionPage + ItemList for the /guides hub.
export function guidesListSchema(
  items: { path: string; name: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GTA 6 guides",
    url: absoluteUrl("/guides"),
    isPartOf: { "@id": `${site.domain}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.name,
        url: absoluteUrl(g.path),
      })),
    },
  };
}
