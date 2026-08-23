import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import type { ToggleValue } from "./index";
import { Toggle } from "./index";

function renderToggle(value: ToggleValue = "map") {
  const onChange = vi.fn();
  render(<Toggle value={value} onChange={onChange} />);
  return { onChange };
}

test("지도와 목록 버튼을 렌더링한다", async () => {
  renderToggle();

  await expect.element(page.getByRole("group", { name: "보기 방식" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "지도로 보기" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "목록으로 보기" })).toBeInTheDocument();
});

test("value가 map이면 지도 버튼만 선택 상태다", async () => {
  renderToggle("map");

  await expect
    .element(page.getByRole("button", { name: "지도로 보기" }))
    .toHaveAttribute("aria-pressed", "true");
  await expect
    .element(page.getByRole("button", { name: "목록으로 보기" }))
    .toHaveAttribute("aria-pressed", "false");
});

test("value가 list면 목록 버튼만 선택 상태다", async () => {
  renderToggle("list");

  await expect
    .element(page.getByRole("button", { name: "목록으로 보기" }))
    .toHaveAttribute("aria-pressed", "true");
  await expect
    .element(page.getByRole("button", { name: "지도로 보기" }))
    .toHaveAttribute("aria-pressed", "false");
});

test("선택되지 않은 버튼을 클릭하면 해당 값으로 onChange를 호출한다", async () => {
  const { onChange } = renderToggle("map");

  await userEvent.click(page.getByRole("button", { name: "목록으로 보기" }));

  expect(onChange).toHaveBeenCalledWith("list");
});

test("이미 선택된 버튼을 클릭하면 onChange를 호출하지 않는다", async () => {
  const { onChange } = renderToggle("map");

  await userEvent.click(page.getByRole("button", { name: "지도로 보기" }));

  expect(onChange).not.toHaveBeenCalled();
});
