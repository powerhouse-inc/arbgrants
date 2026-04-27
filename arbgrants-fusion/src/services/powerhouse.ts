import {
  createClient,
  RemoteControllerOptions,
} from "@powerhousedao/reactor-browser";
import type {
  ArbitrumLtipGranteeGlobalState,
  ArbitrumLtipGranteeAction,
} from "@arbitrum/arbgrants/document-models/arbitrum-ltip-grantee";
import type {
  ArbitrumStipGranteeGlobalState,
  ArbitrumStipGranteeAction,
} from "@arbitrum/arbgrants/document-models/arbitrum-stip-grantee";
import type { PHDocument } from "document-model";

const SWITCHBOARD_URL =
  process.env.PH_SWITCHBOARD_URL || "http://localhost:4001/graphql";

const client = createClient(SWITCHBOARD_URL);

export type GqlDocument<State> = {
  state: State;
  id: string;
  slug?: string | null | undefined;
  name: string;
  documentType: string;
  createdAtUtcIso: string | Date;
  lastModifiedAtUtcIso: string | Date;
  revisionsList: readonly {
    readonly scope: string;
    readonly revision: number;
  }[];
};

export type PagingInput = {
  cursor?: string;
  limit?: number;
  readonly offset?: number;
};

export async function getDocument<State>(documentId: string) {
  const result = await client.GetDocument({
    identifier: documentId,
  });
  const document = result.document?.document;
  if (!document) {
    throw new Error(`Document with id ${documentId} not found`);
  }

  return {
    ...document,
    state: (document.state as { global: State }).global,
  };
}

export async function getLtipDocument(documentId: string) {
  return getDocument<ArbitrumLtipGranteeGlobalState>(documentId);
}

export async function getStipDocument(documentId: string) {
  return getDocument<ArbitrumStipGranteeGlobalState>(documentId);
}

export async function getDocumentOperations<Action>(
  documentId: string,
  paging?: PagingInput,
) {
  const result = await client.GetDocumentOperations({
    filter: {
      documentId,
    },
    paging,
  });
  return {
    ...result.documentOperations,
    items: result.documentOperations.items.map((item) => ({
      ...item,
      action: item.action as Action,
    })),
  };
}

export async function getLtipDocumentOperations(
  documentId: string,
  paging?: PagingInput,
) {
  return getDocumentOperations<ArbitrumLtipGranteeAction>(documentId, paging);
}

export async function getStipDocumentOperations(
  documentId: string,
  paging?: PagingInput,
) {
  return getDocumentOperations<ArbitrumStipGranteeAction>(documentId, paging);
}

export async function getDocuments<State>(
  documentType: string,
  paging?: PagingInput,
) {
  const result = await client.FindDocuments({
    search: {
      type: documentType,
    },
    view: {
      scopes: ["global"],
      branch: "main",
    },
    paging,
  });

  return {
    ...result.findDocuments,
    items: result.findDocuments.items.map((item) => ({
      ...item,
      state: (item.state as { global: State }).global,
    })),
  };
}

export async function getLtipDocuments(paging?: PagingInput) {
  return getDocuments<ArbitrumLtipGranteeGlobalState>(
    "arbitrum/ltip-grantee",
    paging,
  );
}

export async function getStipDocuments(paging?: PagingInput) {
  return getDocuments<ArbitrumStipGranteeGlobalState>(
    "arbitrum/stip-grantee",
    paging,
  );
}
