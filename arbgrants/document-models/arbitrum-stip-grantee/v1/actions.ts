import { baseActions } from "document-model";
import {
  arbitrumStipGranteeGeneralActions,
  arbitrumStipGranteeMetricsActions,
  arbitrumStipGranteeAdminActions,
  arbitrumStipGranteeMetaActions,
} from "./gen/creators.js";

/** Actions for the ArbitrumStipGrantee document model */

export const actions = {
  ...baseActions,
  ...arbitrumStipGranteeGeneralActions,
  ...arbitrumStipGranteeMetricsActions,
  ...arbitrumStipGranteeAdminActions,
  ...arbitrumStipGranteeMetaActions,
};
