import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import type { CategorySlug } from "@/domains/catalog/api/types";
import { placePhoto, render } from "@/test-utils";

import { PlacePhotoImage } from "./index";

test("사진이 있으면 원본 사진을 보여준다", async () => {
  render(
    <PlacePhotoImage
      alt="성수 카페"
      category="cafe"
      photo={placePhoto("/static/popup-momo.webp")}
    />,
  );

  const image = page.getByAltText("성수 카페");
  await expect.element(image).toBeInTheDocument();
  await expect.element(image).toHaveAttribute("src", "/static/popup-momo.webp");
});

test("사진이 없으면 카테고리 대체 이미지를 보여준다", async () => {
  render(
    <div data-testid="host">
      <PlacePhotoImage alt="성수 카페" category="cafe" photo={null} />
    </div>,
  );

  const host = page.getByTestId("host");
  await expect.element(host).toBeInTheDocument();

  const image = host.element().querySelector("img");
  expect(image?.getAttribute("src")).toBe("/static/place-fallback-cafe.webp");
});

test("대체 이미지는 장식용이라 보조기기에서 숨긴다", async () => {
  render(
    <div data-testid="host">
      <PlacePhotoImage alt="성수 카페" category="cafe" photo={null} />
    </div>,
  );

  const host = page.getByTestId("host");
  await expect.element(host).toBeInTheDocument();

  const image = host.element().querySelector("img");
  expect(image?.getAttribute("alt")).toBe("");
  expect(image?.getAttribute("aria-hidden")).toBe("true");
  expect(page.getByRole("img").query()).toBeNull();
});

test("카테고리마다 정해진 대체 이미지를 쓴다", async () => {
  const slugs: CategorySlug[] = [
    "restaurant",
    "cafe",
    "bar",
    "walk",
    "shopping",
    "activity",
    "culture",
    "other",
  ];

  render(
    <div data-testid="host">
      {slugs.map((slug) => (
        <PlacePhotoImage category={slug} key={slug} photo={null} />
      ))}
    </div>,
  );

  const host = page.getByTestId("host");
  await expect.element(host).toBeInTheDocument();

  const sources = [...host.element().querySelectorAll("img")].map((image) =>
    image.getAttribute("src"),
  );

  expect(sources).toEqual([
    "/static/place-fallback-restaurant.webp",
    "/static/place-fallback-cafe.webp",
    "/static/place-fallback-bar.webp",
    "/static/place-fallback-walk.webp",
    "/static/place-fallback-shopping.webp",
    "/static/place-fallback-activity.webp",
    "/static/place-fallback-culture.webp",
    "/static/place-fallback-other.webp",
  ]);
});
