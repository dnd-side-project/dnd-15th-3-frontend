import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { PreferenceButton } from "./index";

test("좋아요 개수를 렌더링한다", () => {
  const html = renderToStaticMarkup(<PreferenceButton count={3} type="like" />);
  expect(html).toContain(">3<");
});

test("count가 0이어도 0을 렌더링한다", () => {
  const html = renderToStaticMarkup(<PreferenceButton count={0} type="like" />);
  expect(html).toContain(">0<");
});

test("selected가 true이면 aria-pressed가 true이다", () => {
  const html = renderToStaticMarkup(<PreferenceButton count={3} selected type="like" />);
  expect(html).toContain('aria-pressed="true"');
});

test("selected가 false이면 aria-pressed가 false이다", () => {
  const html = renderToStaticMarkup(<PreferenceButton count={3} type="like" />);
  expect(html).toContain('aria-pressed="false"');
});

test("type에 따라 button 태그로 렌더링된다", () => {
  const like = renderToStaticMarkup(<PreferenceButton count={1} type="like" />);
  const dislike = renderToStaticMarkup(<PreferenceButton count={1} type="dislike" />);
  expect(like).toContain("<button");
  expect(dislike).toContain("<button");
});

test("disabled가 true이면 disabled 속성이 렌더링된다", () => {
  const html = renderToStaticMarkup(<PreferenceButton count={1} disabled type="like" />);
  expect(html).toContain('disabled=""');
});
