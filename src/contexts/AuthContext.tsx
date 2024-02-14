import { createContext, useEffect, useReducer, useState } from "react";

export type UserType = {
  username: string;
  email: string;
  profile?: string;
};

type PayloadType = {
  user: UserType | null;
};

type ActionType1 = {
  type: "LOGIN";
  payload: UserType;
};
type ActionType2 = {
  type: "LOGOUT";
};

type ActionType = ActionType1 | ActionType2;

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  isLoading: boolean;
  dispatch: React.Dispatch<ActionType>;
} & PayloadType;

export const AuthContext = createContext({} as AuthContextType);

const base = "https://noteify-server.onrender.com";

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const reducer = (state: PayloadType, action: ActionType) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  };
  const [userState, dispatch] = useReducer(reducer, { user: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkCookie = async () => {
      const response = await fetch(`${base}/users/validatecookie`, {
        method: "GET",
        credentials: "include",
      });
      const json = await response.json();

      try {
        if (response.ok && json.verified) {
          dispatch({
            type: "LOGIN",
            payload: json,
          });
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    checkCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ ...userState, dispatch, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
