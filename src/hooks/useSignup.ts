import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { UserType } from "../contexts/AuthContext";

const base = "https://easy-teal-alligator-hat.cyclic.app";

export const useSignup = () => {
  const auth = useAuthContext();

  const [error, setError] = useState("");
  const [verify, setVerify] = useState({ username: "", email: "" } as UserType);

  const signup = async (username: string, email: string, password: string) => {
    setError("");

    const response = await fetch(`${base}/users/signup/`, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
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

  return { signup, error, verify };
};
