import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { SpeechBubble } from "./index";

test("children 텍스트를 렌더링한다", () => {
  const html = renderToStaticMarkup(<SpeechBubble>코스 둘러보는 중</SpeechBubble>);
  expect(html).toContain("코스 둘러보는 중");
});

test("icon prop을 전달하면 커스텀 아이콘을 렌더링한다", () => {
  const html = renderToStaticMarkup(<SpeechBubble icon="✓">저장 완료</SpeechBubble>);
  expect(html).toContain("✓");
});

test("icon prop이 없으면 기본 원형 아이콘을 렌더링한다", () => {
  const html = renderToStaticMarkup(<SpeechBubble>코스 둘러보는 중</SpeechBubble>);
  expect(html).toContain("span");
});
