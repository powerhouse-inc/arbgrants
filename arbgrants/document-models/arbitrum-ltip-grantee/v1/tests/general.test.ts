import { generateMock } from "document-model";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArbitrumLtipGranteeDocument,
  initGrantee,
  editGrantee,
  InitGranteeInputSchema,
  EditGranteeInputSchema,
} from "document-models/arbitrum-ltip-grantee/v1";

describe("GeneralOperations", () => {
  it("should handle initGrantee operation", () => {
    const document = utils.createDocument();
    const input = generateMock(InitGranteeInputSchema());

    const updatedDocument = reducer(document, initGrantee(input));

    expect(isArbitrumLtipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "INIT_GRANTEE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editGrantee operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditGranteeInputSchema());

    const updatedDocument = reducer(document, editGrantee(input));

    expect(isArbitrumLtipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_GRANTEE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
