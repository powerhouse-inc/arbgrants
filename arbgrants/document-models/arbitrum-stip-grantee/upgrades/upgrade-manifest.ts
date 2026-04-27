import type { UpgradeManifest } from "document-model";
import { latestVersion, supportedVersions } from "./versions.js";

export const arbitrumStipGranteeUpgradeManifest: UpgradeManifest<
  typeof supportedVersions
> = {
  documentType: "arbitrum/stip-grantee",
  latestVersion,
  supportedVersions,
  upgrades: {},
};
