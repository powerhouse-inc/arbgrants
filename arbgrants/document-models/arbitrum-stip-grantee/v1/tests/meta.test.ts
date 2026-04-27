import { generateMock } from "document-model";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArbitrumStipGranteeDocument,
  addMeta,
  updateMeta,
  deleteMeta,
  AddMetaInputSchema,
  UpdateMetaInputSchema,
  DeleteMetaInputSchema,
} from "document-models/arbitrum-stip-grantee/v1";

describe("MetaOperations", () => {
  it("should handle addMeta operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddMetaInputSchema());

    const updatedDocument = reducer(document, addMeta(input));

    expect(isArbitrumStipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_META");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateMeta operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateMetaInputSchema());

    const updatedDocument = reducer(document, updateMeta(input));

    expect(isArbitrumStipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_META",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteMeta operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteMetaInputSchema());

    const updatedDocument = reducer(document, deleteMeta(input));

    expect(isArbitrumStipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_META",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
