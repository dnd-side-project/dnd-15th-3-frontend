import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { LocationButton } from "./index";

function renderLocationButton(disabled?: boolean) {
  const onClick = vi.fn();
  render(<LocationButton disabled={disabled} onClick={onClick} />);
  return { onClick };
}

test("현재 위치 버튼을 렌더링한다", async () => {
  renderLocationButton();

  await expect.element(page.getByRole("button", { name: "현재 위치" })).toBeInTheDocument();
});

test("클릭하면 onClick을 호출한다", async () => {
  const { onClick } = renderLocationButton();

  await userEvent.click(page.getByRole("button", { name: "현재 위치" }));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("disabled면 클릭해도 onClick을 호출하지 않는다", async () => {
  const { onClick } = renderLocationButton(true);

  await userEvent.click(page.getByRole("button", { name: "현재 위치" }), { force: true });

  expect(onClick).not.toHaveBeenCalled();
});
