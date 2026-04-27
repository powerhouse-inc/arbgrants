/**
 * Factory methods for creating ArbitrumStipGranteeDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model";
import type {
  ArbitrumStipGranteeDocument,
  ArbitrumStipGranteeGlobalState,
  ArbitrumStipGranteeLocalState,
  ArbitrumStipGranteePHState,
} from "./types.js";
import { utils } from "./utils.js";

export function defaultGlobalState(): ArbitrumStipGranteeGlobalState {
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

export function defaultLocalState(): ArbitrumStipGranteeLocalState {
  return {};
}

export function defaultPHState(): ArbitrumStipGranteePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<ArbitrumStipGranteeGlobalState>,
): ArbitrumStipGranteeGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  };
}

export function createLocalState(
  state?: Partial<ArbitrumStipGranteeLocalState>,
): ArbitrumStipGranteeLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as ArbitrumStipGranteeLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<ArbitrumStipGranteeGlobalState>,
  localState?: Partial<ArbitrumStipGranteeLocalState>,
): ArbitrumStipGranteePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a ArbitrumStipGranteeDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createArbitrumStipGranteeDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<ArbitrumStipGranteeGlobalState>;
    local?: Partial<ArbitrumStipGranteeLocalState>;
  }>,
): ArbitrumStipGranteeDocument {
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
