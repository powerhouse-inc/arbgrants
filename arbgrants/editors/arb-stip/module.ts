import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the "["arbitrum/stip-grantee"]" document type */
export const ArbStip: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["arbitrum/stip-grantee"],
  config: {
    id: "arb-stip-editor",
    name: "arb-stip",
  },
};
