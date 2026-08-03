import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { SpeechBubble } from "./index";

import { iconDot } from "./index.css";

test("children 텍스트를 렌더링한다", async () => {
  render(<SpeechBubble>코스 둘러보는 중</SpeechBubble>);

  await expect.element(page.getByText("코스 둘러보는 중")).toBeInTheDocument();
});

test("icon prop을 전달하면 해당 아이콘을 렌더링한다", async () => {
  render(<SpeechBubble icon={<span aria-label="완료" role="img" />}>저장 완료</SpeechBubble>);

  await expect.element(page.getByRole("img", { name: "완료" })).toBeInTheDocument();
  await expect.element(page.getByText("저장 완료")).toBeInTheDocument();
});

test("icon prop을 전달하면 기본 아이콘을 렌더링하지 않는다", async () => {
  render(<SpeechBubble icon={<span aria-label="완료" role="img" />}>저장 완료</SpeechBubble>);

  const bubble = page.getByText("저장 완료");
  await expect.element(bubble).toBeInTheDocument();

  // 기본 아이콘(dot)은 장식용이라 접근성 트리에 노출되지 않아 클래스로만 식별할 수 있다.
  const iconSlot = bubble.element().firstElementChild;
  expect(iconSlot?.firstElementChild).not.toHaveClass(iconDot);
});

test("icon prop이 없으면 기본 아이콘(dot)을 렌더링한다", async () => {
  render(<SpeechBubble>코스 둘러보는 중</SpeechBubble>);

  const bubble = page.getByText("코스 둘러보는 중");
  await expect.element(bubble).toBeInTheDocument();
  await expect.element(page.getByRole("img")).not.toBeInTheDocument();

  // 기본 아이콘(dot)은 장식용이라 접근성 트리에 노출되지 않아 클래스로만 식별할 수 있다.
  const iconSlot = bubble.element().firstElementChild;
  expect(iconSlot?.firstElementChild).toHaveClass(iconDot);
});
