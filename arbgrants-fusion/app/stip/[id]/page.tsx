import { getStipDocument, getStipDocuments } from "@/services/powerhouse";
import { GranteeDetail } from "@/components/GranteeDetail";

export async function generateStaticParams() {
  const { items } = await getStipDocuments({ limit: 500 });
  return items.map((item) => ({ id: item.id }));
}

export default async function StipGranteePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const document = await getStipDocument(id);
  return <GranteeDetail program="stip" state={document.state} />;
}
