/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddEditorInput,
  AddMetaInput,
  ArbitrumStipGranteeState,
  Contract,
  ContractInput,
  DeleteMetaInput,
  DistributionMechanism,
  EditGranteeInput,
  EditPhaseInput,
  FundingType,
  FundingTypeInput,
  GranteeActuals,
  GranteeActualsInput,
  GranteePlanned,
  GranteePlannedInput,
  GranteeStats,
  GranteeStatsInput,
  InitGranteeInput,
  Meta,
  NamedKpi,
  NamedKpiInput,
  Phase,
  RemoveEditorInput,
  Status,
  UpdateMetaInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const DistributionMechanismSchema = z.enum(["Airdrop", "LPIncentives"]);

export const FundingTypeSchema = z.enum([
  "EOA",
  "Multisig",
  "ThreeofFiveMultisig",
  "TwoofThreeMultisig",
]);

export const FundingTypeInputSchema = z.enum([
  "EOA",
  "Multisig",
  "ThreeofFiveMultisig",
  "TwoofThreeMultisig",
]);

export const StatusSchema = z.enum([
  "Finalized",
  "InProgress",
  "NotStarted",
  "Uninitialized",
]);

export function AddEditorInputSchema(): z.ZodObject<
  Properties<AddEditorInput>
> {
  return z.object({
    editorAddress: z.string(),
  });
}

export function AddMetaInputSchema(): z.ZodObject<Properties<AddMetaInput>> {
  return z.object({
    isAdmin: z.boolean().nullish(),
    protocolVersion: z.string(),
    value: z.string().nullish(),
  });
}

export function ArbitrumStipGranteeStateSchema(): z.ZodObject<
  Properties<ArbitrumStipGranteeState>
> {
  return z.object({
    __typename: z.literal("ArbitrumStipGranteeState").optional(),
    authorizedSignerAddress: z.string().nullish(),
    disbursementContractAddress: z.string().nullish(),
    editorAddresses: z.array(z.string().nullable()).nullish(),
    fundingAddress: z.string().nullish(),
    fundingType: z.array(FundingTypeSchema.nullable()).nullish(),
    grantSize: z.number().nullish(),
    grantSummary: z.string().nullish(),
    granteeName: z.string().nullish(),
    id: z.string(),
    matchingGrantSize: z.number().nullish(),
    meta: z.array(z.lazy(() => MetaSchema().nullable())).nullish(),
    metricsDashboardLink: z.string().nullish(),
    phases: z.array(z.lazy(() => PhaseSchema().nullable())).nullish(),
  });
}

export function ContractSchema(): z.ZodObject<Properties<Contract>> {
  return z.object({
    __typename: z.literal("Contract").optional(),
    contractAddress: z.string().nullish(),
    contractId: z.string(),
    contractLabel: z.string().nullish(),
  });
}

export function ContractInputSchema(): z.ZodObject<Properties<ContractInput>> {
  return z.object({
    contractAddress: z.string().nullish(),
    contractId: z.string(),
    contractLabel: z.string().nullish(),
  });
}

export function DeleteMetaInputSchema(): z.ZodObject<
  Properties<DeleteMetaInput>
> {
  return z.object({
    index: z.number().nullish(),
  });
}

export function EditGranteeInputSchema(): z.ZodObject<
  Properties<EditGranteeInput>
> {
  return z.object({
    authorizedSignerAddress: z.string().nullish(),
    disbursementContractAddress: z.string().nullish(),
    fundingAddress: z.string().nullish(),
    fundingType: z.array(FundingTypeInputSchema).nullish(),
    grantSize: z.number().nullish(),
    grantSummary: z.string().nullish(),
    granteeName: z.string().nullish(),
    matchingGrantSize: z.number().nullish(),
    metricsDashboardLink: z.string().nullish(),
  });
}

export function EditPhaseInputSchema(): z.ZodObject<
  Properties<EditPhaseInput>
> {
  return z.object({
    actuals: z.lazy(() => GranteeActualsInputSchema().nullish()),
    phaseIndex: z.number(),
    planned: z.lazy(() => GranteePlannedInputSchema().nullish()),
    stats: z.lazy(() => GranteeStatsInputSchema().nullish()),
    status: StatusSchema.nullish(),
  });
}

export function GranteeActualsSchema(): z.ZodObject<
  Properties<GranteeActuals>
> {
  return z.object({
    __typename: z.literal("GranteeActuals").optional(),
    arbReceived: z.number().nullish(),
    arbRemaining: z.number().nullish(),
    arbUtilized: z.number().nullish(),
    contractsIncentivized: z
      .array(z.lazy(() => ContractSchema().nullable()))
      .nullish(),
    disclosures: z.string().nullish(),
    incentives: z.string().nullish(),
    summary: z.string().nullish(),
  });
}

