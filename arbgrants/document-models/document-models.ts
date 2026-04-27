import type { DocumentModelModule } from "document-model";
import { ArbitrumLtipGrantee as ArbitrumLtipGranteeV1 } from "./arbitrum-ltip-grantee/v1/module.js";
import { ArbitrumStipGrantee as ArbitrumStipGranteeV1 } from "./arbitrum-stip-grantee/v1/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  ArbitrumLtipGranteeV1,
  ArbitrumStipGranteeV1,
];
