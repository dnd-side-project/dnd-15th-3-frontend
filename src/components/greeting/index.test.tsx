import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { Greeting } from "./index";

test("이름을 포함한 인사말을 렌더링한다", () => {
  const html = renderToStaticMarkup(<Greeting name="DND" />);
  expect(html).toContain("Hello, DND!");
});
