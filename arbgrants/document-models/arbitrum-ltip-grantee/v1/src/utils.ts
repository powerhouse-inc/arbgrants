import type {
  ArbitrumLtipGranteeState,
  Contract,
  GranteeActuals,
  Maybe,
} from "../gen/types.js";

export const isActualsEmpty = (actuals: Maybe<GranteeActuals>) =>
  actuals?.summary === "";

export const fromCommaDelimitedString = (str: string) =>
  (str || "").split(",").map((v) => v.trim());

export const toCommaDelimitedString = (arr: string[]) => (arr || []).join(", ");

export const toArray = <T>(value: Maybe<Array<Maybe<T>>>): T[] =>
  (value || []).filter((v): v is T => v !== null && v !== undefined);

export const isEditorRole = (
  _state: ArbitrumLtipGranteeState,
  _signer: string | undefined,
) => true;

export const isAdminRole = (
  _state: ArbitrumLtipGranteeState,
  _signer: string | undefined,
) => true;

const containsContract = (contracts: Contract[], addr: Maybe<string>) =>
  contracts.some((c) => c.contractAddress === addr);

const addDistinct = (all: Contract[], contracts: Maybe<Contract>[]) =>
  contracts
    .map((c) => c!)
    .filter((c) => !containsContract(all, c.contractAddress))
    .forEach((contract) => all.push(contract));

export const findAllContracts = (state: ArbitrumLtipGranteeState) => {
  const all: Contract[] = [];

  all.push({
    contractAddress: state.fundingAddress!,
    contractId: "Funding Address",
    contractLabel: "Funding Address",
  });

  for (const phase of toArray(state.phases)) {
    addDistinct(all, phase.planned?.contractsIncentivized || []);
    addDistinct(all, phase.actuals?.contractsIncentivized || []);
  }

  return all;
};
