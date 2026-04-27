import type { Action } from "document-model";
import type {
  AddMetaInput,
  UpdateMetaInput,
  DeleteMetaInput,
} from "../types.js";

export type AddMetaAction = Action & { type: "ADD_META"; input: AddMetaInput };
export type UpdateMetaAction = Action & {
  type: "UPDATE_META";
  input: UpdateMetaInput;
};
export type DeleteMetaAction = Action & {
  type: "DELETE_META";
  input: DeleteMetaInput;
};

export type ArbitrumStipGranteeMetaAction =
  | AddMetaAction
  | UpdateMetaAction
  | DeleteMetaAction;
