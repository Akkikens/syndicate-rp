import InfoPage from "@/components/InfoPage";
import { onlinePage } from "@/data/online";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: onlinePage.title,
  description: onlinePage.description,
  path: onlinePage.path,
});

export default function OnlinePage() {
  return <InfoPage data={onlinePage} />;
}
