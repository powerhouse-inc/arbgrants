import type { EditorModule } from "document-model";
import { ArbLtip } from "./arb-ltip/module.js";
import { ArbStip } from "./arb-stip/module.js";

export const editors: EditorModule[] = [ArbLtip, ArbStip];
