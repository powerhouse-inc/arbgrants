import { baseActions } from "document-model";
import {
  arbitrumLtipGranteeGeneralActions,
  arbitrumLtipGranteeMetricsActions,
  arbitrumLtipGranteeAdminActions,
  arbitrumLtipGranteeMetaActions,
} from "./gen/creators.js";

/** Actions for the ArbitrumLtipGrantee document model */

export const actions = {
  ...baseActions,
  ...arbitrumLtipGranteeGeneralActions,
  ...arbitrumLtipGranteeMetricsActions,
  ...arbitrumLtipGranteeAdminActions,
  ...arbitrumLtipGranteeMetaActions,
};
