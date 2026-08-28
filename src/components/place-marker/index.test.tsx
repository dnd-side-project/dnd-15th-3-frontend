import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { PlaceMarker } from "./index";

test("카테고리 아이콘을 렌더링한다", async () => {
  render(<PlaceMarker category="cafe" />);

  const marker = page.getByRole("button", { name: "장소 마커" });
  await expect.element(marker).toBeInTheDocument();
});

test("label이 있으면 aria-label로 사용한다", async () => {
  render(<PlaceMarker category="restaurant" label="맛집" />);

  const marker = page.getByRole("button", { name: "맛집" });
  await expect.element(marker).toBeInTheDocument();
});

test("onClick이 있으면 클릭 시 호출한다", async () => {
  const onClick = vi.fn();
  render(<PlaceMarker category="bar" onClick={onClick} />);

  const marker = page.getByRole("button", { name: "장소 마커" });
  await expect.element(marker).toBeInTheDocument();

  await userEvent.click(marker);

  expect(onClick).toHaveBeenCalledTimes(1);
});
