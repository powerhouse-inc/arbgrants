import type { DocumentModelUtils } from "document-model";
import type { ArbitrumStipGranteePHState } from "./gen/types.js";
import { utils as genUtils } from "./gen/utils.js";
import * as customUtils from "./src/utils.js";

/** Utils for the ArbitrumStipGrantee document model */
export const utils: DocumentModelUtils<ArbitrumStipGranteePHState> = {
  ...genUtils,
  ...customUtils,
};
