import { type SignalDispatch } from "document-model";
import type { EditPhaseAction } from "./actions.js";
import type { ArbitrumLtipGranteeState } from "../types.js";

export interface ArbitrumLtipGranteeMetricsOperations {
  editPhaseOperation: (
    state: ArbitrumLtipGranteeState,
    action: EditPhaseAction,
    dispatch?: SignalDispatch,
  ) => void;
}
