import { type SignalDispatch } from "document-model";
import type { AddEditorAction, RemoveEditorAction } from "./actions.js";
import type { ArbitrumLtipGranteeState } from "../types.js";

export interface ArbitrumLtipGranteeAdminOperations {
  addEditorOperation: (
    state: ArbitrumLtipGranteeState,
    action: AddEditorAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeEditorOperation: (
    state: ArbitrumLtipGranteeState,
    action: RemoveEditorAction,
    dispatch?: SignalDispatch,
  ) => void;
}
