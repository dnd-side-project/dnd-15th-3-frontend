import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { RouteMarker } from "./index";

test("순번 숫자를 배지에 보여준다", async () => {
  render(<RouteMarker category="cafe" index={3} />);

  await expect.element(page.getByText("3")).toBeInTheDocument();
});

test("onClick이 있으면 버튼으로 렌더링하고 클릭 시 호출한다", async () => {
  const onClick = vi.fn();
  render(<RouteMarker category="cafe" index={1} onClick={onClick} />);

  const marker = page.getByRole("button", { name: "1번 장소" });
  await expect.element(marker).toBeInTheDocument();

  await userEvent.click(marker);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("onClick이 없으면 버튼으로 렌더링하지 않는다", async () => {
  render(<RouteMarker category="cafe" index={1} />);

  await expect.element(page.getByText("1")).toBeInTheDocument();

  expect(page.getByRole("button").query()).toBeNull();
});

test("imageUrl이 있으면 해당 src로 이미지를 렌더링한다", async () => {
  render(
    <RouteMarker
      category="cafe"
      imageAlt="한강 공원"
      imageUrl="/static/momo-kakao-share.png"
      index={1}
    />,
  );

  const image = page.getByAltText("한강 공원");
  await expect.element(image).toBeInTheDocument();
  await expect.element(image).toHaveAttribute("src", "/static/momo-kakao-share.png");
});

test("imageUrl이 없으면 카테고리 대체 이미지를 보여준다", async () => {
  render(
    <div data-testid="host">
      <RouteMarker category="bar" index={1} />
    </div>,
  );

  const host = page.getByTestId("host");
  await expect.element(host).toBeInTheDocument();

  const image = host.element().querySelector("img");
  expect(image?.getAttribute("src")).toBe("/static/place-fallback-bar.webp");
  expect(image?.getAttribute("aria-hidden")).toBe("true");
});

test("두 자리 순번도 그대로 보여준다", async () => {
  render(<RouteMarker category="cafe" index={12} />);

  await expect.element(page.getByText("12")).toBeInTheDocument();
});
