export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Address: { input: `${string}:0x${string}`; output: `${string}:0x${string}` };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Attachment: { input: string; output: string };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Unknown: { input: unknown; output: unknown };
  Upload: { input: File; output: File };
};

export type AddEditorInput = {
  editorAddress: Scalars["String"]["input"];
};

export type AddMetaInput = {
  isAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  protocolVersion: Scalars["String"]["input"];
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type ArbitrumStipGranteeState = {
  authorizedSignerAddress: Maybe<Scalars["String"]["output"]>;
  disbursementContractAddress: Maybe<Scalars["String"]["output"]>;
  editorAddresses: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  fundingAddress: Maybe<Scalars["String"]["output"]>;
  fundingType: Maybe<Array<Maybe<FundingType>>>;
  grantSize: Maybe<Scalars["Float"]["output"]>;
  grantSummary: Maybe<Scalars["String"]["output"]>;
  granteeName: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  matchingGrantSize: Maybe<Scalars["Float"]["output"]>;
  meta: Maybe<Array<Maybe<Meta>>>;
  metricsDashboardLink: Maybe<Scalars["String"]["output"]>;
  phases: Maybe<Array<Maybe<Phase>>>;
};

export type Contract = {
  contractAddress: Maybe<Scalars["String"]["output"]>;
  contractId: Scalars["ID"]["output"];
  contractLabel: Maybe<Scalars["String"]["output"]>;
};

export type ContractInput = {
  contractAddress?: InputMaybe<Scalars["String"]["input"]>;
  contractId: Scalars["ID"]["input"];
  contractLabel?: InputMaybe<Scalars["String"]["input"]>;
};

export type DeleteMetaInput = {
  index?: InputMaybe<Scalars["Float"]["input"]>;
};

export type DistributionMechanism = "Airdrop" | "LPIncentives";

export type EditGranteeInput = {
  authorizedSignerAddress?: InputMaybe<Scalars["String"]["input"]>;
  disbursementContractAddress?: InputMaybe<Scalars["String"]["input"]>;
  fundingAddress?: InputMaybe<Scalars["String"]["input"]>;
  fundingType?: InputMaybe<Array<FundingTypeInput>>;
  grantSize?: InputMaybe<Scalars["Float"]["input"]>;
  grantSummary?: InputMaybe<Scalars["String"]["input"]>;
  granteeName?: InputMaybe<Scalars["String"]["input"]>;
  matchingGrantSize?: InputMaybe<Scalars["Float"]["input"]>;
  metricsDashboardLink?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditPhaseInput = {
  actuals?: InputMaybe<GranteeActualsInput>;
  phaseIndex: Scalars["Int"]["input"];
  planned?: InputMaybe<GranteePlannedInput>;
  stats?: InputMaybe<GranteeStatsInput>;
  status?: InputMaybe<Status>;
};

export type FundingType =
  | "EOA"
  | "Multisig"
  | "ThreeofFiveMultisig"
  | "TwoofThreeMultisig";

export type FundingTypeInput =
  | "EOA"
  | "Multisig"
  | "ThreeofFiveMultisig"
  | "TwoofThreeMultisig";

export type GranteeActuals = {
  arbReceived: Maybe<Scalars["Float"]["output"]>;
  arbRemaining: Maybe<Scalars["Float"]["output"]>;
  arbUtilized: Maybe<Scalars["Float"]["output"]>;
  contractsIncentivized: Maybe<Array<Maybe<Contract>>>;
  disclosures: Maybe<Scalars["String"]["output"]>;
  incentives: Maybe<Scalars["String"]["output"]>;
  summary: Maybe<Scalars["String"]["output"]>;
};

export type GranteeActualsInput = {
  arbReceived?: InputMaybe<Scalars["Float"]["input"]>;
  arbRemaining?: InputMaybe<Scalars["Float"]["input"]>;
  arbUtilized?: InputMaybe<Scalars["Float"]["input"]>;
  contractsIncentivized?: InputMaybe<Array<InputMaybe<ContractInput>>>;
  disclosures?: InputMaybe<Scalars["String"]["input"]>;
  incentives?: InputMaybe<Scalars["String"]["input"]>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
};

export type GranteePlanned = {
  arbToBeDistributed: Maybe<Scalars["Float"]["output"]>;
  changes: Maybe<Scalars["String"]["output"]>;
  contractsIncentivized: Maybe<Array<Maybe<Contract>>>;
  distributionMechanism: Maybe<Array<Maybe<DistributionMechanism>>>;
  expectations: Maybe<Scalars["String"]["output"]>;
};

export type GranteePlannedInput = {
  arbToBeDistributed?: InputMaybe<Scalars["Float"]["input"]>;
  changes?: InputMaybe<Scalars["String"]["input"]>;
  contractsIncentivized?: InputMaybe<Array<InputMaybe<ContractInput>>>;
  distributionMechanism?: InputMaybe<Array<InputMaybe<DistributionMechanism>>>;
  expectations?: InputMaybe<Scalars["String"]["input"]>;
};

export type GranteeStats = {
  avgDailyTVL: Maybe<Scalars["Float"]["output"]>;
  avgDailyTXNS: Maybe<Scalars["Float"]["output"]>;
  avgDailyUniqueUsers: Maybe<Scalars["Float"]["output"]>;
  changes: Maybe<Scalars["String"]["output"]>;
  kpis: Maybe<Array<Maybe<NamedKpi>>>;
  lessons: Maybe<Scalars["String"]["output"]>;
};

export type GranteeStatsInput = {
  avgDailyTVL?: InputMaybe<Scalars["Float"]["input"]>;
  avgDailyTXNS?: InputMaybe<Scalars["Float"]["input"]>;
  avgDailyUniqueUsers?: InputMaybe<Scalars["Float"]["input"]>;
  changes?: InputMaybe<Scalars["String"]["input"]>;
  kpis?: InputMaybe<Array<InputMaybe<NamedKpiInput>>>;
  lessons?: InputMaybe<Scalars["String"]["input"]>;
};

export type InitGranteeInput = {
  authorizedSignerAddress: Scalars["String"]["input"];
  disbursementContractAddress: Scalars["String"]["input"];
  fundingAddress: Scalars["String"]["input"];
  fundingType: Array<FundingTypeInput>;
  grantSize: Scalars["Float"]["input"];
  grantSummary?: InputMaybe<Scalars["String"]["input"]>;
  granteeName: Scalars["String"]["input"];
  matchingGrantSize: Scalars["Float"]["input"];
  metricsDashboardLink?: InputMaybe<Scalars["String"]["input"]>;
  numberOfPhases?: InputMaybe<Scalars["Int"]["input"]>;
  phaseDuration?: InputMaybe<Scalars["Int"]["input"]>;
  startDate: Scalars["DateTime"]["input"];
};

export type Meta = {
  isAdmin: Maybe<Scalars["Boolean"]["output"]>;
  protocolVersion: Scalars["String"]["output"];
  value: Maybe<Scalars["String"]["output"]>;
};

export type NamedKpi = {
  name: Maybe<Scalars["String"]["output"]>;
  value: Maybe<Scalars["Float"]["output"]>;
};

export type NamedKpiInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  value?: InputMaybe<Scalars["Float"]["input"]>;
};

export type Phase = {
  actuals: Maybe<GranteeActuals>;
  endDate: Scalars["DateTime"]["output"];
  planned: Maybe<GranteePlanned>;
  startDate: Scalars["DateTime"]["output"];
  stats: Maybe<GranteeStats>;
  status: Maybe<Status>;
};

export type RemoveEditorInput = {
  editorAddress: Scalars["String"]["input"];
};

export type Status =
  | "Finalized"
  | "InProgress"
  | "NotStarted"
  | "Uninitialized";

export type UpdateMetaInput = {
  index?: InputMaybe<Scalars["Float"]["input"]>;
  isAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  protocolVersion: Scalars["String"]["input"];
  value?: InputMaybe<Scalars["String"]["input"]>;
};
