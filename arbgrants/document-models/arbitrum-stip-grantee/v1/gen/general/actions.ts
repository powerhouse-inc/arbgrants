import type { Action } from "document-model";
import type { InitGranteeInput, EditGranteeInput } from "../types.js";

export type InitGranteeAction = Action & {
  type: "INIT_GRANTEE";
  input: InitGranteeInput;
};
export type EditGranteeAction = Action & {
  type: "EDIT_GRANTEE";
  input: EditGranteeInput;
};

export type ArbitrumStipGranteeGeneralAction =
  | InitGranteeAction
  | EditGranteeAction;
