import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  ArbitrumLtipGranteeAction,
  ArbitrumLtipGranteeDocument,
} from "document-models/arbitrum-ltip-grantee/v1";
import {
  assertIsArbitrumLtipGranteeDocument,
  isArbitrumLtipGranteeDocument,
} from "./gen/document-schema.js";

/** Hook to get a ArbitrumLtipGrantee document by its id */
export function useArbitrumLtipGranteeDocumentById(
  documentId: string | null | undefined,
):
  | [ArbitrumLtipGranteeDocument, DocumentDispatch<ArbitrumLtipGranteeAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isArbitrumLtipGranteeDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ArbitrumLtipGrantee document */
export function useSelectedArbitrumLtipGranteeDocument(): [
  ArbitrumLtipGranteeDocument,
  DocumentDispatch<ArbitrumLtipGranteeAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsArbitrumLtipGranteeDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ArbitrumLtipGrantee documents in the selected drive */
export function useArbitrumLtipGranteeDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isArbitrumLtipGranteeDocument);
}

/** Hook to get all ArbitrumLtipGrantee documents in the selected folder */
export function useArbitrumLtipGranteeDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isArbitrumLtipGranteeDocument);
}
