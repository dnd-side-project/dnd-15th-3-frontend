import { expect, test } from "vite-plus/test";

import { expandRatio, snapHeight } from "./expand";

test("기본 높이에서는 0, 전체 화면에서는 1 이다", () => {
  expect(expandRatio(600, 600, 900)).toBe(0);
  expect(expandRatio(750, 600, 900)).toBe(0.5);
  expect(expandRatio(900, 600, 900)).toBe(1);
});

test("범위를 벗어난 높이는 0과 1 사이로 자른다", () => {
  expect(expandRatio(500, 600, 900)).toBe(0);
  expect(expandRatio(1000, 600, 900)).toBe(1);
  expect(expandRatio(700, 700, 700)).toBe(1);
});

test("절반을 넘겨 올리면 전체 화면으로 붙는다", () => {
  expect(snapHeight(760, 600, 900)).toBe(900);
  expect(snapHeight(740, 600, 900)).toBe(600);
});
