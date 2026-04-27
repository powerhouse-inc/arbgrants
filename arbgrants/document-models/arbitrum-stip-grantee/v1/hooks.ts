import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ArbitrumStipGranteeAction,
  ArbitrumStipGranteeDocument,
} from "document-models/arbitrum-stip-grantee/v1";
import {
  assertIsArbitrumStipGranteeDocument,
  isArbitrumStipGranteeDocument,
} from "./gen/document-schema.js";

/** Hook to get a ArbitrumStipGrantee document by its id */
export function useArbitrumStipGranteeDocumentById(
  documentId: string | null | undefined,
):
  | [ArbitrumStipGranteeDocument, DocumentDispatch<ArbitrumStipGranteeAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isArbitrumStipGranteeDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ArbitrumStipGrantee document */
export function useSelectedArbitrumStipGranteeDocument(): [
  ArbitrumStipGranteeDocument,
  DocumentDispatch<ArbitrumStipGranteeAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsArbitrumStipGranteeDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ArbitrumStipGrantee documents in the selected drive */
export function useArbitrumStipGranteeDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isArbitrumStipGranteeDocument);
}

/** Hook to get all ArbitrumStipGrantee documents in the selected folder */
export function useArbitrumStipGranteeDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isArbitrumStipGranteeDocument);
}
