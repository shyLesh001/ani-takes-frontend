import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {" "}
    {/* ✅ Wrap Everything in BrowserRouter */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
