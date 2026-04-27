/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model";
import type { ArbitrumStipGranteePHState } from "document-models/arbitrum-stip-grantee/v1";

import { arbitrumStipGranteeGeneralOperations } from "../src/reducers/general.js";
import { arbitrumStipGranteeMetricsOperations } from "../src/reducers/metrics.js";
import { arbitrumStipGranteeAdminOperations } from "../src/reducers/admin.js";
import { arbitrumStipGranteeMetaOperations } from "../src/reducers/meta.js";

import {
  InitGranteeInputSchema,
  EditGranteeInputSchema,
  EditPhaseInputSchema,
  AddEditorInputSchema,
  RemoveEditorInputSchema,
  AddMetaInputSchema,
  UpdateMetaInputSchema,
  DeleteMetaInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ArbitrumStipGranteePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "INIT_GRANTEE": {
      InitGranteeInputSchema().parse(action.input);

      arbitrumStipGranteeGeneralOperations.initGranteeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_GRANTEE": {
      EditGranteeInputSchema().parse(action.input);

      arbitrumStipGranteeGeneralOperations.editGranteeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_PHASE": {
      EditPhaseInputSchema().parse(action.input);

      arbitrumStipGranteeMetricsOperations.editPhaseOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_EDITOR": {
      AddEditorInputSchema().parse(action.input);

      arbitrumStipGranteeAdminOperations.addEditorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_EDITOR": {
      RemoveEditorInputSchema().parse(action.input);

      arbitrumStipGranteeAdminOperations.removeEditorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_META": {
      AddMetaInputSchema().parse(action.input);

      arbitrumStipGranteeMetaOperations.addMetaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_META": {
      UpdateMetaInputSchema().parse(action.input);

      arbitrumStipGranteeMetaOperations.updateMetaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_META": {
      DeleteMetaInputSchema().parse(action.input);

      arbitrumStipGranteeMetaOperations.deleteMetaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<ArbitrumStipGranteePHState> =
  createReducer(stateReducer);
