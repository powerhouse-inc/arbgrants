/**
 * Factory methods for creating ArbitrumLtipGranteeDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ArbitrumLtipGranteeDocument,
  ArbitrumLtipGranteeGlobalState,
  ArbitrumLtipGranteeLocalState,
  ArbitrumLtipGranteePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): ArbitrumLtipGranteeGlobalState {
  return {
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
}

export function defaultLocalState(): ArbitrumLtipGranteeLocalState {
  return {};
}

export function defaultPHState(): ArbitrumLtipGranteePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ArbitrumLtipGranteeGlobalState>,
): ArbitrumLtipGranteeGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<ArbitrumLtipGranteeLocalState>,
): ArbitrumLtipGranteeLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ArbitrumLtipGranteeLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ArbitrumLtipGranteeGlobalState>,
  localState?: Partial<ArbitrumLtipGranteeLocalState>,
): ArbitrumLtipGranteePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ArbitrumLtipGranteeDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createArbitrumLtipGranteeDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ArbitrumLtipGranteeGlobalState>;
    local?: Partial<ArbitrumLtipGranteeLocalState>;
  }>,
): ArbitrumLtipGranteeDocument {
  const document = utils.createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
