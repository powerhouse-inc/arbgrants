import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "["arbitrum/ltip-grantee"]" document type */
export const ArbLtip: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["arbitrum/ltip-grantee"],
  config: {
    id: "arb-ltip-editor",
    name: "arb-ltip",
  },
};
