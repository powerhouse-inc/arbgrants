import { type SignalDispatch } from "document-model";
import type { InitGranteeAction, EditGranteeAction } from "./actions.js";
import type { ArbitrumLtipGranteeState } from "../types.js";

export interface ArbitrumLtipGranteeGeneralOperations {
  initGranteeOperation: (
    state: ArbitrumLtipGranteeState,
    action: InitGranteeAction,
    dispatch?: SignalDispatch,
  ) => void;
  editGranteeOperation: (
    state: ArbitrumLtipGranteeState,
    action: EditGranteeAction,
    dispatch?: SignalDispatch,
  ) => void;
}
