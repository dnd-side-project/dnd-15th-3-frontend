import { expect, test } from "vite-plus/test";

import { courseTone } from "./tone";

test("코스 순서대로 파랑·분홍·보라를 쓴다", () => {
  expect(courseTone(1)).toBe("blue");
  expect(courseTone(2)).toBe("pink");
  expect(courseTone(3)).toBe("purple");
});

test("네 번째부터는 처음 색으로 돌아온다", () => {
  expect(courseTone(4)).toBe("blue");
  expect(courseTone(5)).toBe("pink");
});

test("순서가 잘못 와도 첫 색으로 떨어진다", () => {
  expect(courseTone(0)).toBe("blue");
  expect(courseTone(-2)).toBe("blue");
});
