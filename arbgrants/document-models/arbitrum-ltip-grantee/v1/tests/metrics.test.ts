import { generateMock } from "document-model";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArbitrumLtipGranteeDocument,
  editPhase,
  EditPhaseInputSchema,
} from "document-models/arbitrum-ltip-grantee/v1";

describe("MetricsOperations", () => {
  it("should handle editPhase operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditPhaseInputSchema());

    const updatedDocument = reducer(document, editPhase(input));

    expect(isArbitrumLtipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_PHASE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
