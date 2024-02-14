import { Button, Form } from "react-bootstrap";
import { ContrastOutline } from "react-ionicons";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { UserType } from "../contexts/AuthContext";
import { useAuthContext } from "../hooks/useAuthContext";

type EmailAuthProps = {
  verify: UserType;
};

const base = "https://easy-teal-alligator-hat.cyclic.app";

export const EmailAuth = ({ verify }: EmailAuthProps) => {
  const auth = useAuthContext();

  const [otp, setOtp] = useState("");
  const [isResent, setIsResent] = useState(false);
  const [count, setCount] = useState(5);
  const [match, setMatch] = useState(true);

  useEffect(() => setIsResent(true), []);

  useEffect(() => {
    const generateCode = async () => {
      const response = await fetch(`${base}/authentication/generate-code`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) console.log("error");
    };

    if (isResent) generateCode();
  }, [isResent]);

  useEffect(() => {
    if (isResent) {
      // Timer
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);

        if (count <= 0) {
          setCount(5);
          setIsResent(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isResent, count]);

  useEffect(() => {
    const matchCode = async () => {
      setMatch(true);
      const response = await fetch(`${base}/authentication/match-code`, {
        method: "POST",
        body: JSON.stringify({ code: otp.toUpperCase() }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const json = await response.json();
      setMatch(json.match);

      if (response.ok) {
        if (json.match)
          auth.dispatch({
            type: "LOGIN",
            payload: { username: json.username, email: json.email },
          });
      } else console.log("error");
    };

    if (otp.length >= 5) matchCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <Form className="m-auto px-4 py-2 w-100">
      <div className="d-flex align-items-start mb-3">
        <ContrastOutline color={"#00000"} rotate height="2em" width="2em" />
        <h4 className="fw-semibold m-auto mx-3">Email Verification</h4>
      </div>
      <h6 className="fontSemi mb-3">
        {`Enter the verification code sent to email ~${verify.email}`}
      </h6>
      <Form.Group className="mb-3 mt-4" controlId="formPlaintextEmail">
        <Form.Label className="fontSemi fw-semibold">Type code here</Form.Label>
        <OtpInput
          inputStyle={{
            height: "2.5em",
            width: "100%",
            fontSize: "1.3em",
            textTransform: "uppercase",
          }}
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderInput={(props) => <input {...props} />}
        />
      </Form.Group>
      {otp.length === 5 && !match && (
        <h6 className="text-danger fw-semibold fontSemi">Code incorrect!</h6>
      )}
      <h6 className="fontSemi mb-3 text-end">
        Don't get the code? ~
        <Button
          variant="link"
          className="text-decoration-none fontNormal"
          disabled={isResent}
          onClick={() => setIsResent(true)}
        >
          Resent code
        </Button>
        {isResent && count}
      </h6>
    </Form>
  );
};
