import { PHDocumentController } from "document-model";
import { ArbitrumStipGrantee } from "../module.js";
import type {
  ArbitrumStipGranteeAction,
  ArbitrumStipGranteePHState,
} from "./types.js";

export const ArbitrumStipGranteeController =
  PHDocumentController.forDocumentModel<
    ArbitrumStipGranteePHState,
    ArbitrumStipGranteeAction
  >(ArbitrumStipGrantee);
