/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model";
import type { ArbitrumLtipGranteePHState } from "document-models/arbitrum-ltip-grantee/v1";

import { arbitrumLtipGranteeGeneralOperations } from "../src/reducers/general.js";
import { arbitrumLtipGranteeMetricsOperations } from "../src/reducers/metrics.js";
import { arbitrumLtipGranteeAdminOperations } from "../src/reducers/admin.js";
import { arbitrumLtipGranteeMetaOperations } from "../src/reducers/meta.js";

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

const stateReducer: StateReducer<ArbitrumLtipGranteePHState> = (
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

      arbitrumLtipGranteeGeneralOperations.initGranteeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_GRANTEE": {
      EditGranteeInputSchema().parse(action.input);

      arbitrumLtipGranteeGeneralOperations.editGranteeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "EDIT_PHASE": {
      EditPhaseInputSchema().parse(action.input);

      arbitrumLtipGranteeMetricsOperations.editPhaseOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_EDITOR": {
      AddEditorInputSchema().parse(action.input);

      arbitrumLtipGranteeAdminOperations.addEditorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_EDITOR": {
      RemoveEditorInputSchema().parse(action.input);

      arbitrumLtipGranteeAdminOperations.removeEditorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_META": {
      AddMetaInputSchema().parse(action.input);

      arbitrumLtipGranteeMetaOperations.addMetaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_META": {
      UpdateMetaInputSchema().parse(action.input);

      arbitrumLtipGranteeMetaOperations.updateMetaOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DELETE_META": {
      DeleteMetaInputSchema().parse(action.input);

      arbitrumLtipGranteeMetaOperations.deleteMetaOperation(
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

export const reducer: Reducer<ArbitrumLtipGranteePHState> =
  createReducer(stateReducer);