export function GranteeActualsInputSchema(): z.ZodObject<
  Properties<GranteeActualsInput>
> {
  return z.object({
    arbReceived: z.number().nullish(),
    arbRemaining: z.number().nullish(),
    arbUtilized: z.number().nullish(),
    contractsIncentivized: z
      .array(z.lazy(() => ContractInputSchema().nullable()))
      .nullish(),
    disclosures: z.string().nullish(),
    incentives: z.string().nullish(),
    summary: z.string().nullish(),
  });
}

export function GranteePlannedSchema(): z.ZodObject<
  Properties<GranteePlanned>
> {
  return z.object({
    __typename: z.literal("GranteePlanned").optional(),
    arbToBeDistributed: z.number().nullish(),
    changes: z.string().nullish(),
    contractsIncentivized: z
      .array(z.lazy(() => ContractSchema().nullable()))
      .nullish(),
    distributionMechanism: z
      .array(DistributionMechanismSchema.nullable())
      .nullish(),
    expectations: z.string().nullish(),
  });
}

export function GranteePlannedInputSchema(): z.ZodObject<
  Properties<GranteePlannedInput>
> {
  return z.object({
    arbToBeDistributed: z.number().nullish(),
    changes: z.string().nullish(),
    contractsIncentivized: z
      .array(z.lazy(() => ContractInputSchema().nullable()))
      .nullish(),
    distributionMechanism: z
      .array(DistributionMechanismSchema.nullable())
      .nullish(),
    expectations: z.string().nullish(),
  });
}

export function GranteeStatsSchema(): z.ZodObject<Properties<GranteeStats>> {
  return z.object({
    __typename: z.literal("GranteeStats").optional(),
    avgDailyTVL: z.number().nullish(),
    avgDailyTXNS: z.number().nullish(),
    avgDailyUniqueUsers: z.number().nullish(),
    changes: z.string().nullish(),
    kpis: z.array(z.lazy(() => NamedKpiSchema().nullable())).nullish(),
    lessons: z.string().nullish(),
  });
}

export function GranteeStatsInputSchema(): z.ZodObject<
  Properties<GranteeStatsInput>
> {
  return z.object({
    avgDailyTVL: z.number().nullish(),
    avgDailyTXNS: z.number().nullish(),
    avgDailyUniqueUsers: z.number().nullish(),
    changes: z.string().nullish(),
    kpis: z.array(z.lazy(() => NamedKpiInputSchema().nullable())).nullish(),
    lessons: z.string().nullish(),
  });
}

export function InitGranteeInputSchema(): z.ZodObject<
  Properties<InitGranteeInput>
> {
  return z.object({
    authorizedSignerAddress: z.string(),
    disbursementContractAddress: z.string(),
    fundingAddress: z.string(),
    fundingType: z.array(FundingTypeInputSchema),
    grantSize: z.number(),
    grantSummary: z.string().nullish(),
    granteeName: z.string(),
    matchingGrantSize: z.number(),
    metricsDashboardLink: z.string().nullish(),
    numberOfPhases: z.number().nullish(),
    phaseDuration: z.number().nullish(),
    startDate: z.iso.datetime(),
  });
}

export function MetaSchema(): z.ZodObject<Properties<Meta>> {
  return z.object({
    __typename: z.literal("Meta").optional(),
    isAdmin: z.boolean().nullish(),
    protocolVersion: z.string(),
    value: z.string().nullish(),
  });
}

export function NamedKpiSchema(): z.ZodObject<Properties<NamedKpi>> {
  return z.object({
    __typename: z.literal("NamedKpi").optional(),
    name: z.string().nullish(),
    value: z.number().nullish(),
  });
}

export function NamedKpiInputSchema(): z.ZodObject<Properties<NamedKpiInput>> {
  return z.object({
    name: z.string().nullish(),
    value: z.number().nullish(),
  });
}

export function PhaseSchema(): z.ZodObject<Properties<Phase>> {
  return z.object({
    __typename: z.literal("Phase").optional(),
    actuals: z.lazy(() => GranteeActualsSchema().nullish()),
    endDate: z.iso.datetime(),
    planned: z.lazy(() => GranteePlannedSchema().nullish()),
    startDate: z.iso.datetime(),
    stats: z.lazy(() => GranteeStatsSchema().nullish()),
    status: StatusSchema.nullish(),
  });
}

export function RemoveEditorInputSchema(): z.ZodObject<
  Properties<RemoveEditorInput>
> {
  return z.object({
    editorAddress: z.string(),
  });
}

export function UpdateMetaInputSchema(): z.ZodObject<
  Properties<UpdateMetaInput>
> {
  return z.object({
    index: z.number().nullish(),
    isAdmin: z.boolean().nullish(),
    protocolVersion: z.string(),
    value: z.string().nullish(),
  });
}
