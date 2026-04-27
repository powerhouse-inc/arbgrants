import { type SignalDispatch } from "document-model";
import type { EditPhaseAction } from "./actions.js";
import type { ArbitrumStipGranteeState } from "../types.js";

export interface ArbitrumStipGranteeMetricsOperations {
  editPhaseOperation: (
    state: ArbitrumStipGranteeState,
    action: EditPhaseAction,
    dispatch?: SignalDispatch,
  ) => void;
}
