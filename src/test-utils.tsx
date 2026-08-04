import type { ReactNode } from "react";
import { type Root, createRoot } from "react-dom/client";
import { afterEach } from "vite-plus/test";

const mounts: { root: Root; container: HTMLDivElement }[] = [];

export function render(ui: ReactNode) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  mounts.push({ root, container });
  root.render(ui);
}

afterEach(() => {
  for (const { root, container } of mounts) {
    root.unmount();
    container.remove();
  }
  mounts.length = 0;
});
