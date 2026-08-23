import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../../../test-utils";
import type { CourseCandidateList, CourseDetail } from "../../../../../course/api/types";
import type { MeetingPermissions, MeetingScreen } from "../../../../api/types";
import { CourseDetailPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING_ID = "1";
const COURSE_ID = "c1";

const CANDIDATES: CourseCandidateList = {
  courseCandidates: [
    { courseCandidateId: "c1", order: 1 },
    { courseCandidateId: "c2", order: 2 },
    { courseCandidateId: "c3", order: 3 },
  ],
  totalCount: 3,
};

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

const HOST_PERMISSIONS: MeetingPermissions = {
  canManageMeeting: true,
  canSelectCourse: true,
  canShareInvitation: true,
};

const MEMBER_PERMISSIONS: MeetingPermissions = {
  canManageMeeting: false,
  canSelectCourse: true,
  canShareInvitation: true,
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function mockApi(permissions: MeetingPermissions) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes(`/courses/${COURSE_ID}`)) {
      return Promise.resolve(jsonResponse(COURSE_DETAIL));
    }
    if (url.includes("/courses")) {
      return Promise.resolve(jsonResponse(CANDIDATES));
    }
    const meeting: MeetingScreen = {
      id: MEETING_ID,
      meetingId: MEETING_ID,
      invitationCode: "DNDF0R",
      participantAccessToken: "host-session-token",
      invitationUrl: "https://momo.example/invite/DNDF0R",
      name: "을지로·성수 나들이",
      date: "2026-08-05",
      time: "18:00",
      courseImageUrl: null,
      role: permissions.canManageMeeting ? "HOST" : "MEMBER",
      isHost: permissions.canManageMeeting,
      permissions,
      meetingType: { id: "1", code: "SOCIAL", name: "친목" },
      meetingTypeCode: "SOCIAL",
      host: { userKey: "device-1", nickname: "방장모모", profileAvatarId: "momo-blue" },
      categorySlugs: ["restaurant"],
      firstLocation: {
        id: "101",
        displayName: "을지로3가역",
        address: "서울 중구",
        latitude: 37.5661,
        longitude: 126.9917,
        syncVersion: 1,
      },
      viewerParticipantId: "11",
      participants: [
        { id: "11", nickname: "방장모모", role: "HOST", profileAvatarId: "momo-blue" },
      ],
      categorySteps: [],
      recommendations: [],
      selectedCourse: null,
    };
    return Promise.resolve(jsonResponse(meeting));
  });
}

function renderCourseDetail(permissions: MeetingPermissions = HOST_PERMISSIONS) {
  mockApi(permissions);

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/course/:courseId", Component: CourseDetailPage },
      { path: "/meeting/:id", Component: () => <p>모임 상세</p> },
      { path: "/meeting/:id/place/:placeId", Component: () => <p>장소 상세</p> },
    ],
    { initialEntries: [`/meeting/${MEETING_ID}/course/${COURSE_ID}`] },
  );

  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  localStorage.setItem(`momo.access-token.${MEETING_ID}`, "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
});

test("코스 탭(A/B/C)을 보여준다", async () => {
  renderCourseDetail();

  await expect.element(page.getByRole("tab", { name: "A 코스" })).toBeInTheDocument();
  await expect.element(page.getByRole("tab", { name: "B 코스" })).toBeInTheDocument();
  await expect.element(page.getByRole("tab", { name: "C 코스" })).toBeInTheDocument();
});

test("코스 상세 정보를 보여준다", async () => {
  renderCourseDetail();

  await expect.element(page.getByText("뚜벅이 최적 코스")).toBeInTheDocument();
  await expect.element(page.getByText("경복궁")).toBeInTheDocument();
  await expect.element(page.getByText("통인시장")).toBeInTheDocument();
});

test("개설자는 코스 수정 버튼을 보여준다", async () => {
  renderCourseDetail(HOST_PERMISSIONS);

  await expect.element(page.getByRole("button", { name: "코스 수정" })).toBeInTheDocument();
});

test("개설자가 아니면 코스 수정 버튼을 감춘다", async () => {
  renderCourseDetail(MEMBER_PERMISSIONS);

  await expect.element(page.getByRole("tab", { name: "A 코스" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "코스 수정" })).not.toBeInTheDocument();
});

test("개설자가 아니면 해당 코스로 선택하기 버튼이 비활성화된다", async () => {
  renderCourseDetail(MEMBER_PERMISSIONS);

  await expect.element(page.getByRole("button", { name: "해당 코스로 선택하기" })).toBeDisabled();
});

test("개설자는 해당 코스로 선택하기 버튼을 누를 수 있다", async () => {
  renderCourseDetail(HOST_PERMISSIONS);

  const cta = page.getByRole("button", { name: "해당 코스로 선택하기" });
  await expect.element(cta).toBeEnabled();

  await userEvent.click(cta);

  const confirmCall = fetchMock.mock.calls.find(
    ([input]) =>
      typeof input === "string" &&
      input.includes(`/courses/${COURSE_ID}/confirmation`) &&
      input.includes("accessToken="),
  );
  expect(confirmCall).toBeDefined();
});
