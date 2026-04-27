import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model";
import { reducer } from "./reducer.js";
import { arbitrumStipGranteeDocumentType } from "./document-type.js";
import {
  assertIsArbitrumStipGranteeDocument,
  assertIsArbitrumStipGranteeState,
  isArbitrumStipGranteeDocument,
  isArbitrumStipGranteeState,
} from "./document-schema.js";
import type {
  ArbitrumStipGranteeGlobalState,
  ArbitrumStipGranteeLocalState,
  ArbitrumStipGranteePHState,
} from "./types.js";

export const initialGlobalState: ArbitrumStipGranteeGlobalState = {
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
export const initialLocalState: ArbitrumStipGranteeLocalState = {};

export const utils: DocumentModelUtils<ArbitrumStipGranteePHState> = {
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

    document.header.documentType = arbitrumStipGranteeDocumentType;

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
    return isArbitrumStipGranteeState(state);
  },
  assertIsStateOfType(state) {
    return assertIsArbitrumStipGranteeState(state);
  },
  isDocumentOfType(document) {
    return isArbitrumStipGranteeDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsArbitrumStipGranteeDocument(document);
  },
};
