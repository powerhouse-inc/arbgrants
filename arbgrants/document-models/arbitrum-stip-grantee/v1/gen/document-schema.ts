import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { arbitrumStipGranteeDocumentType } from "./document-type.js";
import { ArbitrumStipGranteeStateSchema } from "./schema/zod.js";
import type {
  ArbitrumStipGranteeDocument,
  ArbitrumStipGranteePHState,
} from "./types.js";

/** Schema for validating the header object of a ArbitrumStipGrantee document */
export const ArbitrumStipGranteeDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(arbitrumStipGranteeDocumentType),
  });

/** Schema for validating the state object of a ArbitrumStipGrantee document */
export const ArbitrumStipGranteePHStateSchema = BaseDocumentStateSchema.extend({
  global: ArbitrumStipGranteeStateSchema(),
});

export const ArbitrumStipGranteeDocumentSchema = z.object({
  header: ArbitrumStipGranteeDocumentHeaderSchema,
  state: ArbitrumStipGranteePHStateSchema,
  initialState: ArbitrumStipGranteePHStateSchema,
});

/** Simple helper function to check if a state object is a ArbitrumStipGrantee document state object */
export function isArbitrumStipGranteeState(
  state: unknown,
): state is ArbitrumStipGranteePHState {
  return ArbitrumStipGranteePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ArbitrumStipGrantee document state object */
export function assertIsArbitrumStipGranteeState(
  state: unknown,
): asserts state is ArbitrumStipGranteePHState {
  ArbitrumStipGranteePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ArbitrumStipGrantee document */
export function isArbitrumStipGranteeDocument(
  document: unknown,
): document is ArbitrumStipGranteeDocument {
  return ArbitrumStipGranteeDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ArbitrumStipGrantee document */
export function assertIsArbitrumStipGranteeDocument(
  document: unknown,
): asserts document is ArbitrumStipGranteeDocument {
  ArbitrumStipGranteeDocumentSchema.parse(document);
}
