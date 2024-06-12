import { useAuthContext } from "./useAuthContext";

const base = import.meta.env.VITE_BASE_SERVER;

export const useLogout = () => {
  const auth = useAuthContext();

  const logout = async () => {
    auth.dispatch({ type: "LOGOUT" });
    const response = await fetch(`${base}/users/logout/`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) console.log("Log out Failed");
  };

  return { logout };
};
