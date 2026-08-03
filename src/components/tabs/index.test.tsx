import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vite-plus/test";

import { Tabs } from "./index";

const items = [
  { label: "코스A", value: "a" },
  { label: "코스B", value: "b" },
  { label: "코스C", value: "c" },
];

function renderTabs(value = "a") {
  const onChange = vi.fn();
  render(<Tabs items={items} value={value} onChange={onChange} />);
  return { onChange };
}

test("모든 항목을 탭 목록으로 렌더링한다", () => {
  renderTabs();

  expect(screen.getByRole("tablist")).toBeInTheDocument();
  expect(screen.getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
    "코스A",
    "코스B",
    "코스C",
  ]);
});

test("value에 해당하는 탭만 선택 상태로 노출한다", () => {
  renderTabs("b");

  expect(screen.getByRole("tab", { name: "코스B", selected: true })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "코스A", selected: false })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "코스C", selected: false })).toBeInTheDocument();
});

test("탭을 클릭하면 해당 value로 onChange를 호출한다", async () => {
  const user = userEvent.setup();
  const { onChange } = renderTabs("a");

  await user.click(screen.getByRole("tab", { name: "코스C" }));

  expect(onChange).toHaveBeenCalledWith("c");
});

test("방향키로 다음 탭에 포커스를 옮긴다", async () => {
  const user = userEvent.setup();
  renderTabs("a");

  await user.tab();
  expect(screen.getByRole("tab", { name: "코스A" })).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("tab", { name: "코스B" })).toHaveFocus();
});

test("방향키로 이동한 탭을 Enter로 선택한다", async () => {
  const user = userEvent.setup();
  const { onChange } = renderTabs("a");

  await user.tab();
  await user.keyboard("{ArrowRight}{Enter}");

  expect(onChange).toHaveBeenCalledWith("b");
});
