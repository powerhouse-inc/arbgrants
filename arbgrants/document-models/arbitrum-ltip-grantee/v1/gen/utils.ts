import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model";
import { reducer } from "./reducer.js";
import { arbitrumLtipGranteeDocumentType } from "./document-type.js";
import {
  assertIsArbitrumLtipGranteeDocument,
  assertIsArbitrumLtipGranteeState,
  isArbitrumLtipGranteeDocument,
  isArbitrumLtipGranteeState,
} from "./document-schema.js";
import type {
  ArbitrumLtipGranteeGlobalState,
  ArbitrumLtipGranteeLocalState,
  ArbitrumLtipGranteePHState,
} from "./types.js";

export const initialGlobalState: ArbitrumLtipGranteeGlobalState = {
  id: "",
  granteeName: "",
  authorizedSignerAddress: "",
  editorAddresses: [],
  grantSize: 0,
  matchingGrantSize: 0,
  grantSummary: "",
  fundingAddress: "",
  fundingType: [],
  disbursementContractAddress: "",
  metricsDashboardLink: "",
  phases: [],
  meta: [],
};
export const initialLocalState: ArbitrumLtipGranteeLocalState = {};

export const utils: DocumentModelUtils<ArbitrumLtipGranteePHState> = {
  fileExtension: "grantee",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = arbitrumLtipGranteeDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isArbitrumLtipGranteeState(state);
  },
  assertIsStateOfType(state) {
    return assertIsArbitrumLtipGranteeState(state);
  },
  isDocumentOfType(document) {
    return isArbitrumLtipGranteeDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsArbitrumLtipGranteeDocument(document);
  },
};
