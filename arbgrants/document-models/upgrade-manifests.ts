import type { UpgradeManifest } from "document-model";
import { arbitrumLtipGranteeUpgradeManifest } from "./arbitrum-ltip-grantee/upgrades/upgrade-manifest.js";
import { arbitrumStipGranteeUpgradeManifest } from "./arbitrum-stip-grantee/upgrades/upgrade-manifest.js";

export const upgradeManifests: UpgradeManifest<readonly number[]>[] = [
  arbitrumLtipGranteeUpgradeManifest,
  arbitrumStipGranteeUpgradeManifest,
];
