import { PHDocumentController } from "document-model";
import { ArbitrumLtipGrantee } from "../module.js";
import type {
  ArbitrumLtipGranteeAction,
  ArbitrumLtipGranteePHState,
} from "./types.js";

export const ArbitrumLtipGranteeController =
  PHDocumentController.forDocumentModel<
    ArbitrumLtipGranteePHState,
    ArbitrumLtipGranteeAction
  >(ArbitrumLtipGrantee);
