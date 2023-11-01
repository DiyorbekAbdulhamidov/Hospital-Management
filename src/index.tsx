import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Routes } from "./routes";
import { AuthProvider } from "./modules/auth/context";
import "./assets/fonts/montserrat.css";
import { EmailProvider } from "./modules/home/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <EmailProvider>
        <Routes />
      </EmailProvider>
    </AuthProvider>
  </React.StrictMode>
);
