import type { PHDocument, PHBaseState } from "document-model";
import type { ArbitrumStipGranteeAction } from "./actions.js";
import type { ArbitrumStipGranteeState as ArbitrumStipGranteeGlobalState } from "./schema/types.js";

type ArbitrumStipGranteeLocalState = Record<PropertyKey, never>;

type ArbitrumStipGranteePHState = PHBaseState & {
  global: ArbitrumStipGranteeGlobalState;
  local: ArbitrumStipGranteeLocalState;
};
type ArbitrumStipGranteeDocument = PHDocument<ArbitrumStipGranteePHState>;

export * from "./schema/types.js";

export type {
  ArbitrumStipGranteeGlobalState,
  ArbitrumStipGranteeLocalState,
  ArbitrumStipGranteePHState,
  ArbitrumStipGranteeAction,
  ArbitrumStipGranteeDocument,
};
