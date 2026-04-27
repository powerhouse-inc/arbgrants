import { isAdminRole } from "../utils.js";
import validators from "../validators.js";
import type { ArbitrumLtipGranteeAdminOperations } from "document-models/arbitrum-ltip-grantee/v1";

export const arbitrumLtipGranteeAdminOperations: ArbitrumLtipGranteeAdminOperations =
  {
    addEditorOperation(state, action) {
      const signer = action.context?.signer?.user.address;
      if (!isAdminRole(state, signer)) {
        throw new Error(`Unauthorized signer`);
      }

      const { editorAddress } = action.input;
      if (!validators.isValidAddress(editorAddress)) {
        throw new Error("Invalid address");
      }

      const editorAddresses = new Set(state.editorAddresses);
      editorAddresses.add(editorAddress);

      state.editorAddresses = Array.from(editorAddresses);
    },
    removeEditorOperation(state, action) {
      const signer = action.context?.signer?.user.address;
      if (!isAdminRole(state, signer)) {
        throw new Error(`Unauthorized signer`);
      }

      const { editorAddress } = action.input;
      if (!validators.isValidAddress(editorAddress)) {
        throw new Error("Invalid address");
      }

      const editorAddresses = new Set(state.editorAddresses);
      editorAddresses.delete(editorAddress);

      state.editorAddresses = Array.from(editorAddresses);
    },
  };
