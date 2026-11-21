import InfoPage from "@/components/InfoPage";
import { requirementsPage } from "@/data/requirements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: requirementsPage.title,
  description: requirementsPage.description,
  path: requirementsPage.path,
});

export default function SystemRequirementsPage() {
  return <InfoPage data={requirementsPage} />;
}
