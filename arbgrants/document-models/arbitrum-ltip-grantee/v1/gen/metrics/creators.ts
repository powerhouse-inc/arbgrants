import { createAction } from "document-model";
import { EditPhaseInputSchema } from "../schema/zod.js";
import type { EditPhaseInput } from "../types.js";
import type { EditPhaseAction } from "./actions.js";

export const editPhase = (input: EditPhaseInput) =>
  createAction<EditPhaseAction>(
    "EDIT_PHASE",
    { ...input },
    undefined,
    EditPhaseInputSchema,
    "global",
  );
