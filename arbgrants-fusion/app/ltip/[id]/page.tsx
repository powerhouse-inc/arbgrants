import { getLtipDocument, getLtipDocuments } from "@/services/powerhouse";
import { GranteeDetail } from "@/components/GranteeDetail";

export async function generateStaticParams() {
  const { items } = await getLtipDocuments({ limit: 500 });
  return items.map((item) => ({ id: item.id }));
}

export default async function LtipGranteePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const document = await getLtipDocument(id);
  return <GranteeDetail program="ltip" state={document.state} />;
}
