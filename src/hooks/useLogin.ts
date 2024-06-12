import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { UserType } from "../contexts/AuthContext";

const base = import.meta.env.VITE_BASE_SERVER

export const useLogin = () => {
  const auth = useAuthContext();

  const [error, setError] = useState("");
  const [verify, setVerify] = useState({ username: "", email: "" } as UserType);

  const login = async (
    email: string,
    password: string,
    rememberme: boolean
  ) => {
    setError("");

    const response = await fetch(`${base}/users/login/`, {
      method: "POST",
      body: JSON.stringify({ email, password, rememberme }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const json = await response.json();

    if (!response.ok) setError(json.error);
    else {
      setVerify({
        username: json.username,
        email: !json.verified ? json.email : "",
      });

      if (json.verified)
        auth.dispatch({
          type: "LOGIN",
          payload: json,
        });
    }
  };

  return { login, error, verify };
};
