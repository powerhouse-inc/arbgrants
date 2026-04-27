import { Role } from "../components/UserProvider.js";
import useRole from "./use-role.js";

const useIsAdmin = () => useRole() === Role.Root;

export default useIsAdmin;
