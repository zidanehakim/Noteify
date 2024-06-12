import { Form, Card, Button } from "react-bootstrap";
import "../styles/ResetPassword.css";
import { ContrastOutline } from "react-ionicons";
import { NavbarsAuth } from "../components/NavbarsAuth";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../schemas/YupSchemas";
import { useMediaQuery } from "react-responsive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const base = "https://noteify-server.vercel.app";

export const ResetPassword = () => {
  useDocumentTitle("Reset Password - Noteify");
  const isPc = useMediaQuery({ query: "(min-width: 600px)" });

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const onSubmit = () => {
    const changePassword = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      const response = await fetch(
        `${base}/users/reset-password?token=${token}`,
        {
          method: "POST",
          body: JSON.stringify({ password: values.password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const json = await response.json();

      setSubmit(true);

      if (response.ok) setTimeout(() => setRedirect(true), 2000);
      else {
        setSubmitting(false);
        setError(json.error);
      }
    };

    changePassword();
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: { email: "", password: "", cpassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    const checkToken = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      const response = await fetch(
        `${base}/users/reset-password?token=${token}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const json = await response.json();

      setIsLoading(false);
      setIsValid(json.exists);
    };

    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsValid]);

  return isValid ? (
    !redirect ? (
      <div className="resetPassword">
        <NavbarsAuth />
        <div className="black"></div>
        <div className="resetPasswordContent d-flex justify-content-center align-items-center">
          <Card
            className={`card mb-5 ${isPc ? "py-4 px-3" : "py-3 px-2"}`}
            style={{ width: isPc ? "24em" : "20em" }}
          >
            <Form className="m-auto px-4 py-2 w-100" onSubmit={handleSubmit}>
              <div className="d-flex align-items-start mb-3">
                <ContrastOutline
                  color={"#00000"}
                  rotate
                  height="2em"
                  width="2em"
                />
                <h4 className="fw-semibold m-auto mx-3">Reset Password!</h4>
              </div>
              <h6 className="fontSemi mb-2">
                We have verified your identity, please create a new strong
                password that you may remember easily.
              </h6>
              <Form.Group className="mb-2" controlId="formPlaintextPassword">
                <Form.Label className="fontSemi fw-semibold">
                  Password
                </Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "fontSemi w-100 error"
                      : "fontSemi w-100"
                  }
                />
                {errors.password && touched.password && (
                  <p className="fontMini text-danger fw-semibold mt-1">
                    {errors.password}
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPlaintextCpassword">
                <Form.Label className="fontSemi fw-semibold">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  id="cpassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.cpassword && touched.cpassword
                      ? "fontSemi w-100 error"
                      : "fontSemi w-100"
                  }
                />
                {errors.cpassword && touched.cpassword && (
                  <p className="fontMini text-danger fw-semibold mt-1">
                    {errors.cpassword}
                  </p>
                )}
              </Form.Group>
              {submit &&
                (error === "" ? (
                  <h6 className="text-success fontMini fw-semibold">
                    New password has been set, redirecting..
                  </h6>
                ) : (
                  <h6 className="text-danger fontMini fw-semibold">{error}</h6>
                ))}
              <Button
                disabled={isSubmitting}
                type="submit"
                className="fontSemi fw-semibold mb-3 w-100 py-2 mt-2"
                style={{
                  background: "linear-gradient(90deg, #D4145A 0%, #FBB03B 100%",
                  border: "none",
                }}
              >
                Change Password
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className="mx-2 my-2">
      Token is not valid, can't access reset password.
    </div>
  );
};
