import type { ReactNode } from "react";
import { type Root, createRoot } from "react-dom/client";
import { afterEach } from "vite-plus/test";

let root: Root | undefined;
let container: HTMLDivElement | undefined;

export function render(ui: ReactNode) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  root.render(ui);
}

afterEach(() => {
  root?.unmount();
  container?.remove();
  root = undefined;
  container = undefined;
});
