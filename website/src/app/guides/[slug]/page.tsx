import { notFound } from "next/navigation";
import InfoPage from "@/components/InfoPage";
import JsonLd from "@/components/JsonLd";
import { getGuide, guides } from "@/data/guides";
import { howToSchema } from "@/lib/schema-guides";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: guide.path,
  });
}

export default async function GuidePage({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  return (
    <InfoPage
      data={guide}
      crumbs={[
        { href: "/guides", label: "Guides" },
        { href: guide.path, label: guide.crumb },
      ]}
      extra={
        guide.howTo ? (
          <JsonLd data={howToSchema(guide.path, guide.howTo)} />
        ) : null
      }
    />
  );
}
