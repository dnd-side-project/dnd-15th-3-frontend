import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { RouteMarker } from "./index";

test("순번 숫자를 배지에 보여준다", async () => {
  render(<RouteMarker index={3} />);

  await expect.element(page.getByText("3")).toBeInTheDocument();
});

test("tone에 따라 배지 배경색이 달라진다", async () => {
  render(
    <>
      <RouteMarker index={1} tone="blue" />
      <RouteMarker index={2} tone="pink" />
      <RouteMarker index={3} tone="purple" />
    </>,
  );

  await expect.element(page.getByText("1")).toBeInTheDocument();

  expect(getComputedStyle(page.getByText("1").element()).backgroundColor).toBe("rgb(55, 147, 255)");
  expect(getComputedStyle(page.getByText("2").element()).backgroundColor).toBe("rgb(255, 70, 169)");
  expect(getComputedStyle(page.getByText("3").element()).backgroundColor).toBe("rgb(167, 84, 235)");
});

test("onClick이 있으면 버튼으로 렌더링하고 클릭 시 호출한다", async () => {
  const onClick = vi.fn();
  render(<RouteMarker index={1} onClick={onClick} />);

  const marker = page.getByRole("button", { name: "1번 장소" });
  await expect.element(marker).toBeInTheDocument();

  await userEvent.click(marker);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("onClick이 없으면 버튼으로 렌더링하지 않는다", async () => {
  render(<RouteMarker index={1} />);

  await expect.element(page.getByText("1")).toBeInTheDocument();

  expect(page.getByRole("button").query()).toBeNull();
});

test("imageUrl이 있으면 해당 src로 이미지를 렌더링한다", async () => {
  render(<RouteMarker imageAlt="한강 공원" imageUrl="/static/momo-kakao-share.png" index={1} />);

  const image = page.getByAltText("한강 공원");
  await expect.element(image).toBeInTheDocument();
  await expect.element(image).toHaveAttribute("src", "/static/momo-kakao-share.png");
});

test("마커 전체 크기는 72 x 81이다", async () => {
  render(<RouteMarker index={1} onClick={vi.fn()} />);

  const marker = page.getByRole("button", { name: "1번 장소" });
  await expect.element(marker).toBeInTheDocument();

  const rect = marker.element().getBoundingClientRect();
  expect(rect.width).toBe(72);
  expect(rect.height).toBe(81);
});
