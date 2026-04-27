/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  arbitrumLtipGranteeDocumentType,
  isArbitrumLtipGranteeDocument,
  assertIsArbitrumLtipGranteeDocument,
  isArbitrumLtipGranteeState,
  assertIsArbitrumLtipGranteeState,
} from "document-models/arbitrum-ltip-grantee/v1";
import { ZodError } from "zod";

describe("ArbitrumLtipGrantee Document Model", () => {
  it("should create a new ArbitrumLtipGrantee document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(arbitrumLtipGranteeDocumentType);
  });

  it("should create a new ArbitrumLtipGrantee document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isArbitrumLtipGranteeDocument(document)).toBe(true);
    expect(isArbitrumLtipGranteeState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ArbitrumLtipGrantee document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsArbitrumLtipGranteeDocument(wrongDocumentType)).toThrow();
      expect(isArbitrumLtipGranteeDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isArbitrumLtipGranteeState(wrongState.state)).toBe(false);
    expect(assertIsArbitrumLtipGranteeState(wrongState.state)).toThrow();
    expect(isArbitrumLtipGranteeDocument(wrongState)).toBe(false);
    expect(assertIsArbitrumLtipGranteeDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isArbitrumLtipGranteeState(wrongInitialState.state)).toBe(false);
    expect(assertIsArbitrumLtipGranteeState(wrongInitialState.state)).toThrow();
    expect(isArbitrumLtipGranteeDocument(wrongInitialState)).toBe(false);
    expect(assertIsArbitrumLtipGranteeDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isArbitrumLtipGranteeDocument(missingIdInHeader)).toBe(false);
    expect(assertIsArbitrumLtipGranteeDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isArbitrumLtipGranteeDocument(missingNameInHeader)).toBe(false);
    expect(assertIsArbitrumLtipGranteeDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isArbitrumLtipGranteeDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsArbitrumLtipGranteeDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isArbitrumLtipGranteeDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsArbitrumLtipGranteeDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
