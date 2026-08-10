import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import type { PlaceIconProps } from "./index";
import { PlaceIcon } from "./index";

async function renderIcon(props: PlaceIconProps) {
  render(
    <div data-testid="host">
      <PlaceIcon {...props} />
    </div>,
  );

  const host = page.getByTestId("host");
  await expect.element(host).toBeInTheDocument();

  return host.element().firstElementChild as HTMLElement;
}

test("label이 없으면 장식용으로 숨긴다", async () => {
  const icon = await renderIcon({ category: "bar" });

  expect(icon.getAttribute("aria-hidden")).toBe("true");
  expect(icon.getAttribute("role")).toBeNull();
});

test("label이 있으면 이미지로 노출한다", async () => {
  await renderIcon({ category: "bar", label: "바" });

  await expect.element(page.getByRole("img", { name: "바" })).toBeInTheDocument();
});
