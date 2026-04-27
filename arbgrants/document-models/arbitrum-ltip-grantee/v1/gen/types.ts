import type { PHDocument, PHBaseState } from "document-model";
import type { ArbitrumLtipGranteeAction } from "./actions.js";
import type { ArbitrumLtipGranteeState as ArbitrumLtipGranteeGlobalState } from "./schema/types.js";

type ArbitrumLtipGranteeLocalState = Record<PropertyKey, never>;

type ArbitrumLtipGranteePHState = PHBaseState & {
  global: ArbitrumLtipGranteeGlobalState;
  local: ArbitrumLtipGranteeLocalState;
};
type ArbitrumLtipGranteeDocument = PHDocument<ArbitrumLtipGranteePHState>;

export * from "./schema/types.js";

export type {
  ArbitrumLtipGranteeGlobalState,
  ArbitrumLtipGranteeLocalState,
  ArbitrumLtipGranteePHState,
  ArbitrumLtipGranteeAction,
  ArbitrumLtipGranteeDocument,
};
