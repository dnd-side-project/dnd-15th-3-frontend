import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/theme.css";
import "./styles/global.css";
import "./index.css";
import App from "./app.tsx";
import { QueryProvider } from "./providers/query-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);
