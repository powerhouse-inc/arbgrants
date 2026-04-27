import { createAction } from "document-model";
import {
  AddMetaInputSchema,
  UpdateMetaInputSchema,
  DeleteMetaInputSchema,
} from "../schema/zod.js";
import type {
  AddMetaInput,
  UpdateMetaInput,
  DeleteMetaInput,
} from "../types.js";
import type {
  AddMetaAction,
  UpdateMetaAction,
  DeleteMetaAction,
} from "./actions.js";

export const addMeta = (input: AddMetaInput) =>
  createAction<AddMetaAction>(
    "ADD_META",
    { ...input },
    undefined,
    AddMetaInputSchema,
    "global",
  );

export const updateMeta = (input: UpdateMetaInput) =>
  createAction<UpdateMetaAction>(
    "UPDATE_META",
    { ...input },
    undefined,
    UpdateMetaInputSchema,
    "global",
  );

export const deleteMeta = (input: DeleteMetaInput) =>
  createAction<DeleteMetaAction>(
    "DELETE_META",
    { ...input },
    undefined,
    DeleteMetaInputSchema,
    "global",
  );
