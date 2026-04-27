import { type SignalDispatch } from "document-model";
import type {
  AddMetaAction,
  UpdateMetaAction,
  DeleteMetaAction,
} from "./actions.js";
import type { ArbitrumLtipGranteeState } from "../types.js";

export interface ArbitrumLtipGranteeMetaOperations {
  addMetaOperation: (
    state: ArbitrumLtipGranteeState,
    action: AddMetaAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMetaOperation: (
    state: ArbitrumLtipGranteeState,
    action: UpdateMetaAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteMetaOperation: (
    state: ArbitrumLtipGranteeState,
    action: DeleteMetaAction,
    dispatch?: SignalDispatch,
  ) => void;
}
