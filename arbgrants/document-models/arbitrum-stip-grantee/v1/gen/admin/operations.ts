import { type SignalDispatch } from "document-model";
import type { AddEditorAction, RemoveEditorAction } from "./actions.js";
import type { ArbitrumStipGranteeState } from "../types.js";

export interface ArbitrumStipGranteeAdminOperations {
  addEditorOperation: (
    state: ArbitrumStipGranteeState,
    action: AddEditorAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeEditorOperation: (
    state: ArbitrumStipGranteeState,
    action: RemoveEditorAction,
    dispatch?: SignalDispatch,
  ) => void;
}
