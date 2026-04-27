import type { UpgradeManifest } from "document-model";
import { latestVersion, supportedVersions } from "./versions.js";

export const arbitrumLtipGranteeUpgradeManifest: UpgradeManifest<
  typeof supportedVersions
> = {
  documentType: "arbitrum/ltip-grantee",
  latestVersion,
  supportedVersions,
  upgrades: {},
};
