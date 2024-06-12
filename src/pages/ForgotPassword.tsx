import { Form, Card, Button } from "react-bootstrap";
import "../styles/ForgotPassword.css";
import { ContrastOutline } from "react-ionicons";
import { NavbarsAuth } from "../components/NavbarsAuth";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const base = import.meta.env.VITE_BASE_SERVER;

export const ForgotPassword = () => {
  useDocumentTitle("Forgot Password - Noteify");
  const isPc = useMediaQuery({ query: "(min-width: 600px)" });

  const [email, setEmail] = useState("");
  const [isResent, setIsResent] = useState(false);
  const [count, setCount] = useState(5);
  const [match, setMatch] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const generateCode = async () => {
      const response = await fetch(`${base}/authentication/generate-url`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) console.log("error");
    };

    if (isResent && match && submit) generateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResent, match, submit]);

  useEffect(() => {
    if (isResent && match && submit) {
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
  }, [isResent, count, match, submit]);

  useEffect(() => {
    setSubmit(false);
  }, [email]);

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkUser = async () => {
      const response = await fetch(`${base}/users/forgot-password`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const json = await response.json();
      setSubmit(true);
      setIsResent(true);

      if (json.user) setMatch(true);
      else setMatch(false);
    };

    checkUser();
  };

  return (
    <div className="forgotPassword">
      <NavbarsAuth />
      <div className="black"></div>
      <div className="forgotPasswordContent d-flex justify-content-center align-items-center">
        <Card
          className={`card mb-5 ${isPc ? "py-4 px-3" : "py-3 px-2"}`}
          style={{ width: isPc ? "23em" : "20em" }}
        >
          <Form className="m-auto px-4 py-2 w-100" onSubmit={submitHandler}>
            <div className="d-flex align-items-start mb-3">
              <ContrastOutline
                color={"#00000"}
                rotate
                height="2em"
                width="2em"
              />
              <h4 className="fw-semibold m-auto mx-3">Forgot Password!</h4>
            </div>
            <h6 className="fontSemi mb-3">
              Please enter your email down here, we will send you an email
              verification!
            </h6>
            <Form.Group className=" mt-4" controlId="formPlaintextEmail">
              <Form.Label className="fontSemi fw-semibold">Email</Form.Label>
              <Form.Control
                required
                autoComplete="email"
                type="email"
                placeholder="email@example.com"
                className="fontSemi w-100 mb-3"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </Form.Group>
            {match
              ? submit && (
                  <h6 className="text-success fontSemi fw-semibold">
                    Email found!
                  </h6>
                )
              : submit && (
                  <h6 className="text-danger fontSemi fw-semibold">
                    Email not found!
                  </h6>
                )}
            <Button
              type="submit"
              className="fontSemi fw-semibold mb-3 w-100 py-2 mt-2"
              style={{
                background: "linear-gradient(90deg, #D4145A 0%, #FBB03B 100%",
                border: "none",
              }}
            >
              Check
            </Button>

            {match && submit && (
              <h6 className="fontSemi text-end">
                Don't get the link? ~
                <Button
                  variant="link"
                  className="text-decoration-none fontNormal"
                  disabled={isResent}
                  onClick={() => setIsResent(true)}
                >
                  Resent Link
                </Button>
                {isResent && count}
              </h6>
            )}
          </Form>
        </Card>
      </div>
    </div>
  );
};
