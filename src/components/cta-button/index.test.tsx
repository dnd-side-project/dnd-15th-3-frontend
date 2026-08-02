import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { CtaButton, CtaButtonRow } from "./index";

test("라벨을 포함한 버튼을 렌더링한다", () => {
  const html = renderToStaticMarkup(<CtaButton>다음</CtaButton>);
  expect(html).toContain("다음");
  expect(html).toContain('type="button"');
  expect(html).not.toMatch(/\bdisabled\b/);
});

test("disabled 상태에서는 disabled 속성이 추가된다", () => {
  const html = renderToStaticMarkup(<CtaButton disabled>다음</CtaButton>);
  expect(html).toContain("disabled");
});

test("CtaButtonRow는 위로/다음 버튼을 함께 렌더링한다", () => {
  const html = renderToStaticMarkup(
    <CtaButtonRow nextLabel="다음" onBack={() => {}} onNext={() => {}} />,
  );
  expect(html).toContain("위로");
  expect(html).toContain("다음");
});

test("CtaButtonRow의 backLabel을 커스텀할 수 있다", () => {
  const html = renderToStaticMarkup(
    <CtaButtonRow backLabel="이전" nextLabel="다음" onBack={() => {}} onNext={() => {}} />,
  );
  expect(html).toContain("이전");
});
