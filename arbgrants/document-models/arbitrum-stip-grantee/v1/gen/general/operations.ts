import { type SignalDispatch } from "document-model";
import type { InitGranteeAction, EditGranteeAction } from "./actions.js";
import type { ArbitrumStipGranteeState } from "../types.js";

export interface ArbitrumStipGranteeGeneralOperations {
  initGranteeOperation: (
    state: ArbitrumStipGranteeState,
    action: InitGranteeAction,
    dispatch?: SignalDispatch,
  ) => void;
  editGranteeOperation: (
    state: ArbitrumStipGranteeState,
    action: EditGranteeAction,
    dispatch?: SignalDispatch,
  ) => void;
}
