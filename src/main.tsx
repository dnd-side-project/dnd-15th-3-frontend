import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/fonts";

import "./styles/theme.css";
import "./styles/global.css";
import { QueryProvider } from "./providers/query-provider";
import { Routes } from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Routes />
    </QueryProvider>
  </StrictMode>,
);
