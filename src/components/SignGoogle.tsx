import { Button } from "react-bootstrap";
import gicon from "../images/gicon.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../hooks/useAuthContext";

type SignGoogleProps = {
  rememberme: boolean;
};

const base = "https://easy-teal-alligator-hat.cyclic.app";

export const SignGoogle = ({ rememberme }: SignGoogleProps) => {
  const auth = useAuthContext();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Using the access token to make a request to the Google People API
      fetch(
        "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`, // Here is where the access token is used
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          const response = await fetch(`${base}/users/logingoogle/`, {
            method: "POST",
            body: JSON.stringify({
              username: data.names[0].displayName,
              email: data.emailAddresses[0].value,
              profile: data.photos[0].url,
              rememberme,
            }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const json = await response.json();

          auth.dispatch({
            type: "LOGIN",
            payload: {
              username: json.username,
              email: json.email,
              profile: json.profile,
            },
          });
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    },
  });

  return (
    <Button
      className="w-100 d-flex position-relative bg-red border-0"
      style={{ padding: ".6em" }}
      onClick={() => login()}
    >
      <img
        src={gicon}
        alt="Gmail Icon"
        width="25px"
        className="position-absolute bg-white rounded"
        style={{
          left: "3%",
          top: "50%",
          transform: "translate(0,-50%)",
        }}
      />
      <h6 className="m-auto fw-semibold fontSemi">Log in with google</h6>
    </Button>
  );
};
