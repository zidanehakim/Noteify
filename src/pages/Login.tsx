import { Form, Card, Button } from "react-bootstrap";
import "../styles/Login.css";
import { SignGoogle } from "../components/SignGoogle";
import { ContrastOutline } from "react-ionicons";
import { NavbarsAuth } from "../components/NavbarsAuth";
import { useLogin } from "../hooks/useLogin";
import { EmailAuth } from "../components/EmailAuth";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/YupSchemas";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Login = () => {
  useDocumentTitle("Log in - Noteify");
  const isPc = useMediaQuery({ query: "(min-width: 600px)" });

  const { login, error, verify } = useLogin();

  const [rememberme, setRememberme] = useState(false);

  const onSubmit = async () => {
    await login(values.email, values.password, rememberme);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      rememberme: false,
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="login">
      <NavbarsAuth />
      <div className="black"></div>
      <div className="loginContent d-flex justify-content-center align-items-center ">
        <Card
          className={`card mb-5 ${isPc ? "py-4 px-3" : "py-3 px-2"}`}
          style={{ width: isPc ? "23em" : "20em" }}
        >
          {verify.email === "" ? (
            <Form
              className="m-auto px-4 py-2 w-100 position-relative "
              onSubmit={handleSubmit}
            >
              <div className="d-flex align-items-start mb-3">
                <ContrastOutline
                  color={"#00000"}
                  rotate
                  height="2em"
                  width="2em"
                />
                <h4 className="fw-semibold m-auto mx-3">Hello deadliner!</h4>
              </div>
              <h6 className="mb-3 fontSemi">
                Please login to continue, choose login method down here.
              </h6>
              <SignGoogle rememberme={values.rememberme} />
              <Form.Group className="mb-2 mt-3">
                <Form.Label className="fontSemi fw-semibold">Email</Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "fontSemi w-100 error"
                      : "fontSemi w-100"
                  }
                />
                {errors.email && touched.email && (
                  <p className="fontMini text-danger fw-semibold mt-1">
                    {errors.email}
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
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
              <Link
                className="text-decoration-none fontSemi"
                to="/forgot-password"
              >
                Forgot password?
              </Link>

              <div
                key="checkbox"
                className=" d-inline-block fontSemi mt-1"
                style={{ position: "absolute", right: "7%" }}
              >
                <Form.Check
                  type="checkbox"
                  id={`check-api-$checkbox`}
                  isValid
                  className="d-inline-block"
                  checked={rememberme}
                  onChange={() => setRememberme(!rememberme)}
                ></Form.Check>
                <Form.Label className="ms-2">Remember me</Form.Label>
              </div>

              {error && (
                <div className="fontSemi text-danger fw-semibold mt-2">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="fontSemi fw-semibold mb-2 w-100 py-2 mt-3"
                style={{
                  background: "linear-gradient(90deg, #D4145A 0%, #FBB03B 100%",
                  border: "none",
                }}
                disabled={isSubmitting}
              >
                Log in
              </Button>
            </Form>
          ) : (
            <EmailAuth verify={verify} />
          )}
        </Card>
      </div>
    </div>
  );
};
