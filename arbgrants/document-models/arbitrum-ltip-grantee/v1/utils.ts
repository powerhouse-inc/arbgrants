import type { DocumentModelUtils } from "document-model";
import type { ArbitrumLtipGranteePHState } from "./gen/types.js";
import { utils as genUtils } from "./gen/utils.js";
import * as customUtils from "./src/utils.js";

/** Utils for the ArbitrumLtipGrantee document model */
export const utils: DocumentModelUtils<ArbitrumLtipGranteePHState> = {
  ...genUtils,
  ...customUtils,
};
