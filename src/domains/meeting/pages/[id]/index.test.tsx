import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { MeetingScreen, MeetingStatus } from "@/domains/meeting/api/types";
import { render } from "@/test-utils";

import { MeetingPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING: MeetingScreen = {
  id: "1",
  meetingId: "1",
  invitationCode: "DNDF0R",
  participantAccessToken: "host-session-token",
  invitationUrl: "https://momo.example/invite/DNDF0R",
  name: "을지로·성수 나들이",
  date: "2026-08-05",
  time: "18:00",
  courseImageUrl: null,
  role: "HOST",
  isHost: true,
  permissions: { canManageMeeting: true, canSelectCourse: true, canShareInvitation: true },
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
    { id: "12", nickname: "면킬러", role: "MEMBER", profileAvatarId: "momo-green" },
  ],
  categorySteps: [],
  recommendations: [],
  selectedCourse: null,
};

const MEETING_TYPES = [
  { id: "1", code: "SOCIAL", name: "친목" },
  { id: "2", code: "DATING_HOBBY", name: "데이트" },
];

const MEETING_STATUS: MeetingStatus = {
  status: "RECOMMENDATION_COLLECTING",
  confirmedCourseCandidateId: null,
};

function renderMeeting(
  meeting: MeetingScreen = MEETING,
  meetingStatus: MeetingStatus = MEETING_STATUS,
) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    let body: unknown;
    if (url.includes("/meeting-types")) {
      body = MEETING_TYPES;
    } else if (url.includes("/meetings/")) {
      body = meetingStatus;
    } else {
      body = meeting;
    }
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
  });

  const router = createMemoryRouter([{ path: "/meeting/:id", Component: MeetingPage }], {
    initialEntries: ["/meeting/1"],
  });

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

test("모임 이름과 날짜·시간·장소를 보여준다", async () => {
  renderMeeting();

  await expect
    .element(page.getByRole("heading", { name: "을지로·성수 나들이" }))
    .toBeInTheDocument();
  await expect.element(page.getByText("26. 08. 05")).toBeInTheDocument();
  await expect.element(page.getByText("18:00")).toBeInTheDocument();
  await expect.element(page.getByText("을지로3가역")).toBeInTheDocument();
});

test("참여자 목록에서 방장에게만 왕관을 표시한다", async () => {
  renderMeeting();

  await expect.element(page.getByText("방장모모")).toBeInTheDocument();
  await expect.element(page.getByText("면킬러")).toBeInTheDocument();
  expect(document.querySelectorAll('[aria-label="방장"]').length).toBe(1);
});

test("코스 카드는 코스 순서 링크와 지도 버튼으로 구성된다", async () => {
  renderMeeting();

  await expect
    .element(page.getByRole("link", { name: /코스 순서/ }))
    .toHaveAttribute("href", "/meeting/1/course-plan");
  await expect
    .element(page.getByRole("button", { name: /모임 코스 자세히 보기/ }))
    .toBeInTheDocument();
});

test("코스가 정해지기 전에는 공유하기만 보여준다", async () => {
  renderMeeting();

  await expect.element(page.getByRole("button", { name: "공유하기" })).toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "모임 카드 생성" }))
    .not.toBeInTheDocument();
});

test("코스가 정해지면 모임 카드 생성 버튼을 함께 보여준다", async () => {
  renderMeeting({ ...MEETING, selectedCourse: { id: "41", recommendationIds: ["21"] } });

  await expect.element(page.getByRole("button", { name: "모임 카드 생성" })).toBeInTheDocument();
});

const MEMBER: MeetingScreen = {
  ...MEETING,
  role: "MEMBER",
  isHost: false,
  permissions: { canManageMeeting: false, canSelectCourse: true, canShareInvitation: true },
};

test("모임을 관리할 수 없으면 이름 수정 버튼을 감춘다", async () => {
  renderMeeting(MEMBER);

  await expect
    .element(page.getByRole("heading", { name: "을지로·성수 나들이" }))
    .toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "모임 이름 수정" }))
    .not.toBeInTheDocument();
});

const SELECTED_COURSE = { id: "41", recommendationIds: ["21"] };

test("코스가 정해지면 코스 수정 버튼을 보여준다", async () => {
  renderMeeting({ ...MEETING, selectedCourse: SELECTED_COURSE });

  await expect.element(page.getByRole("button", { name: "코스 수정" })).toBeInTheDocument();
});

test("모임을 관리할 수 없으면 코스가 정해져도 코스 수정 버튼을 감춘다", async () => {
  renderMeeting({ ...MEMBER, selectedCourse: SELECTED_COURSE });

  await expect.element(page.getByRole("button", { name: "모임 카드 생성" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "코스 수정" })).not.toBeInTheDocument();
});

test("코스가 정해지기 전에는 코스 수정 버튼이 없다", async () => {
  renderMeeting();

  await expect.element(page.getByRole("button", { name: "공유하기" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "코스 수정" })).not.toBeInTheDocument();
});

test("개설자는 날짜를 눌러 날짜 선택 시트를 연다", async () => {
  renderMeeting();

  await userEvent.click(page.getByRole("button", { name: /26. 08. 05/ }));

  await expect.element(page.getByRole("button", { name: "확인" })).toBeInTheDocument();
});

test("개설자는 모임 유형을 눌러 유형 목록을 연다", async () => {
  renderMeeting();

  await userEvent.click(page.getByRole("button", { name: "친목" }));

  await expect.element(page.getByRole("menuitem", { name: "데이트" })).toBeInTheDocument();
});

test("모임을 관리할 수 없으면 날짜·시간·장소를 누를 수 없다", async () => {
  renderMeeting(MEMBER);

  await expect.element(page.getByText("26. 08. 05")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: /26. 08. 05/ })).not.toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "친목" })).not.toBeInTheDocument();
});

test("코스 생성 중 맵카드를 누르면 팝업이 표시된다", async () => {
  renderMeeting(MEETING, { status: "COURSE_GENERATING", confirmedCourseCandidateId: null });

  await userEvent.click(page.getByRole("button", { name: /모임 코스 자세히 보기/ }));

  await expect.element(page.getByRole("dialog")).toBeInTheDocument();
  await expect.element(page.getByText("코스 생성 중")).toBeInTheDocument();
  await expect
    .element(page.getByText("코스 생성이 완료될 때까지 기다려주세요"))
    .toBeInTheDocument();
});

test("코스 생성 중 팝업을 닫을 수 있다", async () => {
  renderMeeting(MEETING, { status: "COURSE_GENERATING", confirmedCourseCandidateId: null });

  await userEvent.click(page.getByRole("button", { name: /모임 코스 자세히 보기/ }));
  await expect.element(page.getByRole("dialog")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "닫기" }));

  await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
});
