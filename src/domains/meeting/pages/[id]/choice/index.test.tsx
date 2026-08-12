import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../../test-utils";
import { ChoicePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const CATEGORIES = [
  { id: "1", slug: "restaurant", name: "음식점" },
  { id: "2", slug: "cafe", name: "카페" },
];

const MEETING = {
  id: "1",
  meetingId: "1",
  invitationCode: "DNDF0R",
  participantAccessToken: "host-session-token",
  invitationUrl: "https://momo.example/invite/DNDF0R",
  name: "을지로·성수 나들이",
  date: "2026-08-05",
  time: "18:00",
  role: "HOST",
  isHost: true,
  placeId: "101",
  firstLocationPlaceId: "101",
  permissions: { canManageMeeting: true, canSelectCourse: true, canShareInvitation: true },
  meetingType: { id: "1", code: "SOCIAL", name: "친목" },
  meetingTypeCode: "SOCIAL",
  host: { userKey: "device-1", nickname: "방장모모", profileAvatarId: "momo-blue" },
  categorySlugs: ["restaurant", "cafe"],
  firstLocation: {
    id: "101",
    name: "을지로3가역",
    address: "서울 중구",
    latitude: 37.5661,
    longitude: 126.9917,
  },
  viewerParticipantId: "11",
  participants: [],
  categorySteps: [],
  recommendations: [
    {
      id: "21",
      categoryId: "1",
      place: {
        id: "201",
        name: "광장시장 순대볶음",
        address: "서울 종로구",
        latitude: 1,
        longitude: 2,
      },
      recommendedByParticipantId: "11",
      likeCount: 3,
      dislikeCount: 1,
      viewerPreference: "LIKE",
    },
    {
      id: "22",
      categoryId: "2",
      place: {
        id: "202",
        name: "성수 카페 모모",
        address: "서울 성동구",
        latitude: 1,
        longitude: 2,
      },
      recommendedByParticipantId: "12",
      likeCount: 2,
      dislikeCount: 0,
      viewerPreference: null,
    },
  ],
  selectedCourse: null,
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function renderChoice(meeting: typeof MEETING = MEETING) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse(CATEGORIES));
    }
    return Promise.resolve(jsonResponse(meeting));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/choice", Component: ChoicePage },
      { path: "/meeting/:id/place", Component: () => <p>지도</p> },
    ],
    { initialEntries: ["/meeting/1/choice"] },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  localStorage.setItem("momo.access-token.1", "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
});

test("추천 장소와 선호도 수를 보여준다", async () => {
  renderChoice();

  await expect.element(page.getByText("광장시장 순대볶음")).toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "좋아요 3" }))
    .toHaveAttribute("aria-pressed", "true");
  await expect
    .element(page.getByRole("button", { name: "싫어요 1" }))
    .toHaveAttribute("aria-pressed", "false");
});

test("카테고리를 고르면 해당 장소만 남는다", async () => {
  renderChoice();

  await expect.element(page.getByText("전체 2")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "카페", exact: true }));

  await expect.element(page.getByText("카페 1")).toBeInTheDocument();
  await expect.element(page.getByText("광장시장 순대볶음")).not.toBeInTheDocument();
});

test("지도 보기로 바꾸면 지도 화면으로 간다", async () => {
  renderChoice();

  await userEvent.click(page.getByRole("button", { name: "지도로 보기" }));

  await expect.element(page.getByText("지도")).toBeInTheDocument();
});

test("보여줄 장소가 없으면 빈 상태를 보여주고 코스 생성을 막는다", async () => {
  renderChoice({ ...MEETING, recommendations: [] });

  await expect.element(page.getByText("아직 저장된 장소가 없어요")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "코스 생성하기" })).toBeDisabled();
});
