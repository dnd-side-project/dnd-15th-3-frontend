import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { Tabs } from "./index";

const items = [
  { label: "코스A", value: "a" },
  { label: "코스B", value: "b" },
  { label: "코스C", value: "c" },
];

test("모든 항목을 탭으로 렌더링한다", () => {
  const html = renderToStaticMarkup(<Tabs items={items} value="a" onChange={() => {}} />);

  expect(html).toContain('role="tablist"');
  expect(html).toContain("코스A");
  expect(html).toContain("코스B");
  expect(html).toContain("코스C");
});

test("value에 해당하는 탭에만 aria-selected=true를 설정한다", () => {
  const html = renderToStaticMarkup(<Tabs items={items} value="b" onChange={() => {}} />);

  const tabA = html.match(/aria-selected="([^"]*)"[^>]*>코스A/)?.[1];
  const tabB = html.match(/aria-selected="([^"]*)"[^>]*>코스B/)?.[1];
  const tabC = html.match(/aria-selected="([^"]*)"[^>]*>코스C/)?.[1];

  expect(tabA).toBe("false");
  expect(tabB).toBe("true");
  expect(tabC).toBe("false");
});
