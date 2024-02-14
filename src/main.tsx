import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

import { DndContextProvider } from "./contexts/DndContext";
import { DatesContextProvider } from "./contexts/DatesContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <DatesContextProvider>
        <DndContextProvider>
          <GoogleOAuthProvider clientId="98239451586-sk6ts53ej8ma9a77pp9ciohmv0h0us3k.apps.googleusercontent.com">
            <App />
          </GoogleOAuthProvider>
        </DndContextProvider>
      </DatesContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
