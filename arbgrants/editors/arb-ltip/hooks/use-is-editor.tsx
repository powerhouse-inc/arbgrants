import { Role } from "../components/UserProvider.js";
import useRole from "./use-role.js";

const useIsEditor = () => {
  const role = useRole();
  return role === Role.Root || role === Role.Editor;
};

export default useIsEditor;
