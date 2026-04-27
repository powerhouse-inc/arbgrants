import { createAction } from "document-model";
import {
  InitGranteeInputSchema,
  EditGranteeInputSchema,
} from "../schema/zod.js";
import type { InitGranteeInput, EditGranteeInput } from "../types.js";
import type { InitGranteeAction, EditGranteeAction } from "./actions.js";

export const initGrantee = (input: InitGranteeInput) =>
  createAction<InitGranteeAction>(
    "INIT_GRANTEE",
    { ...input },
    undefined,
    InitGranteeInputSchema,
    "global",
  );

export const editGrantee = (input: EditGranteeInput) =>
  createAction<EditGranteeAction>(
    "EDIT_GRANTEE",
    { ...input },
    undefined,
    EditGranteeInputSchema,
    "global",
  );
