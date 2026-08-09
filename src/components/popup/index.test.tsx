import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import type { PopupProps } from "./index";
import { Popup } from "./index";

function renderPopup(props: Partial<PopupProps> = {}) {
  const onOpenChange = vi.fn();
  render(
    <Popup
      open
      title="이미 추가된 장소에요"
      description="다른 장소를 찾아봐요"
      onOpenChange={onOpenChange}
      {...props}
    />,
  );
  return { onOpenChange };
}

test("open이 false면 아무것도 렌더링하지 않는다", async () => {
  renderPopup({ open: false });

  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  await expect.element(page.getByText("이미 추가된 장소에요")).not.toBeInTheDocument();
});

test("제목을 대화상자의 접근성 이름으로 연결한다", async () => {
  renderPopup();

  await expect
    .element(page.getByRole("dialog", { name: "이미 추가된 장소에요" }))
    .toBeInTheDocument();
});

test("설명을 대화상자의 접근성 설명으로 연결한다", async () => {
  renderPopup();

  await expect
    .element(page.getByRole("dialog"))
    .toHaveAccessibleDescription("다른 장소를 찾아봐요");
});

test("설명이 없으면 접근성 설명을 붙이지 않는다", async () => {
  renderPopup({ description: undefined });

  await expect.element(page.getByRole("dialog")).toHaveAccessibleDescription("");
});

test("닫기 버튼을 누르면 onOpenChange를 false로 호출한다", async () => {
  const { onOpenChange } = renderPopup();

  await userEvent.click(page.getByRole("button", { name: "닫기" }));

  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test("ESC를 누르면 onOpenChange를 false로 호출한다", async () => {
  const { onOpenChange } = renderPopup();

  await expect.element(page.getByRole("dialog")).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");

  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test("showClose가 false면 닫기 버튼을 렌더링하지 않는다", async () => {
  renderPopup({ showClose: false });

  await expect.element(page.getByRole("dialog")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "닫기" })).not.toBeInTheDocument();
});

test("미디어 영역에 전달한 노드를 렌더링한다", async () => {
  renderPopup({ media: <div data-testid="popup-media" /> });

  await expect.element(page.getByTestId("popup-media")).toBeInTheDocument();
});
