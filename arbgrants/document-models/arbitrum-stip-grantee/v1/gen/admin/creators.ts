import { createAction } from "document-model";
import {
  AddEditorInputSchema,
  RemoveEditorInputSchema,
} from "../schema/zod.js";
import type { AddEditorInput, RemoveEditorInput } from "../types.js";
import type { AddEditorAction, RemoveEditorAction } from "./actions.js";

export const addEditor = (input: AddEditorInput) =>
  createAction<AddEditorAction>(
    "ADD_EDITOR",
    { ...input },
    undefined,
    AddEditorInputSchema,
    "global",
  );

export const removeEditor = (input: RemoveEditorInput) =>
  createAction<RemoveEditorAction>(
    "REMOVE_EDITOR",
    { ...input },
    undefined,
    RemoveEditorInputSchema,
    "global",
  );
