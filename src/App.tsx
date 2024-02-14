import { MemoizedPlanner } from "./pages/Planner";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "animate.css";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Loading } from "./components/Loading";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { Landing } from "./pages/Landing";

function App() {
  const auth = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {!auth.isLoading ? (
        <>
          <Route
            path="/login"
            element={!auth.user ? <Login /> : <Navigate to="/planner" />}
          />
          <Route
            path="/signup"
            element={!auth.user ? <Signup /> : <Navigate to="/planner" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/planner"
            element={auth.user ? <MemoizedPlanner /> : <Navigate to="/login" />}
          />
        </>
      ) : (
        <Loading />
      )}
    </Routes>
  );
}

export default App;
