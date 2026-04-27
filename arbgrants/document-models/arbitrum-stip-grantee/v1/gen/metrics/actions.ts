import type { Action } from "document-model";
import type { EditPhaseInput } from "../types.js";

export type EditPhaseAction = Action & {
  type: "EDIT_PHASE";
  input: EditPhaseInput;
};

export type ArbitrumStipGranteeMetricsAction = EditPhaseAction;
