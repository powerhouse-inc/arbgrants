import type { Action } from "document-model";
import type { AddEditorInput, RemoveEditorInput } from "../types.js";

export type AddEditorAction = Action & {
  type: "ADD_EDITOR";
  input: AddEditorInput;
};
export type RemoveEditorAction = Action & {
  type: "REMOVE_EDITOR";
  input: RemoveEditorInput;
};

export type ArbitrumStipGranteeAdminAction =
  | AddEditorAction
  | RemoveEditorAction;
