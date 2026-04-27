import type { Phase } from "../../gen/types.js";
import {
  fromCommaDelimitedString,
  isAdminRole,
  isEditorRole,
  toCommaDelimitedString,
} from "../utils.js";
import validators from "../validators.js";
import type { ArbitrumLtipGranteeGeneralOperations } from "document-models/arbitrum-ltip-grantee/v1";

const getStartDate = (granteeName: string) => {
  if (
    [
      "Across Protocol",
      "Clipper",
      "Copra",
      "DODO",
      "Verified USD",
      "Pear Protocol",
      "Synthetix",
    ].includes(granteeName)
  ) {
    return Date.UTC(2024, 5, 2, 23);
  }

  if (["Peapods Finance"].includes(granteeName)) {
    return Date.UTC(2024, 5, 2, 22);
  }

  return Date.UTC(2024, 5, 3, 7);
};

export const arbitrumLtipGranteeGeneralOperations: ArbitrumLtipGranteeGeneralOperations =
  {
    initGranteeOperation(state, action) {
      if (
        state.authorizedSignerAddress !== null &&
        state.authorizedSignerAddress !== undefined &&
        validators.isValidAddress(state.authorizedSignerAddress)
      ) {
        throw new Error("Grantee already initialized");
      }

      const {
        authorizedSignerAddress,
        disbursementContractAddress,
        fundingAddress,
        fundingType,
        grantSize,
        matchingGrantSize,
        grantSummary,
        granteeName,
        metricsDashboardLink,
        numberOfPhases,
        phaseDuration,
      } = action.input;

      if (!validators.isValidAddress(authorizedSignerAddress)) {
        throw new Error("authorizedSignerAddress is invalid");
      }

      if (!validators.gtZero(grantSize)) {
        throw new Error("grantSize must be greater than 0");
      }

      if (!validators.isNotEmptyString(granteeName)) {
        throw new Error("granteeName is required");
      }

      const disbursementAddresses = fromCommaDelimitedString(
        disbursementContractAddress,
      );
      if (disbursementAddresses.length < 1) {
        throw new Error("disbursementContractAddress is required");
      }

      if (
        disbursementAddresses.some((addr) => !validators.isValidAddress(addr))
      ) {
        throw new Error("disbursementContractAddress is improperly formatted");
      }

      const fundingAddresses = fromCommaDelimitedString(fundingAddress);
      if (fundingAddresses.length < 1) {
        throw new Error("fundingAddress is required");
      }

      if (fundingAddresses.some((addr) => !validators.isValidAddress(addr))) {
        throw new Error("fundingAddress is improperly formatted");
      }

      state.authorizedSignerAddress = authorizedSignerAddress;
      state.disbursementContractAddress = toCommaDelimitedString(
        disbursementAddresses,
      );
      state.fundingAddress = toCommaDelimitedString(fundingAddresses);
      state.fundingType = fundingType;
      state.grantSize = grantSize;
      state.matchingGrantSize = matchingGrantSize;
      state.granteeName = granteeName;

      if (grantSummary) {
        state.grantSummary = grantSummary;
      }

      if (metricsDashboardLink) {
        state.metricsDashboardLink = metricsDashboardLink;
      }

      if (!numberOfPhases) {
        throw new Error("numberOfPhases is required");
      }

      if (!phaseDuration) {
        throw new Error("phaseDuration is required");
      }

      if (numberOfPhases <= 0 || numberOfPhases > 10) {
        throw new Error("numberOfPhases must be in [0, 10]");
      }

      if (phaseDuration < 1 || phaseDuration > 31) {
        throw new Error("phaseDuration must be in than [1, 31]");
      }

      const startDateUTC = getStartDate(granteeName);
      const phases = [];
      for (let i = 0; i < numberOfPhases; i++) {
        const phaseStartDate = new Date(startDateUTC);
        phaseStartDate.setUTCDate(
          phaseStartDate.getUTCDate() + i * phaseDuration,
        );

        const phaseEndDate = new Date(startDateUTC);
        phaseEndDate.setUTCDate(
          phaseEndDate.getUTCDate() + (i + 1) * phaseDuration,
        );

        const phase: Phase = {
          startDate: phaseStartDate.toISOString(),
          endDate: phaseEndDate.toISOString(),
          status: "NotStarted",
          actuals: {
            arbReceived: 0,
            arbRemaining: 0,
            arbUtilized: 0,
            contractsIncentivized: [],
            incentives: "",
            disclosures: "",
            summary: "",
          },
          planned: {
            arbToBeDistributed: 0,
            contractsIncentivized: [],
            distributionMechanism: [],
            changes: "",
            expectations: "",
          },
          stats: {
            avgDailyTVL: 0,
            avgDailyTXNS: 0,
            avgDailyUniqueUsers: 0,
            changes: "",
            lessons: "",
            kpis: [],
          },
        };

        phases.push(phase);
      }

      state.phases = phases;
    },
    editGranteeOperation(state, action) {
      const signer = action.context?.signer?.user.address;

      const {
        fundingAddress,
        fundingType,
        granteeName,
        grantSummary,
        metricsDashboardLink,
        matchingGrantSize,
        grantSize,
        authorizedSignerAddress,
        disbursementContractAddress,
      } = action.input;

      const isEditor = isEditorRole(state, signer);
      if (!isEditor) {
        throw new Error(`Unauthorized signer`);
      }

      if (fundingAddress) {
        const fundingAddresses = fromCommaDelimitedString(fundingAddress);
        if (fundingAddresses.length < 1) {
          throw new Error("fundingAddress is required");
        }

        if (fundingAddresses.some((addr) => !validators.isValidAddress(addr))) {
          throw new Error("fundingAddress is improperly formatted");
        }

        state.fundingAddress = fundingAddress;
      }

      if (fundingType) {
        state.fundingType = fundingType;
      }

      if (granteeName) {
        state.granteeName = granteeName;
      }

      if (grantSummary) {
        state.grantSummary = grantSummary;
      }

      if (matchingGrantSize != null && matchingGrantSize !== undefined) {
        state.matchingGrantSize = matchingGrantSize;
      }

      if (metricsDashboardLink) {
        state.metricsDashboardLink = metricsDashboardLink;
      }

      const isAdmin = isAdminRole(state, signer);
      if (isAdmin) {
        if (grantSize != null && grantSize !== undefined) {
          if (!validators.gtZero(grantSize)) {
            throw new Error("grantSize must be greater than 0");
          }
          state.grantSize = grantSize;
        }

        if (authorizedSignerAddress) {
          if (!validators.isValidAddress(authorizedSignerAddress)) {
            throw new Error("authorizedSignerAddress is invalid");
          }

          if (!state.editorAddresses) {
            state.editorAddresses = [];
          }
          state.editorAddresses.push(signer);

          const newSignerIndex = state.editorAddresses.indexOf(
            authorizedSignerAddress,
          );
          if (newSignerIndex !== -1) {
            state.editorAddresses.splice(newSignerIndex, 1);
          }

          state.authorizedSignerAddress = authorizedSignerAddress;
        }

        if (disbursementContractAddress) {
          const disbursementContractAddresses = fromCommaDelimitedString(
            disbursementContractAddress,
          );

          if (disbursementContractAddresses.length < 1) {
            throw new Error("disbursementContractAddress is required");
          }

          if (
            disbursementContractAddresses.some(
              (addr) => !validators.isValidAddress(addr),
            )
          ) {
            throw new Error(
              "disbursementContractAddress is improperly formatted",
            );
          }

          state.disbursementContractAddress = disbursementContractAddress;
        }
      }
    },
  };
