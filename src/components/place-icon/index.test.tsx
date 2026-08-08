import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import type { PlaceIconProps } from "./index";
import { PlaceIcon } from "./index";

async function renderIcon(props: PlaceIconProps) {
  render(
    <div data-testid="host">
      <PlaceIcon {...props} />
    </div>,
  );

  const host = page.getByTestId("host");
  await expect.element(host).toBeInTheDocument();

  return host.element().firstElementChild as HTMLElement;
}

const backgrounds: [PlaceIconProps["category"], string][] = [
  ["restaurant", "rgb(255, 119, 81)"],
  ["activity", "rgb(55, 147, 255)"],
  ["shopping", "rgb(255, 70, 169)"],
  ["walk", "rgb(56, 192, 179)"],
  ["bar", "rgb(167, 84, 235)"],
  ["culture", "rgb(40, 197, 95)"],
  ["cafe", "rgb(255, 155, 4)"],
];

for (const [category, background] of backgrounds) {
  test(`${category} 카테고리는 지정된 배경색으로 그린다`, async () => {
    const icon = await renderIcon({ category });

    expect(getComputedStyle(icon).backgroundColor).toBe(background);
  });
}

test("기본 크기는 20이다", async () => {
  const icon = await renderIcon({ category: "cafe" });

  expect(icon.getBoundingClientRect().width).toBe(20);
  expect(icon.getBoundingClientRect().height).toBe(20);
});

test("size가 16이면 16 크기로 그린다", async () => {
  const icon = await renderIcon({ category: "cafe", size: 16 });

  expect(icon.getBoundingClientRect().width).toBe(16);
  expect(icon.getBoundingClientRect().height).toBe(16);
});

test("글리프는 크기와 무관하게 12로 그린다", async () => {
  const small = await renderIcon({ category: "walk", size: 16 });
  const glyph = small.querySelector("svg") as SVGSVGElement;

  expect(glyph.getBoundingClientRect().width).toBe(12);
  expect(glyph.getBoundingClientRect().height).toBe(12);
});

test("label이 없으면 장식용으로 숨긴다", async () => {
  const icon = await renderIcon({ category: "bar" });

  expect(icon.getAttribute("aria-hidden")).toBe("true");
  expect(icon.getAttribute("role")).toBeNull();
});

test("label이 있으면 이미지로 노출한다", async () => {
  await renderIcon({ category: "bar", label: "바" });

  await expect.element(page.getByRole("img", { name: "바" })).toBeInTheDocument();
});
