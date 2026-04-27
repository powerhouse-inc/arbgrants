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
  const [document, list] = await Promise.all([
    getStipDocument(id),
    getStipDocuments({ limit: 500 }),
  ]);
  const grantees = list.items
    .map((item) => ({
      id: item.id,
      name: item.state.granteeName?.trim() || "Untitled grantee",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <GranteeDetail
      program="stip"
      id={id}
      state={document.state}
      grantees={grantees}
    />
  );
}
