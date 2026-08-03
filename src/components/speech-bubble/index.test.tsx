import { render, screen } from "@testing-library/react";
import { expect, test } from "vite-plus/test";

import { SpeechBubble } from "./index";

import { iconDot } from "./index.css";

test("children 텍스트를 렌더링한다", () => {
  render(<SpeechBubble>코스 둘러보는 중</SpeechBubble>);

  expect(screen.getByText("코스 둘러보는 중")).toBeInTheDocument();
});

test("icon prop을 전달하면 해당 아이콘을 렌더링한다", () => {
  render(<SpeechBubble icon={<span aria-label="완료" role="img" />}>저장 완료</SpeechBubble>);

  expect(screen.getByRole("img", { name: "완료" })).toBeInTheDocument();
  expect(screen.getByText("저장 완료")).toBeInTheDocument();
});

test("icon prop을 전달하면 기본 아이콘을 렌더링하지 않는다", () => {
  render(<SpeechBubble icon={<span aria-label="완료" role="img" />}>저장 완료</SpeechBubble>);

  // 기본 아이콘(dot)은 장식용이라 접근성 트리에 노출되지 않아 클래스로만 식별할 수 있다.
  const iconSlot = screen.getByText("저장 완료").firstElementChild;
  expect(iconSlot?.firstElementChild).not.toHaveClass(iconDot);
});

test("icon prop이 없으면 기본 아이콘(dot)을 렌더링한다", () => {
  render(<SpeechBubble>코스 둘러보는 중</SpeechBubble>);

  expect(screen.queryByRole("img")).not.toBeInTheDocument();

  const iconSlot = screen.getByText("코스 둘러보는 중").firstElementChild;
  expect(iconSlot?.firstElementChild).toHaveClass(iconDot);
});
