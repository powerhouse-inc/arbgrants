import type {
  GranteeActuals,
  GranteePlanned,
  GranteeStats,
} from "../../gen/types.js";
import { isEditorRole } from "../utils.js";
import validators from "../validators.js";
import type { ArbitrumStipGranteeMetricsOperations } from "document-models/arbitrum-stip-grantee/v1";

export const arbitrumStipGranteeMetricsOperations: ArbitrumStipGranteeMetricsOperations =
  {
    editPhaseOperation(state, action) {
      const signer = action.context?.signer?.user.address;
      if (!isEditorRole(state, signer)) {
        throw new Error(`Unauthorized signer`);
      }

      const { status, actuals, planned, stats, phaseIndex } = action.input;
      const { phases } = state;

      if (!phases || phases.length === 0) {
        throw new Error("state phases are uninitialized");
      }
      if (phaseIndex < 0 || phaseIndex >= phases.length) {
        throw new Error("phaseIndex is invalid");
      }

      const phase = phases[phaseIndex];
      if (!phase) {
        throw new Error("phase is not found");
      }

      if (status) {
        phase.status = status;
      }

      if (actuals) {
        phase.actuals = actuals as unknown as GranteeActuals;
      }

      if (planned) {
        if (validators.isPlannedValid(planned as unknown as GranteePlanned)) {
          phase.planned = planned as unknown as GranteePlanned;
        } else {
          throw new Error("planned is not valid");
        }
      }

      if (stats) {
        phase.stats = stats as unknown as GranteeStats;
      }
    },
  };
