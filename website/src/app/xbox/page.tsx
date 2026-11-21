import InfoPage from "@/components/InfoPage";
import { xboxPage } from "@/data/xbox";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: xboxPage.title,
  description: xboxPage.description,
  path: xboxPage.path,
});

export default function XboxPage() {
  return <InfoPage data={xboxPage} />;
}
