import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { Chip, ChipGroup } from "./index";

test("라벨 텍스트를 렌더링한다", () => {
  const html = renderToStaticMarkup(<Chip>음식점</Chip>);
  expect(html).toContain("음식점");
});

test("미선택 상태는 aria-pressed가 false이고 삭제 버튼이 없다", () => {
  const html = renderToStaticMarkup(<Chip>음식점</Chip>);
  expect(html).toContain('aria-pressed="false"');
  expect(html).not.toContain("삭제");
});

test("selected가 true면 aria-pressed가 true다", () => {
  const html = renderToStaticMarkup(<Chip selected>전체</Chip>);
  expect(html).toContain('aria-pressed="true"');
});

test("onRemove를 전달하면 삭제 버튼이 렌더링된다", () => {
  const html = renderToStaticMarkup(
    <Chip selected onRemove={() => {}}>
      문화·예술
    </Chip>,
  );
  expect(html).toContain('aria-label="삭제"');
});

test("onRemove가 없으면 selected여도 삭제 버튼이 없다 (전체 칩)", () => {
  const html = renderToStaticMarkup(<Chip selected>전체</Chip>);
  expect(html).not.toContain('aria-label="삭제"');
});

test("ChipGroup은 자식 칩들을 함께 렌더링한다", () => {
  const html = renderToStaticMarkup(
    <ChipGroup>
      <Chip>전체</Chip>
      <Chip>음식점</Chip>
    </ChipGroup>,
  );
  expect(html).toContain("전체");
  expect(html).toContain("음식점");
});
