import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { arbitrumLtipGranteeDocumentType } from "./document-type.js";
import { ArbitrumLtipGranteeStateSchema } from "./schema/zod.js";
import type {
  ArbitrumLtipGranteeDocument,
  ArbitrumLtipGranteePHState,
} from "./types.js";

/** Schema for validating the header object of a ArbitrumLtipGrantee document */
export const ArbitrumLtipGranteeDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(arbitrumLtipGranteeDocumentType),
  });

/** Schema for validating the state object of a ArbitrumLtipGrantee document */
export const ArbitrumLtipGranteePHStateSchema = BaseDocumentStateSchema.extend({
  global: ArbitrumLtipGranteeStateSchema(),
});

export const ArbitrumLtipGranteeDocumentSchema = z.object({
  header: ArbitrumLtipGranteeDocumentHeaderSchema,
  state: ArbitrumLtipGranteePHStateSchema,
  initialState: ArbitrumLtipGranteePHStateSchema,
});

/** Simple helper function to check if a state object is a ArbitrumLtipGrantee document state object */
export function isArbitrumLtipGranteeState(
  state: unknown,
): state is ArbitrumLtipGranteePHState {
  return ArbitrumLtipGranteePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ArbitrumLtipGrantee document state object */
export function assertIsArbitrumLtipGranteeState(
  state: unknown,
): asserts state is ArbitrumLtipGranteePHState {
  ArbitrumLtipGranteePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ArbitrumLtipGrantee document */
export function isArbitrumLtipGranteeDocument(
  document: unknown,
): document is ArbitrumLtipGranteeDocument {
  return ArbitrumLtipGranteeDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ArbitrumLtipGrantee document */
export function assertIsArbitrumLtipGranteeDocument(
  document: unknown,
): asserts document is ArbitrumLtipGranteeDocument {
  ArbitrumLtipGranteeDocumentSchema.parse(document);
}
