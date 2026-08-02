import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { ShareButtonGroup } from "./index";

function renderShareButtonGroup() {
  return renderToStaticMarkup(<ShareButtonGroup title="모임 코스 완성!" imageUrl="/vite.svg" />);
}

test("링크 복사 버튼과 카카오톡 공유 버튼을 aria-label과 함께 렌더링한다", () => {
  const html = renderShareButtonGroup();

  expect(html).toContain('aria-label="링크 복사"');
  expect(html).toContain('aria-label="카카오톡으로 공유"');
});

test("카카오 공유 버튼은 SDK 로딩 중 disabled 상태로 렌더링된다", () => {
  const html = renderShareButtonGroup();

  expect(html).toContain('disabled=""');
});
