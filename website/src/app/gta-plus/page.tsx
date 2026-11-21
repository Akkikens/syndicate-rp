import InfoPage from "@/components/InfoPage";
import { gtaPlusPage } from "@/data/gtaplus";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: gtaPlusPage.title,
  description: gtaPlusPage.description,
  path: gtaPlusPage.path,
});

export default function GtaPlusPage() {
  return <InfoPage data={gtaPlusPage} />;
}
