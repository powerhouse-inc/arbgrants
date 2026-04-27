import type { ArbitrumStipGranteeState } from "document-models/arbitrum-stip-grantee";
import { createContext } from "react";

type User = { address?: string };

export enum Role {
  Root = "root",
  Editor = "editor",
  Viewer = "viewer",
}

type UserContextType = {
  user: User | undefined;
  state: ArbitrumStipGranteeState | undefined;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  state: undefined,
});

type UserProviderProps = {
  user: User | undefined;
  state: ArbitrumStipGranteeState | undefined;
  children: React.ReactNode;
};

export const UserProvider = ({ user, state, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user, state }}>
      {children}
    </UserContext.Provider>
  );
};
