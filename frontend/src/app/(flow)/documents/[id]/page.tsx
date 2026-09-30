import { DocumentDetailScreen } from "@/components/screens/DocumentDetailScreen";

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  return <DocumentDetailScreen id={params.id} />;
}
