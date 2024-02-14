import { Form, Card, Button } from "react-bootstrap";
import "../styles/Signup.css";
import { ContrastOutline } from "react-ionicons";
import { NavbarsAuth } from "../components/NavbarsAuth";
import { useSignup } from "../hooks/useSignup";
import { EmailAuth } from "../components/EmailAuth";
import { signupSchema } from "../schemas/YupSchemas";
import { useFormik } from "formik";
import { useMediaQuery } from "react-responsive";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Signup = () => {
  useDocumentTitle("Sign up - Noteify");
  const isPc = useMediaQuery({ query: "(min-width: 600px)" });

  const { signup, error, verify } = useSignup();

  const onSubmit = async () => {
    await signup(values.username, values.email, values.password);
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
    initialValues: { username: "", email: "", password: "" },
    validationSchema: signupSchema,
    onSubmit,
  });

  return (
    <div className="signup">
      <NavbarsAuth />
      <div className="black"></div>
      <div className="signupContent d-flex justify-content-center align-items-center">
        <Card
          className={`card mb-5 ${isPc ? "py-4 px-3" : "py-3 px-2"}`}
          style={{ width: isPc ? "24em" : "20em" }}
        >
          {verify.email === "" ? (
            <Form className="m-auto px-4 py-2 w-100" onSubmit={handleSubmit}>
              <div className="d-flex align-items-start mb-3">
                <ContrastOutline
                  color={"#00000"}
                  rotate
                  height="2em"
                  width="2em"
                />
                <h4 className="fw-semibold m-auto mx-3">Create an account</h4>
              </div>
              <h6 className="fontSemi mb-2">
                Simple and fast sign up before you use our service.
              </h6>
              {/* <SignGoogle /> */}
              <Form.Group className="mb-2 mt-2">
                <Form.Label className="fontSemi fw-semibold">
                  Username
                </Form.Label>
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="What should we call you?"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? "fontSemi w-100 error"
                      : "fontSemi w-100"
                  }
                />
                {errors.username && touched.username && (
                  <p className="fontMini text-danger fw-semibold mt-1">
                    {errors.username}
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-2">
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
                Sign up now
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
