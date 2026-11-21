import InfoPage from "@/components/InfoPage";
import { crewPage } from "@/data/crew";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: crewPage.title,
  description: crewPage.description,
  path: crewPage.path,
});

export default function CrewPage() {
  return (
    <InfoPage
      data={crewPage}
      cta={{
        eyebrow: "Join the crew",
        title: "A console crew is forming",
        body: "Discord is the hub. Join, say which console you play on, and you will see the first plans when they are posted.",
      }}
    />
  );
}
