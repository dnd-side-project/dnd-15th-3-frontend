import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { Tabs } from "./index";

const items = [
  { label: "코스A", value: "a", content: "A 코스 내용" },
  { label: "코스B", value: "b", content: "B 코스 내용" },
  { label: "코스C", value: "c", content: "C 코스 내용" },
];

function renderTabs(value = "a") {
  const onChange = vi.fn();
  render(<Tabs items={items} label="코스 선택" value={value} onChange={onChange} />);
  return { onChange };
}

test("모든 항목을 탭 목록으로 렌더링한다", async () => {
  renderTabs();

  await expect.element(page.getByRole("tablist", { name: "코스 선택" })).toBeInTheDocument();
  await expect.element(page.getByRole("tab", { name: "코스A" })).toBeInTheDocument();
  await expect.element(page.getByRole("tab", { name: "코스B" })).toBeInTheDocument();
  await expect.element(page.getByRole("tab", { name: "코스C" })).toBeInTheDocument();
});

test("선택된 탭에 연결된 패널의 내용을 보여준다", async () => {
  renderTabs("b");

  await expect.element(page.getByRole("tabpanel", { name: "코스B" })).toBeInTheDocument();
  await expect.element(page.getByText("B 코스 내용")).toBeInTheDocument();
});

test("선택되지 않은 탭의 패널은 감춰진다", async () => {
  renderTabs("b");

  await expect.element(page.getByText("A 코스 내용")).not.toBeVisible();
  await expect.element(page.getByText("C 코스 내용")).not.toBeVisible();
});

test("value에 해당하는 탭만 선택 상태로 노출한다", async () => {
  renderTabs("b");

  await expect
    .element(page.getByRole("tab", { name: "코스B", selected: true }))
    .toBeInTheDocument();
  await expect
    .element(page.getByRole("tab", { name: "코스A", selected: false }))
    .toBeInTheDocument();
  await expect
    .element(page.getByRole("tab", { name: "코스C", selected: false }))
    .toBeInTheDocument();
});

test("탭을 클릭하면 해당 value로 onChange를 호출한다", async () => {
  const { onChange } = renderTabs("a");

  await userEvent.click(page.getByRole("tab", { name: "코스C" }));

  expect(onChange).toHaveBeenCalledWith("c");
});

test("이미 선택된 탭을 클릭해도 다른 값으로 바뀌지 않는다", async () => {
  const { onChange } = renderTabs("a");

  await userEvent.click(page.getByRole("tab", { name: "코스A" }));

  expect(onChange).not.toHaveBeenCalledWith("b");
  expect(onChange).not.toHaveBeenCalledWith("c");
});

test("방향키로 다음 탭에 포커스를 옮긴다", async () => {
  renderTabs("a");

  const first = page.getByRole("tab", { name: "코스A" });
  await expect.element(first).toBeInTheDocument();
  first.element().focus();

  await userEvent.keyboard("{ArrowRight}");
  await expect.element(page.getByRole("tab", { name: "코스B" })).toHaveFocus();
});

test("방향키로 이동한 탭을 Enter로 선택한다", async () => {
  const { onChange } = renderTabs("a");

  const first = page.getByRole("tab", { name: "코스A" });
  await expect.element(first).toBeInTheDocument();
  first.element().focus();

  await userEvent.keyboard("{ArrowRight}{Enter}");

  expect(onChange).toHaveBeenCalledWith("b");
});
