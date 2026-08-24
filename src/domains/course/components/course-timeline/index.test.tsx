import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import type { CourseRouteStep } from "@/domains/course/api/types";
import { render } from "@/test-utils";

import { CourseTimeline } from "./index";

const ROUTE: CourseRouteStep[] = [
  {
    recommendationId: "21",
    placeId: "101",
    order: 1,
    name: "광장시장 순대볶음",
    category: "음식점",
    categorySlug: "restaurant",
    address: "서울 종로구 예지동 6-1",
    primaryImageUrl: null,
    longitude: 126.9989,
    latitude: 37.5701,
    walkDurationToNextMin: null,
  },
];

function badgeColor() {
  const badge = document.querySelector("[class*=course-timeline_badge]");
  return badge === null ? null : getComputedStyle(badge).backgroundColor;
}

test("색을 넘기지 않으면 파랑으로 그린다", async () => {
  render(<CourseTimeline route={ROUTE} />);

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  expect(badgeColor()).toBe("rgb(55, 147, 255)");
});

test("코스 색을 넘기면 번호도 그 색을 쓴다", async () => {
  render(<CourseTimeline route={ROUTE} tone="pink" />);

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  expect(badgeColor()).toBe("rgb(255, 70, 169)");
});
