import InfoPage from "@/components/InfoPage";
import { fpsPage } from "@/data/fps";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: fpsPage.title,
  description: fpsPage.description,
  path: fpsPage.path,
});

export default function SixtyFpsPage() {
  return <InfoPage data={fpsPage} />;
}
