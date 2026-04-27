import { type SignalDispatch } from "document-model";
import type {
  AddMetaAction,
  UpdateMetaAction,
  DeleteMetaAction,
} from "./actions.js";
import type { ArbitrumStipGranteeState } from "../types.js";

export interface ArbitrumStipGranteeMetaOperations {
  addMetaOperation: (
    state: ArbitrumStipGranteeState,
    action: AddMetaAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMetaOperation: (
    state: ArbitrumStipGranteeState,
    action: UpdateMetaAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteMetaOperation: (
    state: ArbitrumStipGranteeState,
    action: DeleteMetaAction,
    dispatch?: SignalDispatch,
  ) => void;
}
