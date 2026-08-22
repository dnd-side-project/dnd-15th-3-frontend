import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import type { CourseDetail } from "../../api/types";
import { CourseRouteSheet } from "./index";

const MEETING_ID = "meeting-1";
const COURSE_CANDIDATE_ID = "course-1";
const ACCESS_TOKEN = "token-1";

const COURSE_DETAIL: CourseDetail = {
  courseName: "뚜벅이 최적 코스",
  totalDistanceKm: 2.1,
  totalCount: 2,
  route: [
    {
      recommendationId: "rec-1",
      placeId: "place-1",
      order: 1,
      name: "경복궁",
      category: "문화",
      categorySlug: "culture",
      address: "서울 종로구 사직로 161",
      primaryImageUrl: null,
      longitude: 126.9748,
      latitude: 37.5796,
      walkDurationToNextMin: 8,
    },
    {
      recommendationId: "rec-2",
      placeId: "place-2",
      order: 2,
      name: "통인시장",
      category: "쇼핑",
      categorySlug: "shopping",
      address: "서울 종로구 통인동 10-2",
      primaryImageUrl: null,
      longitude: 126.9712,
      latitude: 37.5775,
      walkDurationToNextMin: null,
    },
  ],
};

const fetchMock = vi.spyOn(globalThis, "fetch");

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function requestedUrl(index = 0): string {
  return new Request(fetchMock.mock.calls[index]![0]).url;
}

function renderSheet({ isOpen = true, onSelectCourse = () => {} } = {}) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <CourseRouteSheet
        isOpen={isOpen}
        onClose={() => {}}
        onSelectCourse={onSelectCourse}
        onOpenComments={() => {}}
        meetingId={MEETING_ID}
        courseCandidateId={COURSE_CANDIDATE_ID}
        accessToken={ACCESS_TOKEN}
        snapIndex={2}
      />
    </QueryClientProvider>,
  );
}

afterEach(() => {
  fetchMock.mockReset();
});

test("코스 상세를 불러와 표시한다", async () => {
  fetchMock.mockResolvedValue(jsonResponse(COURSE_DETAIL));
  renderSheet();

  await expect.element(page.getByText("뚜벅이 최적 코스")).toBeInTheDocument();
  await expect.element(page.getByText("경복궁")).toBeInTheDocument();
  await expect.element(page.getByText("통인시장")).toBeInTheDocument();

  expect(requestedUrl()).toContain(`/api/v1/meetings/${MEETING_ID}/courses/${COURSE_CANDIDATE_ID}`);
});

test("시트가 닫혀 있으면 상세를 요청하지 않는다", async () => {
  renderSheet({ isOpen: false });

  expect(fetchMock).not.toHaveBeenCalled();
});

test("해당 코스로 선택하기 클릭 시 onSelectCourse가 호출된다", async () => {
  fetchMock.mockResolvedValue(jsonResponse(COURSE_DETAIL));
  const onSelectCourse = vi.fn();
  renderSheet({ onSelectCourse });

  await expect.element(page.getByText("뚜벅이 최적 코스")).toBeInTheDocument();

  const selectButton = page.getByRole("button", { name: "해당 코스로 선택하기" });
  await userEvent.click(selectButton);

  expect(onSelectCourse).toHaveBeenCalled();
});
