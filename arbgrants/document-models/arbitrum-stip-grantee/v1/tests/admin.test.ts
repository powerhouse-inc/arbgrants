import { generateMock } from "document-model";
import { describe, expect, it } from "vitest";
import {
  reducer,
  utils,
  isArbitrumStipGranteeDocument,
  addEditor,
  removeEditor,
  AddEditorInputSchema,
  RemoveEditorInputSchema,
} from "document-models/arbitrum-stip-grantee/v1";

describe("AdminOperations", () => {
  it("should handle addEditor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddEditorInputSchema());

    const updatedDocument = reducer(document, addEditor(input));

    expect(isArbitrumStipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_EDITOR");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeEditor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveEditorInputSchema());

    const updatedDocument = reducer(document, removeEditor(input));

    expect(isArbitrumStipGranteeDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_EDITOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
