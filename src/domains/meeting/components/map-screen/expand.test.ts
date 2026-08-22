import { expect, test } from "vite-plus/test";

import { expandRatio, resize, snap } from "./expand";

const SIZE = { height: 600, peek: 600, full: 900 };

test("기본 높이에서는 0, 전체 화면에서는 1 이다", () => {
  expect(expandRatio(SIZE)).toBe(0);
  expect(expandRatio({ ...SIZE, height: 750 })).toBe(0.5);
  expect(expandRatio({ ...SIZE, height: 900 })).toBe(1);
  expect(expandRatio(null)).toBe(0);
});

test("기본 높이와 전체 화면 사이로 자른다", () => {
  expect(resize(SIZE, 500)?.height).toBe(600);
  expect(resize(SIZE, 1000)?.height).toBe(900);
  expect(resize(SIZE, 700)?.height).toBe(700);
});

test("절반을 넘겨 올리면 전체 화면으로 붙는다", () => {
  expect(snap({ ...SIZE, height: 760 })?.height).toBe(900);
  expect(snap({ ...SIZE, height: 740 })?.height).toBe(600);
});
