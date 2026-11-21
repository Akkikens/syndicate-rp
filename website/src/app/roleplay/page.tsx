import InfoPage from "@/components/InfoPage";
import { roleplayPage } from "@/data/roleplay";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: roleplayPage.title,
  description: roleplayPage.description,
  path: roleplayPage.path,
});

export default function RoleplayPage() {
  return (
    <InfoPage
      data={roleplayPage}
      cta={{
        eyebrow: "Syndicate RP",
        title: "Roleplay on GTA V today",
        body: "Our server runs on GTA V for PC, and we will look at GTA VI when a PC version and an official multiplayer platform both exist. Join the community to hear when that changes.",
      }}
    />
  );
}
